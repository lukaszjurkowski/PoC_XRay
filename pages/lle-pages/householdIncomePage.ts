import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';

export class HouseholdIncomePage {
    private page: Page;
    private saveAndContinueButton: Locator;
    private checkAnswersTitle: Locator;
    private continueButton: Locator;
    private applicationTitle: Locator;
    private confirmButton: Locator;
    private noRadioButton: Locator;
    private expectedNoValue: Locator;
    private checkHouseholdIncomeTitle: Locator;
    private doYouWantUsTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkHouseholdIncomeTitle = this.page.getByRole('heading', { name: 'Checking your household income' });
        this.doYouWantUsTitle = this.page.getByText('Do you want us to check your');
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
        this.checkAnswersTitle = this.page.getByText('Check your answers');
        this.expectedNoValue = this.page.getByText('No').first();
        this.noRadioButton = this.page.getByRole('radio', { name: 'No' });
        this.applicationTitle = this.page.getByRole('heading', { name: 'Your application for student' });

    }

    @step('Fill Household Income steps')
    async fillHouseholdIncomeSteps(){
        await expect(this.checkHouseholdIncomeTitle).toBeVisible({ timeout: 20000 });
        await this.continueButton.click();

        await expect(this.doYouWantUsTitle).toBeVisible({ timeout: 20000 });
        await this.noRadioButton.click();
        await this.saveAndContinueButton.click();
        
        await expect(this.checkAnswersTitle).toBeVisible({ timeout: 20000 });
        await expect(this.expectedNoValue).toBeVisible({ timeout: 20000 });
        await this.confirmButton.click();    

        await expect(this.applicationTitle).toBeVisible({ timeout: 20000 }); 
    }
}