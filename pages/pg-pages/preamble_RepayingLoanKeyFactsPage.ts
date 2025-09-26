import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class RepayingLoanKeyFactsPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private repayingTitle: Locator;
    private continueButton: Locator;
    
    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.repayingTitle = this.page.getByRole('heading', { name: 'Repaying your loan - key facts' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    }

    @step("Confirm Repaying Loan Key Facts")
    async confirmRepayingLoanKeyFacts(){
        await expect(this.repayingTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Preamble - Confirm Repaying Loan Key Facts");
        await this.continueButton.click();
    }
}