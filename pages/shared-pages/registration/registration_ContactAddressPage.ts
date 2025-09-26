import { Page, Locator, expect } from '@playwright/test'
import { AccessibilityTestCase } from '../../../accessibility/accessibilityHandler';
import { step } from '../../../stepHandler'

export class RegistrationContactAddress {

    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private contactAddressTitle: Locator;
    private addressLine1Input: Locator;
    private addressLine2Input: Locator;
    private townOrCityInput: Locator;
    private countyInput: Locator;
    private postcodeInput: Locator;
    private countryDropdown: Locator;
    private continueButton: Locator;



    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.contactAddressTitle = this.page.getByRole('heading', { name: 'Your contact address' });
        this.addressLine1Input = this.page.getByRole('textbox', { name: 'Address Line 1' });
        this.addressLine2Input = this.page.getByRole('textbox', { name: 'Address Line 2 (optional)' });
        this.townOrCityInput = this.page.getByRole('textbox', { name: 'Town or city' });
        this.countyInput = this.page.getByRole('textbox', { name: 'County (optional)' });
        this.postcodeInput = this.page.getByRole('textbox', { name: 'Postcode (optional)' });
        this.countryDropdown = this.page.getByLabel('Country');
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });


    }

    @step('Provide Contact Address')
    async provideContactAddress(data) {
        // await expect(this.contactAddressTitle).toBeVisible({ timeout: 20000 });
        await this.addressLine1Input.fill(data.registrationAddressLine1);
        await this.townOrCityInput.fill(data.registrationTownOrCity);
        await this.countryDropdown.selectOption(data.registrationCountry);
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Registration - Provide Contact Address");
        await this.continueButton.click();


    }
}