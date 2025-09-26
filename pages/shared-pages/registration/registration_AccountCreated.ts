import { Page, Locator, expect } from '@playwright/test'
import { AccessibilityTestCase } from '../../../accessibility/accessibilityHandler';
import { step } from '../../../stepHandler'

export class RegistrationAccountCreated {

    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private accountCreatedTitle: Locator;
    private continueButton: Locator;


    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.accountCreatedTitle = this.page.getByRole('heading', { name: 'You have created your student finance account' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        //TBD to add all fields with verification against expected values
    }

    @step('Account has been created')
    async confirmAccountCreation() {
        await expect(this.accountCreatedTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Registration - Account has been created");
        await this.continueButton.click();
    }


}