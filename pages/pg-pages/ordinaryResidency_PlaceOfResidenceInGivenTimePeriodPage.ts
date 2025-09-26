import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';


export class PlaceOfResidenceInGivenTimePeriodPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private ordinaryResidencyTitle: Locator;
    private continue: Locator;

    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.ordinaryResidencyTitle = this.page.getByRole('heading', { name: 'We need to know where you lived from 1 September 2022 to 1 September 2025' });
        this.continue = this.page.getByRole('button', { name: 'Continue' });
    }

    @step('Fill Place of Residency Given Time Period')
    async fillPlaceOfResidencyOrdinary(){
        await expect(this.ordinaryResidencyTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "OrdinaryResidency - Fill Place of Residency Given Time Period");
        await this.continue.click();
    }
}