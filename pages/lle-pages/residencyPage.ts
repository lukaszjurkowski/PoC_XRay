import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';

export class ResidencyPage {
    private page: Page;
    private nationalityTitle: Locator;
    private UKNationalRadioButton: Locator;
    private canYouGivePassportTitle: Locator;
    private noButGiveRadioButton: Locator;
    private saveAndContinueButton: Locator;
    private howToProveTitle: Locator;
    private checkResidencyDetailsTitle: Locator;
    private checkAnswersTitle: Locator;
    private continueButton: Locator;
    private applicationTitle: Locator;
    private expectedUKNationalValue: Locator;
    private expectedNoGiveLaterValue: Locator;
    private confirmButton: Locator;
    private livingLocationBeforeTitle: Locator;
    private noRadioButton: Locator;
    private expectedNoValue: Locator;
    private expectedNo2ndValue: Locator;
    private yourFamilyMemberTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nationalityTitle = this.page.getByText('What\'s your nationality?');
        this.UKNationalRadioButton = this.page.getByRole('radio', { name: 'UK national' });
        this.canYouGivePassportTitle = this.page.getByText('Can you give us your UK');
        this.noButGiveRadioButton = this.page.getByRole('radio', { name: 'No, but I\'ll give you them' });
        this.howToProveTitle = this.page.getByRole('heading', { name: 'How to prove your identity' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.checkResidencyDetailsTitle = this.page.getByText('Check your residency details');
        this.expectedUKNationalValue = this.page.getByText('UK national');
        this.expectedNoGiveLaterValue = this.page.getByText('No, but I\'ll give you them');
        this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
        this.livingLocationBeforeTitle = this.page.getByRole('heading', { name: 'Your living location before' });
        this.yourFamilyMemberTitle = this.page.getByRole('heading', { name: 'Your family member living or' });
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
        this.checkAnswersTitle = this.page.getByText('Check your answers');
        this.expectedNoValue = this.page.getByText('No').first();
        this.expectedNo2ndValue = this.page.getByText('No').nth(1);
        this.noRadioButton = this.page.getByRole('radio', { name: 'No' });
        this.applicationTitle = this.page.getByRole('heading', { name: 'Your application for student' });

    }

    @step('Fill Residency steps')
    async fillResidencySteps(){
        await expect(this.nationalityTitle).toBeVisible({ timeout: 20000 });
        await this.UKNationalRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.canYouGivePassportTitle).toBeVisible({ timeout: 20000 });
        await this.noButGiveRadioButton.click();
        await this.saveAndContinueButton.click();
        
        await expect(this.howToProveTitle).toBeVisible({ timeout: 20000 });
        await this.continueButton.click();

        await expect(this.checkResidencyDetailsTitle).toBeVisible({ timeout: 20000 });
        await expect(this.expectedUKNationalValue.first()).toBeVisible({ timeout: 20000 });
        await expect(this.expectedNoGiveLaterValue).toBeVisible({ timeout: 20000 });
        await this.confirmButton.click();    
        
        await expect(this.livingLocationBeforeTitle).toBeVisible({ timeout: 20000 });
        await this.noRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.yourFamilyMemberTitle).toBeVisible({ timeout: 20000 });
        await this.noRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.checkAnswersTitle).toBeVisible({ timeout: 20000 });
        await expect(this.expectedNoValue).toBeVisible({ timeout: 20000 });
        await expect(this.expectedNo2ndValue).toBeVisible({ timeout: 20000 });
        await this.confirmButton.click();    

        await expect(this.applicationTitle).toBeVisible({ timeout: 20000 }); 
    }
}