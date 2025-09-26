import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class AdditionalContactPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private additionalContactTitle: Locator;
    private continueButton: Locator;

    constructor(page: Page, data: any, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.additionalContactTitle = this.page.getByRole('heading', { name: 'Additional contact' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    }

    @step('Verify Additional contact step')
    async verifyAdditionalContactStep(data: any){
        await expect(this.additionalContactTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "AdditionalContact - Verify Additional contact step");
        await this.continueButton.click();
    }
}