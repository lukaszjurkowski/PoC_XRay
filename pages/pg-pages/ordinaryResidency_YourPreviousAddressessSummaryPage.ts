import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class YourPreviousAddressessSummaryPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private previousAddressSummaryTitle: Locator;
    private expectedAddressSummary: Locator;
    private expectedStartEndSummary: Locator;
    private saveAndContinueButton: Locator;


    constructor(page: Page, data: any, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.previousAddressSummaryTitle = this.page.getByRole('heading', {name: 'Your previous addresses'});
        this.expectedAddressSummary = this.page.getByText(data.summaryPageAddressOrdinaryResidency);
        this.expectedStartEndSummary = this.page.getByText(data.startEndDatesSummaryOrdinaryResidency);
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue'});
    }

    @step('Check your address summary page')
    async checkYourAddressSummaryPage(){
        await expect(this.previousAddressSummaryTitle).toBeVisible({ timeout: 20000 });
        await expect(this.expectedAddressSummary).toBeVisible({ timeout: 20000 });
        await expect(this.expectedStartEndSummary).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "OrdinaryResidency - Check your address summary page");
        await this.saveAndContinueButton.click();
    }



}