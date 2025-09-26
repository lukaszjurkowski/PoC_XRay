import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class WhatIsTheAddressOfAdditionalContactPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private saveAndContinueButton: Locator;
    private additionalAddressTitle: Locator;
    private additionalAddressDropdown: Locator;

    constructor(page: Page, data: any, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.additionalAddressTitle = this.page.getByText('What\'s the address for your');
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
        this.additionalAddressDropdown = this.page.getByLabel('Address');
    }

    @step('Choose Address of additional contact')
    async chooseAddressOfAdditionalContact(data: any){
        await expect(this.additionalAddressTitle).toBeVisible({ timeout: 20000 });
        await this.additionalAddressDropdown.click();
        // Choose "Flat 1. 293 Neasden Lane‚ LONDON, NW10 1QR GB" value
        // TODO: dynamically search for the given value
        const optionValue = await this.additionalAddressDropdown.locator('option').nth(2).getAttribute('value');
        await this.additionalAddressDropdown.selectOption(optionValue);
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "AdditionalContact - Choose Address of Additional contact");
        await this.saveAndContinueButton.click();
    }
}