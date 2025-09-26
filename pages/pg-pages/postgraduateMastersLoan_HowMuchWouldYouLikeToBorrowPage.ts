import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class HowMuchWouldYouLikeToBorrowPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private saveAndContinueButton: Locator;
    private enteringTitle: Locator;
    private maxAmountRadioButton: Locator;
    private lessThanMaxAmountRadioButton: Locator;
    private enterAmountInputTextBox: Locator;
    

    constructor(page: Page, data: any, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
        this.enteringTitle = this.page.getByRole('heading', { name: 'How much would you like to borrow?' });
        this.maxAmountRadioButton = this.page.getByRole('radio', { name: 'I want the maximum amount'});
        this.lessThanMaxAmountRadioButton = this.page.getByRole('radio', { name: 'I want less than the maximum amount'});
        this.enterAmountInputTextBox = this.page.getByRole('textbox', {name: 'Enter amount'});
    }

    @step("I want the maximum amount step")
    async iWantToBorrowMaxAmountStep() {
        await expect(this.enteringTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "PostgraduateMastersLoan - I want the maximum amount step");
        await this.maxAmountRadioButton.click();
        await this.saveAndContinueButton.click();
    }

    @step("I want less than the maximum amount step")
    async iWantToBorrowLessThanMaxAmountStep(data: any) {
        await expect(this.enteringTitle).toBeVisible({ timeout: 20000 });
        await this.lessThanMaxAmountRadioButton.click();
        await expect(this.enterAmountInputTextBox).toBeVisible({ timeout: 20000})
        await this.enterAmountInputTextBox.fill(data.loanAmount)
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "PostgraduateMastersLoan - I want less than the maximum amount step");
        await this.saveAndContinueButton.click();
    }
}
