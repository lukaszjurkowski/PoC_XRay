import { Page, Locator, expect } from '@playwright/test'
import { AccessibilityTestCase } from '../../../accessibility/accessibilityHandler';
import { step } from '../../../stepHandler'

export class RegistrationPasswordCreationPage {

    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private createPasswordTitle: Locator;
    private enterPasswordInput: Locator;
    private continueButton: Locator;



    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.createPasswordTitle = this.page.getByRole('heading', { name: 'Create your password' });
        this.enterPasswordInput = this.page.getByRole('textbox', { name: 'Enter new password' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });

    }

    @step('Create the password for account')
    async createPassword(password) {
        await expect(this.createPasswordTitle).toBeVisible({ timeout: 20000 });
        await this.enterPasswordInput.fill(password);
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Registration - Create the password for account");
        await this.continueButton.click();


    }
}