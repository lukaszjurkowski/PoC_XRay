import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';

export class BankDetailsPage {
    private page: Page;
    private saveAndContinueButton: Locator;
    private applicationTitle: Locator;
    private confirmButton: Locator;
    private noButGiveRadioButton: Locator;
    private bankDetailsTitle: Locator;
    private checkAnswersTitle: Locator;
    private expectedNoGiveLaterValue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bankDetailsTitle = this.page.getByRole('heading', { name: 'We need your UK bank or' })
        this.checkAnswersTitle = this.page.getByText('Check your answers');
        this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
        this.applicationTitle = this.page.getByRole('heading', { name: 'Your application for student' });
        this.noButGiveRadioButton = this.page.getByRole('radio', { name: 'No, but I\'ll give you them' });
        this.expectedNoGiveLaterValue = this.page.getByText('No, but I\'ll give you them');
    }

    @step('Fill Bank Details steps')
    async fillBankDetailsSteps(){
        await expect(this.bankDetailsTitle).toBeVisible({ timeout: 20000 });
        await this.noButGiveRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.checkAnswersTitle).toBeVisible({ timeout: 20000 });
        await expect(this.expectedNoGiveLaterValue).toBeVisible({ timeout: 20000 });
        await this.confirmButton.click();    

        await expect(this.applicationTitle).toBeVisible({ timeout: 20000 }); 
    }
}