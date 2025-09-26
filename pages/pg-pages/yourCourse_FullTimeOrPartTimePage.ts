import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class FullTimeOrPartTimePage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private fullPartTimeTitle: Locator;
    private expectedFullTime: Locator;
    private saveAndContinueButton: Locator;
    
    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.fullPartTimeTitle = this.page.getByRole('heading', { name: 'Will you be studying full time or part time?' });
        this.expectedFullTime = this.page.getByText('Full time', { exact: true });
        // this.previousPgFundingRadioButton = this.page.locator('input[type="radio"][name="Screen0_Radios"][value="No"]');
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
    }

    @step("Confirm Full or Part Time ")
    async confirmFullorPartTime(){
        await expect(this.fullPartTimeTitle).toBeVisible({ timeout: 20000 });
        await this.expectedFullTime.click();
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "YourCourse - Confirm Full or Part Time");
        await this.saveAndContinueButton.click();
    }
}