import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';

export class PreviousStudyPage {
    private page: Page;
    private previousStudyTitle: Locator;
    private previousFundedTitle: Locator;
    private noStudiedRadioButton: Locator;
    private noFundingRadioButton: Locator;
    private saveAndContinueButton: Locator;
    private expectedNotStudiedValue: Locator;
    private expectedNoFundingValue: Locator;
    private checkAnswersTitle: Locator;
    private submitButton: Locator;
    private applicationTitle: Locator;

    constructor(page: Page) {
        this.page = page;
//        this.previousStudyTitle = this.page.getByRole('heading', { name: 'Previous further education' });
        this.previousFundedTitle = this.page.locator("//h1[contains(text(), 'Previous funded study')]");
        
//        this.noStudiedRadioButton = this.page.getByRole('radio', { name: 'No, I have not studied a' });
        this.noFundingRadioButton = this.page.locator("//input[@name='No, I did not have funding to pay for an undergraduate funded course in the UK, and I have not had to leave or repeat a course that I got funding from an Advanced Learner Loan']");
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
//        this.expectedNotStudiedValue = this.page.getByText('No, I have not studied a');
        this.expectedNoFundingValue = this.page.getByText('No');
        this.checkAnswersTitle = this.page.getByText('Check your answers');
        this.submitButton = this.page.getByRole('button', { name: 'Submit' });
        this.applicationTitle = this.page.getByRole('heading', { name: 'Your application for student' });
    }

    @step('Fill Previous Study steps')
    async fillPreviousStudySteps(){
/* Updating to match flow - "Previous further education" step removed in SFL-9372
        await expect(this.previousStudyTitle).toBeVisible({ timeout: 20000 });
        await this.noStudiedRadioButton.click();
        await this.saveAndContinueButton.click();
*/

        await expect(this.previousFundedTitle).toBeVisible({ timeout: 20000 });
        await this.noFundingRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.checkAnswersTitle).toBeVisible({ timeout: 20000 });
//        await expect(this.expectedNotStudiedValue).toBeVisible({ timeout: 20000 });
        await expect(this.expectedNoFundingValue.first()).toBeVisible({ timeout: 20000 });
        await this.submitButton.click();    
                
        await expect(this.applicationTitle).toBeVisible({ timeout: 20000 }); 
    }
}