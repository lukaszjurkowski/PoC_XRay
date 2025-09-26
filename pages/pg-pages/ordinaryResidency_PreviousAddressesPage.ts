import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';


export class PreviousAddressesPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private previousAddressTitle: Locator;
    private postcodeInput: Locator;
    private findAddressButton: Locator;

    constructor(page: Page, data: any, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.previousAddressTitle = this.page.getByRole('heading', { name: 'Tell us about your previous addresses' });
        this.postcodeInput = this.page.getByRole('textbox', { name: 'Postcode' });
        this.findAddressButton = this.page.getByRole('button', { name: 'Find address' });
    }

    @step('Fill Your Previous Address Postcode')
    async fillPreviousPostcode(data){
        await expect(this.previousAddressTitle).toBeVisible({ timeout: 20000 });
        await this.postcodeInput.fill(data.postcodeOrdinaryResidency);
        await this.findAddressButton.click();
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "OrdinaryResidency - Fill Your Previous Address Postcode");
    }
}