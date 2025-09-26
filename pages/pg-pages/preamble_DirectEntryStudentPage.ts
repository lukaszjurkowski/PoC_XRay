import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class DirectEntryStudentPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private directEntryTitle: Locator;
    private directEntryRadioButton: Locator;
    private continueButton: Locator;
    
    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.directEntryTitle = this.page.getByText('Are you a direct entry student?');
        this.directEntryRadioButton = this.page.getByRole('radio', { name: 'No' });
        // this.directEntryRadioButton = this.page.locator('input[type="radio"][name="Screen12_Radios"][value="No"]');
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    }

    @step("Confirm direct entry student")
    async confirmDirectEntryStudent(){
        await expect(this.directEntryTitle).toBeVisible({ timeout: 20000 });
        await this.directEntryRadioButton.click();
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Preamble - Confirm direct entry student");
        await this.continueButton.click();
    }
}