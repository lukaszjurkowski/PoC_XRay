import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';


export class CanYouGivePassportDetailsPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private canYouGivePassportTitle: Locator;
    private noButGiveRadioButton: Locator;
    private saveAndContinueButton: Locator;

    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.canYouGivePassportTitle = this.page.getByText('Can you give us your UK');
        this.noButGiveRadioButton = this.page.getByRole('radio', { name: 'No, but I\'ll give you them' });
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
    }

    @step('Fill Can you give passport details step')
    async fillCanYouGivePassportDetailsStep(){
        await expect(this.canYouGivePassportTitle).toBeVisible({ timeout: 20000 });
        await this.noButGiveRadioButton.click();
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Residency - Can you give passport details");
        await this.saveAndContinueButton.click();
    }
}