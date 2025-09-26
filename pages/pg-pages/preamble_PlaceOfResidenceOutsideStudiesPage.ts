import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class PlaceOfResidenceOutsideStudiesPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private placeResidenceTitle: Locator;
    private providedValueResidenceRadioButton: Locator;
    private continueButton: Locator;
    
    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.placeResidenceTitle = this.page.getByRole('heading', { name: 'Place of residence outside of' });
        // this.providedValueResidenceRadioButton = this.page.locator('input[type="radio"][value="ProvidedAddress"]');
        this.providedValueResidenceRadioButton = this.page.locator('input[type="radio"][value="ProvidedAddress"][name="Screen1_RadioNormallyLive2"]');
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    }

    @step("Confirm place of residence outside of studies")
    async confirmPlaceOfResidenceOutsideOfStudies(){
        await expect(this.placeResidenceTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Preamble - Confirm place of residence outside of studies");
        await this.providedValueResidenceRadioButton.click();
        await this.continueButton.click();
    }
}