import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';


export class TellAboutPreviousAddressesPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private previousAddressTitle: Locator;
    private expectedPostCode: Locator;
    private addressDropdown: Locator;
    private saveAndContinueButton: Locator;

    constructor(page: Page, data:any, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.previousAddressTitle = this.page.getByRole('heading', { name: 'Tell us about your previous addresses' });
        this.expectedPostCode = this.page.getByText(data.postcodeOrdinaryResidency);
        // this.addressDropdown = this.page.getByText('Address'); //or 'Select an address'
        // this.addressDropdown = this.page.locator('input[name="Screen2_SelectAddress"]');
        this.addressDropdown = this.page.getByLabel('Address');
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
        
    }

    @step('Fill previous addresses')
    async fillPreviousAddresses(data){
        await expect(this.previousAddressTitle).toBeVisible({ timeout: 20000 });
        await expect(this.expectedPostCode).toBeVisible({ timeout: 20000 });
        await this.addressDropdown.selectOption(data.addressOrdinaryResidency);
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "OrdinaryResidency - Fill previous addresses");
        await this.saveAndContinueButton.click();
    }
}