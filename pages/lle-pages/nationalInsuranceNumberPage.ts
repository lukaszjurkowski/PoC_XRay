import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';

export class NationalInsuranceNumberPage {
    private page: Page;
    private saveAndContinueButton: Locator;
    private applicationTitle: Locator;
    private confirmButton: Locator;
    private noButGiveRadioButton: Locator;
    private nationalInsuranceNumberTitle: Locator;
    private checkDetailsTitle: Locator;
    private expectedNoGiveLaterValue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nationalInsuranceNumberTitle = this.page.getByText('Can you give us your National');
        this.checkDetailsTitle = this.page.getByText('Check your details');
        this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
        this.applicationTitle = this.page.getByRole('heading', { name: 'Your application for student' });
        this.noButGiveRadioButton = this.page.getByRole('radio', { name: 'No, but I\'ll give you it later' });
        this.expectedNoGiveLaterValue = this.page.getByText('No, but I\'ll give you it later');
    }

    @step('Fill National Insurance Number steps')
    async fillNationalInsuranceNumberSteps(){
        await expect(this.nationalInsuranceNumberTitle).toBeVisible({ timeout: 20000 });
        await this.noButGiveRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.checkDetailsTitle).toBeVisible({ timeout: 20000 });
        await expect(this.expectedNoGiveLaterValue).toBeVisible({ timeout: 20000 });
        await this.confirmButton.click();    

        await expect(this.applicationTitle).toBeVisible({ timeout: 20000 }); 
    }
}