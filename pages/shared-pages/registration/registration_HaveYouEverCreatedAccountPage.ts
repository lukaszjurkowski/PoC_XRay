import { Page, Locator, expect } from '@playwright/test'
import { AccessibilityTestCase } from '../../../accessibility/accessibilityHandler';
import { step } from '../../../stepHandler'

export class RegistrationPageHaveYouCreatedAccount {

    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private haveYouEverTitle: Locator;
    private haveYouEverRadio: Locator;
    private continueButton: Locator;



    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.haveYouEverTitle = this.page.getByRole('heading', { name: 'Have you ever created a student finance account?' });
        this.haveYouEverRadio = this.page.getByRole('radio', { name: 'No. I have never created a student finance account' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });

        // this.submitBtn = this.page.getByRole('button', { name: 'Continue' });
        // this.signOutBtn = this.page.getByRole('link', { name: 'Sign out' });
    }

    @step('Answer whether you have created an account')
    async ConfirmHaveYouAccount() {
        await expect(this.haveYouEverTitle).toBeVisible({ timeout: 20000 });
        await this.haveYouEverRadio.click();
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Registration - Answer whether you have created an account");
        await this.continueButton.click();

    }
}