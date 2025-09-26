import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class CheckDetailsPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private checkPreviousStudyDetailsTitle: Locator;
    private confirmButton: Locator;
    
    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.checkPreviousStudyDetailsTitle = this.page.getByRole('heading', { name: 'Check your answers' });
        // this.previousPgFundingRadioButton = this.page.locator('input[type="radio"][name="Screen0_Radios"][value="No"]');
        this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
    }

    @step("Check Previous Study Details ")
    async checkPreviousStudyDetails(){
        await expect(this.checkPreviousStudyDetailsTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "PreviousStudy - Check Previous Study Details");
        await this.confirmButton.click();
    }
}