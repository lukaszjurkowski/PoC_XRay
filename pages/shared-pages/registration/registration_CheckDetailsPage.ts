import { Page, Locator, expect } from '@playwright/test'
import { AccessibilityTestCase } from '../../../accessibility/accessibilityHandler';
import { step } from '../../../stepHandler'

export class RegistrationCheckDetails {

    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private checkDetailsTitle: Locator;
    private continueButton: Locator;


    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.checkDetailsTitle = this.page.getByRole('heading', { name: 'Check your details are correct' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        //TBD to add all fields with verification against expected values
    }

    @step('Check details on registration page')
    async checkRegistrationDetails() {
        
        await expect(this.checkDetailsTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Registration - Check details on registration page");
        await this.continueButton.click();
    }


}