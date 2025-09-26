import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';


export class HowToProveIdentityPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private howToProveTitle: Locator;
    private continueButton: Locator;

    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.howToProveTitle = this.page.getByRole('heading', { name: 'How to prove your identity' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    }

    @step('Verify How to prove identity step')
    async verifyHowToProveIdentityStep(){
        await expect(this.howToProveTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Residency - How to prove identity step");
        await this.continueButton.click();
    }
}