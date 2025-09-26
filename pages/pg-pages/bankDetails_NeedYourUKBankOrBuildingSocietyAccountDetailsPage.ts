import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class NeedYourUKBankOrBuildingSocietyAccountDetailsPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private saveAndContinueButton: Locator;
    private noButGiveRadioButton: Locator;
    private bankDetailsTitle: Locator;

    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.bankDetailsTitle = this.page.getByRole('heading', { name: 'We need your UK bank or' })
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
        this.noButGiveRadioButton = this.page.getByRole('radio', { name: 'No, but I\'ll give you them' });
    }

    @step('Fill UK bank or building society account details')
    async fillUKBankOrBuildingSocietyAccountDetails(){
        await expect(this.bankDetailsTitle).toBeVisible({ timeout: 20000 });
        await this.noButGiveRadioButton.click();
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "BankDetails - Fill UK bank or building society account details.");
        await this.saveAndContinueButton.click();
    }
}