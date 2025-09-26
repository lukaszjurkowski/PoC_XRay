import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class AddressOfAdditionalContactPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private findAddressButton: Locator;
    private findAddressTitle: Locator;
    private findAddressInput: Locator;

    constructor(page: Page, data: any, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.findAddressTitle = this.page.getByRole('heading', { name: 'Find the address for your' });
        this.findAddressButton = this.page.getByRole('button', { name: 'Find address' });
        this.findAddressInput = this.page.getByRole('textbox', { name: 'Postcode' });
    }

    @step('Find Address of additional contact')
    async findAddressOfAdditionalContact(data: any){
        await expect(this.findAddressTitle).toBeVisible({ timeout: 20000 });
        await this.findAddressInput.click();
        await this.findAddressInput.fill(data.postcodeAdditionalContact);
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "AdditionalContact - Find Address of Additional Contact.");
        await this.findAddressButton.click();
    }
}