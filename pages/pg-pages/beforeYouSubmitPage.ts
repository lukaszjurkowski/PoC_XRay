import { Page, Locator, expect, _android } from '@playwright/test'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';
import { step } from '../../stepHandler'

export class BeforeYouSubmitPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private continueButton: Locator;
    private beforeSubmitTitle: Locator;

    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.beforeSubmitTitle = this.page.getByRole('heading', { name: 'Before you submit' });
    }

    @step("Verify Before you submit step")
    async verifyBeforeYouSubmitStep() {
        await expect(this.beforeSubmitTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Before you submit page ");
        await this.continueButton.click();
    }
}