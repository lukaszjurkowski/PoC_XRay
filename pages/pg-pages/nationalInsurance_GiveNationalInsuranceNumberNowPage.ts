import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class GiveNationalInsuranceNumberNowPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private nationalInsuranceNumberTitle: Locator;
    private noButGiveRadioButton: Locator;
    private saveAndContinueButton: Locator;
    
    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.nationalInsuranceNumberTitle = this.page.getByRole('heading', {name: 'Can you give us your National'});
        this.noButGiveRadioButton = this.page.getByRole('radio', { name: 'No, but I\'ll give you it later' });
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
    }

    @step("Confirm National Insurance Number ")
    async confirmNationalInsuranceNumber(){
        await expect(this.nationalInsuranceNumberTitle).toBeVisible({ timeout: 20000 });
        await this.noButGiveRadioButton.click();
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "NationalInsurance - Confirm National Insurance Number");
        await this.saveAndContinueButton.click();
    }
}