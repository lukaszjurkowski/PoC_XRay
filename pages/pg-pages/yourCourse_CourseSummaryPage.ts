import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class CourseSummaryPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private checkYourCourseDetailsTitle: Locator;
    private expectedFullTime: Locator;
    private expectedUnivName: Locator;
    private expectedCourseNameInSummary: Locator;
    private expectedFullCourseValue: Locator;
    private confirmButton: Locator;


    
    constructor(page: Page, data: any, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.checkYourCourseDetailsTitle = this.page.getByRole('heading', { name: 'Check your details' });
        this.expectedFullCourseValue = this.page.getByText('Yes');
        this.expectedFullTime = this.page.getByText('Full time', { exact: true });
        this.expectedUnivName = this.page.getByText(data.expectedDisplayedUniversityName);
        this.expectedCourseNameInSummary = this.page.getByText(data.expectedDisplayedCourseNameInSummary);
        this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
    }

    @step("Check your Course details")
    async checkYourCourseDetailsStep(data: any){
        await expect(this.checkYourCourseDetailsTitle).toBeVisible({ timeout: 20000 }); 
        await expect(this.expectedFullTime).toBeVisible({ timeout: 20000 });
        await expect(this.expectedUnivName).toBeVisible({ timeout: 20000 });
        await expect(this.expectedCourseNameInSummary).toBeVisible({ timeout: 20000 });
        await expect(this.expectedFullCourseValue).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "YourCourse - Check your Course details");
        await this.confirmButton.click();

    }
}