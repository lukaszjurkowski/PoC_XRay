import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class YourApplicationTaskListPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private yourApplicationTitle: Locator;
    private previousStudyLink: Locator;
    private continueButton: Locator;
    
    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.yourApplicationTitle = this.page.getByRole('heading', { name: 'Your application for student finance' });
        this.previousStudyLink = this.page.getByRole('link', { name: 'Previous study' });
    }

    @step("Confirm Your Application For Finance")
    async confirmYourApplicationForFinance(){
        await expect(this.yourApplicationTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Preamble - Confirm Your Application For Finance");
        await this.previousStudyLink.click();
    }
}