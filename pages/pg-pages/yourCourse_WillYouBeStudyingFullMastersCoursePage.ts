import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class WillYouBeStudyingFullMastersCoursePage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private fullMasterCourseTitle: Locator;
    private fullMasterCourseRadioButton: Locator;
    private saveAndContinueButton: Locator;
    
    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.fullMasterCourseTitle = this.page.getByRole('heading', { level: 1, name: 'Will you be studying a full Master\'s Course?', exact: true });
        this.fullMasterCourseRadioButton = this.page.getByRole('radio', { name: 'Yes, I\'m studying a full Master\'s course' });
        // this.previousPgFundingRadioButton = this.page.locator('input[type="radio"][name="Screen0_Radios"][value="No"]');
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
    }

    @step("Confirm Full Master Course ")
    async confirmFullMasterCourse(){
        await expect(this.fullMasterCourseTitle).toBeVisible({ timeout: 20000 });
        await this.fullMasterCourseRadioButton.click();
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "YourCourse - Confirm Full Master Course");
        await this.saveAndContinueButton.click();
    }
}