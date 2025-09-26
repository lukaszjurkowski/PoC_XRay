import { Page, Locator, expect, _android } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class ConfirmCheckYourDetailsStepPostgraduateMastersLoan {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private expectedBorrowMaxAmountText : Locator;
    private expectedBorrowLessThanMaxText : Locator;
    private checkDetailsTitle: Locator;
    private expectedBorrowMaxAmountValue: Locator;
    private expectedBorrowLessThanMaxAmountValue: Locator;
    private confirmButton : Locator;


    constructor(page: Page, data: any, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.checkDetailsTitle = this.page.getByText('Check your details');
        this.expectedBorrowMaxAmountText = this.page.getByText('I want the maximum amount');
        this.expectedBorrowLessThanMaxText = this.page.getByText( 'I want less than the maximum amount');
        this.expectedBorrowMaxAmountValue = this.page.getByText('£12,300.00');
        this.confirmButton = this.page.getByRole('button', {name: 'Confirm'})
        // this.expectedBorrowLessThanMaxAmountValue = this.page.getByText(data.expectedDisplayedLoanAmount);

    }

    @step("Check your details max amount")
    async confirmCheckYourDetailsMaxAmountStep(){
        await expect(this.checkDetailsTitle).toBeVisible({ timeout: 20000 });
        await expect(this.expectedBorrowMaxAmountText).toBeVisible({ timeout: 20000 }); 
        await expect(this.expectedBorrowMaxAmountValue).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "PostgraduateMastersLoan - Check your details max amount");
        await this.confirmButton.click(); 
    }

    @step("Check your details less than max amount")
    async confirmCheckYourDetailsLessThanMaxAmountStep(){
        await expect(this.checkDetailsTitle).toBeVisible({ timeout: 20000 });
        await expect(this.expectedBorrowLessThanMaxText).toBeVisible({ timeout: 20000 }); 
        await expect(this.expectedBorrowLessThanMaxAmountValue).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "PostgraduateMastersLoan - Check your details less than max amount");
        await this.confirmButton.click(); 
    }
}