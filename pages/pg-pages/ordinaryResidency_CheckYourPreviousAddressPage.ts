import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class CheckYourPreviousAddressPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private previousAddressesSummaryTitle: Locator;
    private expectedAddressesSummary: Locator;
    private expectedStartDateSummary: Locator;
    private expectedEndDateSummary: Locator;
    private expectedReasonSummary: Locator;
    private confirmButton: Locator;

       constructor(page: Page, data: any, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.previousAddressesSummaryTitle = this.page.getByRole('heading', {name: 'Check your answers'});
        this.expectedAddressesSummary = this.page.getByText(data.summaryPageAddressOrdinaryResidency);
        this.expectedStartDateSummary = this.page.getByText(data.summaryPageStartDateOrdinaryResidency);
        this.expectedEndDateSummary = this.page.getByText(data.summaryPageEndDateOrdinaryResidency);
        this.expectedReasonSummary = this.page.getByText(data.reasonToLiveOrdinaryResidency);
        this.confirmButton = this.page.getByRole('button', { name: 'Confirm'});

    }

    @step('Check your address summary page')
    async checkYourAddressSummaryPage(){
        await expect(this.previousAddressesSummaryTitle).toBeVisible({ timeout: 20000 });
        await expect(this.expectedAddressesSummary).toBeVisible({ timeout: 20000 });
        await expect(this.expectedStartDateSummary).toBeVisible({ timeout: 20000 });
        await expect(this.expectedEndDateSummary).toBeVisible({ timeout: 20000 });
        await expect(this.expectedReasonSummary).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "OrdinaryResidency - Check your address summary page");
        await this.confirmButton.click();
    }
}