import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class NameOfAdditionalContactPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private saveAndContinueButton: Locator;
    private additionalContactNameTitle: Locator;
    private firstNameInput: Locator;
    private lastNameInput: Locator;

    constructor(page: Page, data: any, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.additionalContactNameTitle = this.page.getByRole('heading', { name: 'What\'s the name of your' });
        this.firstNameInput = this.page.getByRole('textbox', { name: 'First name' });
        this.lastNameInput = this.page.getByRole('textbox', { name: 'Last name' });
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
    }

    @step('Fill Name of additional contact')
    async fillNameOfAdditionalContact(data: any){
        await expect(this.additionalContactNameTitle).toBeVisible({ timeout: 20000 });
        await this.firstNameInput.fill(data.firstNameAdditionalContact);
        await this.lastNameInput.fill(data.lastNameAdditionalContact);
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "AdditionalContact - Name of Additional contact page.");
        await this.saveAndContinueButton.click();
    }
}