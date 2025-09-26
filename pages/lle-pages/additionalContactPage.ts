import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';

export class AdditionalContactPage {
    private page: Page;
    private saveAndContinueButton: Locator;
    private applicationTitle: Locator;
    private confirmButton: Locator;
    private continueButton: Locator;
    private findAddressButton: Locator;
    private additionalContactTitle: Locator;
    private additionalRelationTitle: Locator;
    private findAddressTitle: Locator;
    private additionalAddressTitle: Locator;
    private additionalContactNameTitle: Locator;
    private checkAnswersTitle: Locator;
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private expectedFirstNameValue: Locator;
    private expectedLastNameValue: Locator;
    private expectedRelationValue: Locator;
    private expectedAddressValue: Locator;
    private additionalRelationDropdown: Locator;
    private findAddressInput: Locator;
    private additionalAddressDropdown: Locator;

    constructor(page: Page, data: any) {
        this.page = page;
        this.additionalContactTitle = this.page.getByRole('heading', { name: 'Additional contact' });
        this.additionalContactNameTitle = this.page.getByRole('heading', { name: 'What\'s the name of your' });
        this.additionalRelationTitle = this.page.getByText('What\'s your additional');
        this.findAddressTitle = this.page.getByRole('heading', { name: 'Find the address for your' });
        this.additionalAddressTitle = this.page.getByText('What\'s the address for your');
        this.checkAnswersTitle = this.page.getByText('Check your answers');
        this.firstNameInput = this.page.getByRole('textbox', { name: 'First name' });
        this.lastNameInput = this.page.getByRole('textbox', { name: 'Last name' });
        this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
        this.findAddressButton = this.page.getByRole('button', { name: 'Find address' });
        this.applicationTitle = this.page.getByRole('heading', { name: 'Your application for student' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.expectedFirstNameValue = this.page.getByText(data.expectedDisplayedFirstNameAdditionalContact);
        this.expectedLastNameValue = this.page.getByText(data.expectedDisplayedLastNameAdditionalContact);
        this.expectedRelationValue = this.page.getByText(data.expectedDisplayedRelationAdditionalContact);
        this.expectedAddressValue = this.page.getByText(data.expectedDisplayedAddressAdditionalContact);
        this.findAddressInput = this.page.getByRole('textbox', { name: 'Postcode' });
        this.additionalRelationDropdown = this.page.getByLabel('What\'s your additional');
        this.additionalAddressDropdown = this.page.getByLabel('Address');
    }

    @step('Fill Additional Contact steps')
    async fillAdditionalContactSteps(data: any){
        await expect(this.additionalContactTitle).toBeVisible({ timeout: 20000 });
        await this.continueButton.click();    
        
        await expect(this.additionalContactNameTitle).toBeVisible({ timeout: 20000 });
        await this.firstNameInput.fill(data.firstNameAdditionalContact);
        await this.lastNameInput.fill(data.lastNameAdditionalContact);
        await this.saveAndContinueButton.click();
        
        await expect(this.additionalRelationTitle).toBeVisible({ timeout: 20000 });
        await this.additionalRelationDropdown.selectOption(data.relationAdditionalContact);
        await this.saveAndContinueButton.click();

        await expect(this.findAddressTitle).toBeVisible({ timeout: 20000 });
        await this.findAddressInput.click();
        await this.findAddressInput.fill(data.postcodeAdditionalContact);
        await this.findAddressButton.click();

        await expect(this.additionalAddressTitle).toBeVisible({ timeout: 20000 });
        await this.additionalAddressDropdown.click();
        // Choose "Flat 1. 293 Neasden Lane‚ LONDON, NW10 1QR GB" value
        // TODO: dynamically search for the given value
        const optionValue = await this.additionalAddressDropdown.locator('option').nth(2).getAttribute('value');
        await this.additionalAddressDropdown.selectOption(optionValue);
        await this.saveAndContinueButton.click();
        
        await expect(this.checkAnswersTitle).toBeVisible({ timeout: 20000 });
        await expect(this.expectedFirstNameValue).toBeVisible({ timeout: 20000 });
        await expect(this.expectedLastNameValue).toBeVisible({ timeout: 20000 });
        await expect(this.expectedRelationValue).toBeVisible({ timeout: 20000 });
        await expect(this.expectedAddressValue).toBeVisible({ timeout: 20000 });
        await this.confirmButton.click();    

        await expect(this.applicationTitle).toBeVisible({ timeout: 20000 }); 
    }
}