import { Page, Locator, expect, _android } from '@playwright/test'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';
import { step } from '../../stepHandler'

export class EnteringIntoAContractPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private continueButton: Locator;
    private enteringTitle: Locator;

    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.enteringTitle = this.page.getByRole('heading', { name: 'You are entering into a' });
    }

    @step("Verify Entering into a contract step")
    async verifyEnteringIntoAContractStep() {
        await expect(this.enteringTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Entering into a contract page scan");
        await this.continueButton.click();
    }
}