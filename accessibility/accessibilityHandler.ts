import { AxeResults } from 'axe-core';
import AxeBuilder from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';
import test, { TestInfo, Page, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import mustache from 'mustache';
import { step } from '../stepHandler';

const issueImpact = ["minor", "moderate", "serious", "critical"];

export enum screenshotSettingValues {
    NEVER = 0,
    ON_FAIL = 1,
    ALWAYS = 2
}

export class AccessibilityTestStep {
    stepDescription: string;
    axeResults: AxeResults;
    report?: string;
    isPassed: boolean;
    allowedImpact: string[];
    screenshotBlob?: any;
    screenshotFilename?: string;

    constructor(stepDescription: string, axeResults: AxeResults, allowedImpact: string[]) {
        this.stepDescription = stepDescription;
        this.axeResults = axeResults;
        this.allowedImpact = allowedImpact;
        this.isPassed = this.checkIfPassed();
    }

    private checkIfPassed(): boolean {
        for (const item of this.axeResults.violations) {
            if (!this.allowedImpact.includes(item.impact!))
                return false;
        }
        return true;
    }

    prepareReport(testInfo: TestInfo, stepNo: number, projectKey?: string): void {
        const headerData = [
            {
                "name": "Test:",
                "value": testInfo.titlePath.join(" &rsaquo; ")
            },
            {
                "name": "Step:",
                "value": "#" + stepNo + ": " + this.stepDescription
            },
            {
                "name": "Project:",
                "value": testInfo.project.name.toString()
            },
            /*            {
                            "name": "Environment:",
                            "value": `User agent: ${this.axeResults.testEnvironment.userAgent}<br>
                            Resolution: ${this.axeResults.testEnvironment.windowWidth} x ${this.axeResults.testEnvironment.windowHeight}`
                        },
                        {
                            "name": "Active rule sets:",
                            "value": this.axeResults.toolOptions.runOnly!.toString()
                        } */
            {
                "name": "Generated on:",
                "value": new Date().toLocaleString("en-GB")
            }
        ];

        let header: string = `<table class="table table-bordered">`;

        for (const pair of headerData)
            header += `
              <tr>
                <th scope="row">${pair.name}</td>
                <td>${pair.value}</td>
              </tr>`;
        header += "</table>";

        let report = createHtmlReport({
            results: this.axeResults,
            options: {
                projectKey,
                customSummary: header,
                doNotCreateReportFile: true,
            },
        });

        this.report = report;
    }
}

/*
    AccessibilityTestCase:

        NAME                TYPE                        REQURIED   DESC
        usedTags:           string[];                   Y          array of rulesets
        projectKey:         string;                     N          name shown in accessibility testing summary header
        allowedImpact:      string[];                   N          violation impact, that is ignored when checking if TC is passed
        isVerbose:          boolean                     N          when true returns scanned step name in console
        screenshotSetting:  screenshotSettingValues;    N          NEVER, ON_FAIL, ALWAYS
        saveToFile:         boolean;                    N          not implemented yet: saves HTML test summary to a file
        attachRawData:      boolean;                    N          not implemented yet: attaches jsonified summaryData to test result
*/

export class AccessibilityTestCase {
    private steps: AccessibilityTestStep[];
    private usedTags: string[];
    private projectKey?: string;
    private isPassed: boolean;
    private allowedImpact: string[];
    private isVerbose: boolean
    private screenshotSetting: screenshotSettingValues;
    private saveToFile: boolean;
    private attachRawData: boolean;

    constructor(usedTags?: string[], projectKey?: string, allowedImpact?: string[], isVerbose?: boolean, screenshotSetting?: screenshotSettingValues, saveToFile?: boolean, attachRawData?: boolean) {
        this.steps = [];
        this.isPassed = true;
        this.usedTags = usedTags ?? [];
        this.projectKey = projectKey;
        this.allowedImpact = allowedImpact ?? [];
        this.isVerbose = isVerbose ?? false;
        this.screenshotSetting = screenshotSetting ?? screenshotSettingValues.ON_FAIL;
        this.saveToFile = saveToFile ?? false;
        this.attachRawData = attachRawData ?? false;
    }

    async runScan(page: Page, description: string): Promise<void> {
        if (this.isVerbose)
            console.log(`Axe-core scan on: ${description}`)
        this.steps.push(new AccessibilityTestStep(
            description,
            await new AxeBuilder({ page })
                .withTags(this.usedTags)
                .analyze(),
            this.allowedImpact
        ));
        if (!this.steps[this.steps.length - 1].isPassed)
            this.isPassed = false;
        if (!this.steps[this.steps.length - 1].isPassed && this.screenshotSetting == screenshotSettingValues.ON_FAIL || this.screenshotSetting == screenshotSettingValues.ALWAYS)
            if (this.saveToFile)
                await page.screenshot({ path: `step${this.steps.length}.png`, fullPage: true });
            else {
                let screenshot = await page.screenshot({ fullPage: true });
                this.steps[this.steps.length - 1].screenshotBlob = screenshot.toString('base64');
            }

        // todo: support for saving/attaching screenshots

    }

    private prepareSummaryData(testInfo: TestInfo): Object {
        
        let preparedSteps: any[] = [];

        for (let [i, step] of this.steps.entries()) {
            let totalTestStepViolationCount: number = 0;
            for (let item of step.axeResults.violations)
                totalTestStepViolationCount += item.nodes.length;
            preparedSteps.push({
                i: i + 1,
                stepData: step,
                hasScreenshot: (step.screenshotBlob || step.screenshotFilename) ? true : false,
                violationTypesCount: step.axeResults.violations.length,
                violationTotalCount: totalTestStepViolationCount,
                formatedDate: new Date(step.axeResults.timestamp).toLocaleString("en-GB")
            });
        }

        let totalTestCaseViolationCount: number = 0;
        let testCaseViolations: Object[] = [];

        for (let [i, step] of this.steps.entries()) {
            for (let stepViolation of step.axeResults.violations)
            {
                let existing = testCaseViolations.find(obj => obj['id'] === stepViolation.id);
                if (existing)
                    existing['nodes'].push( ...stepViolation.nodes);
                else
                    testCaseViolations.push(stepViolation);

                totalTestCaseViolationCount += stepViolation.nodes.length;
            }
        }

        return {
            projectKey: this.projectKey,
            testName: testInfo.titlePath.join(" › "),
            generatedDate: new Date().toLocaleString("en-GB"),
            isPassed: this.isPassed,
            testCaseViolationCount: testCaseViolations.length,
            totalTestCaseViolationCount,
            playwrightProject: testInfo.project.name.toString(),
            usedTags: this.usedTags.join(", "),
            allowedImpact: this.allowedImpact.join(", "),
            testSteps: preparedSteps
        }
    }

    async finish(testInfo: TestInfo): Promise<void> {
        await this.prepareAndAttachReports(testInfo);
        this.assertIsPassed();
    }

    @step("Preparing test reports")
    private async prepareAndAttachReports(testInfo: TestInfo): Promise<void> {
        for (let [i, step] of this.steps.entries()) {
            step.prepareReport(testInfo, i + 1, this.projectKey);
            await testInfo.attach('accessibility-test-report-step' + (i + 1).toString(), {
                body: step.report,
                contentType: 'text/html'
            });
        }

        const summaryData = this.prepareSummaryData(testInfo);

        let template: string;
        try {
            template = readFileSync('./accessibility/accessibilitySummaryTemplate.html', 'utf-8');
        }
        catch (err) {
            throw new Error(`Error on loading page template. ${err}`);
        }

        let reportSummary = mustache.render(template, summaryData);

        await testInfo.attach('accessibility-test-summary', {
            body: reportSummary,
            contentType: 'text/html'
        });

        if (this.attachRawData){
            for(let step of summaryData['testSteps'])
                step.stepData.screenshotBlob = null;    // not included to reduce file size; preferably attached separately

            await testInfo.attach('accessibility-raw-results', {
                body: JSON.stringify(summaryData),
                contentType: 'application/json'
            });
        }
    }

    @step("Checking if accessilility scans were passed")
    private assertIsPassed(): void {
        expect(this.isPassed).toEqual(true);
    }
}

