import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class DataProtectionStatementPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private dataProtectionTitle: Locator;
    private agreeRadioButton: Locator;
    private continueButton: Locator;
    
    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.dataProtectionTitle = this.page.getByRole('heading', { name: 'Data protection statement and privacy notice', exact: true });
        this.agreeRadioButton = this.page.getByRole('radio', { name: 'I agree with how you\'ll use my information' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    }

    @step("Confirm Data Protection Statement")
    async confirmDataProtectionStatement(){
        await expect(this.dataProtectionTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Preamble - Confirm Data Protection Statement");
        await this.agreeRadioButton.click();
        await this.continueButton.click();
    }
}