import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';


export class CheckYourAddressHistoryPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private addressHistoryTitle: Locator;
    private expectedAddressesSummary: Locator;
    private confirmButton: Locator;
    private applicationTitle: Locator;

    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.addressHistoryTitle = this.page.getByRole('heading', { name: 'Check your answers'});
        this.expectedAddressesSummary = this.page.getByText('Provided', { exact: true });
        this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
        this.applicationTitle = this.page.getByRole('heading', { name: 'Your application for student' });
    }

    @step('Check history Of Ordinary Residency')
    async checkYourAddressHistoryPage(){
        await expect(this.addressHistoryTitle).toBeVisible({ timeout: 20000 });
        await this.expectedAddressesSummary.click();
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "OrdinaryResidency - Check history Of Ordinary Residency");
        await this.confirmButton.click();
        await expect(this.applicationTitle).toBeVisible({ timeout: 20000 }); 

        
    }
}