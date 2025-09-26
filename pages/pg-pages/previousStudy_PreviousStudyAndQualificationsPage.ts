import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class PreviousStudyAndQualificationsPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private previousStudyTitle: Locator;
    private previousStudyRadioButton: Locator;
    private saveAndContinueButton: Locator;
    
    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.previousStudyTitle = this.page.getByRole('heading', { name: 'Previous study and qualifications' });
        this.previousStudyRadioButton = this.page.getByRole('radio', { name: 'No' });
        // this.previousPgFundingRadioButton = this.page.locator('input[type="radio"][name="Screen0_Radios"][value="No"]');
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
    }

    @step("Confirm previous studies and qualifications")
    async confirmPreviousStudiesAndQualifications(){
        await expect(this.previousStudyTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "PreviousStudy - Confirm previous studies and qualifications");
        await this.previousStudyRadioButton.click();
        await this.saveAndContinueButton.click();
    }
}