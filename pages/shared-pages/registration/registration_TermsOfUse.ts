import { Page, Locator, expect } from '@playwright/test'
import { AccessibilityTestCase } from '../../../accessibility/accessibilityHandler'
import { step } from '../../../stepHandler'

export class RegistrationTermsOfUse {

    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private termsOfUseTitle: Locator;
    private termsRadio: Locator;

    private continueButton: Locator;


    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.termsOfUseTitle = this.page.getByRole('heading', { name: 'Terms of use' , exact: true });
        this.termsRadio = this.page.getByRole('radio', { name: 'I agree to the site Terms of Use' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        //TBD to add all fields with verification against expected values
    }

    @step('ProvidePersonalDetails')
    async confirmTermsOfUse() {
        // await expect(this.termsOfUseTitle).toBeVisible({ timeout: 20000 });
        await this.termsRadio.click();
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Registration - ProvidePersonalDetails");
        await this.continueButton.click();
    }


}