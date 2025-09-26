import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class MakeSureIfTheRightApplicationGivenPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private makeSureTitle: Locator;
    private continueButton: Locator;
    
    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.makeSureTitle = this.page.getByRole('heading', { name: 'To make sure we give you the' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    }

    @step("Confirm giving of right application")
    async confirmMakeSureApplication(){
        await expect(this.makeSureTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Preamble - Confirm giving of right application");
        await this.continueButton.click();
    }
}