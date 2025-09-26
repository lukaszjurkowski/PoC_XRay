import { Page, Locator, expect } from '@playwright/test'
import { AccessibilityTestCase } from '../../../accessibility/accessibilityHandler';
import { step } from '../../../stepHandler'

export class RegistrationPage {

    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private registerButton: Locator;
    private passwordInput: Locator;
    private submitBtn: Locator;
    private signOutBtn: Locator;

    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.registerButton = this.page.getByRole('button', { name: 'Create an account' });
        // this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        // this.submitBtn = this.page.getByRole('button', { name: 'Continue' });
        // this.signOutBtn = this.page.getByRole('link', { name: 'Sign out' });
    }

    @step('Create an account to SLC portal')
    async registertoSLC(url: string) {
        await this.page.goto(url);
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Registration and Login page");
        await this.registerButton.click();
        // await this.passwordInput.fill(password);
        // await this.submitBtn.click();
        // await expect(this.signOutBtn).toBeEnabled({ timeout: 20000 });
    }
}