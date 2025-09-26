import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class PreviousPostgraduateMastersFundingPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private previousPgFundingTitle: Locator;
    private previousPgFundingRadioButton: Locator;
    private saveAndContinueButton: Locator;
    
    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.previousPgFundingTitle = this.page.getByRole('heading', { name: 'Previous postgraduate Master\'s funding' });
        this.previousPgFundingRadioButton = this.page.getByRole('radio', { name: 'No' });
        // this.previousPgFundingRadioButton = this.page.locator('input[type="radio"][name="Screen0_Radios"][value="No"]');
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
    }

    @step("Confirm previous PG Master's funding")
    async confirmPreviousPG(){
        await expect(this.previousPgFundingTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "PreviousStudy - Confirm previous PG Master's funding");
        await this.previousPgFundingRadioButton.click();
        await this.saveAndContinueButton.click();
    }
}