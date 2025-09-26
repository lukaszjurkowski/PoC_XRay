import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';

export class TuitionFeeLoanPage {
    private page: Page;
    private saveAndContinueButton: Locator;
    private applicationTitle: Locator;
    private confirmButton: Locator;
    private noRadioButton: Locator;
    private expectedNoValue: Locator;
    private tuitionFeesTitle: Locator;
    private checkDetailsTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tuitionFeesTitle = this.page.getByRole('heading', { name: 'Your Tuition Fees' });
        this.checkDetailsTitle = this.page.getByText('Check your details');
        this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
        this.expectedNoValue = this.page.getByText('No').first();
        this.noRadioButton = this.page.getByRole('radio', { name: 'No' });
        this.applicationTitle = this.page.getByRole('heading', { name: 'Your application for student' });

    }

    @step('Fill Tuition Fee Loan steps')
    async fillTuitionFeeLoanSteps(){
        await expect(this.tuitionFeesTitle).toBeVisible({ timeout: 20000 });
        await this.noRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.checkDetailsTitle).toBeVisible({ timeout: 20000 });
        await expect(this.expectedNoValue).toBeVisible({ timeout: 20000 });
        await this.confirmButton.click();    

        await expect(this.applicationTitle).toBeVisible({ timeout: 20000 }); 
    }
}