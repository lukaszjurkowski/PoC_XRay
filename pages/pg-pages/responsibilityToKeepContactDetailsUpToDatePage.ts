import { Page, Locator, expect, _android } from '@playwright/test'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';
import { step } from '../../stepHandler'

export class ResponsibilityToKeepContactDetailsUpToDatePage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private continueButton: Locator;
    private responsibilityTitle: Locator;

    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.responsibilityTitle = this.page.getByRole('heading', { name: 'You have a responsibility to' });
    }

    @step("Verify Responsibility to keep contact details up to date step")
    async verifyResponsibilityToKeepContactDetailsUpToDateStep() {
        await expect(this.responsibilityTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Responsibility to keep contact page scan");
        await this.continueButton.click();
    }
}