import { Page, Locator, expect } from '@playwright/test'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';
import { step } from '../../stepHandler'

export class LoginPage {

    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private loginInput: Locator;
    private passwordInput: Locator;
    private submitBtn: Locator;
    private signOutBtn: Locator;

    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.loginInput = this.page.getByRole('textbox', { name: 'Email address' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.submitBtn = this.page.getByRole('button', { name: 'Continue' });
        this.signOutBtn = this.page.getByRole('link', { name: 'Sign out' });
    }

    @step('Log in to SLC portal')
    async loginToSLCPortal(url: string, login: string, password: string) {
        await this.page.goto(url);
        if (this.accessibilityScanResults)
            await this.accessibilityScanResults.runScan(this.page, "Login to SLC portal.");
        await this.loginInput.fill(login);
        await this.passwordInput.fill(password);
        await this.submitBtn.click();
        await expect(this.signOutBtn).toBeEnabled({ timeout: 20000 });
    }
}