import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class DisabilitiesOrConditionsThatAffectsStudiesPage {

    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private saveAndContinueButton: Locator;
    private disabilitiesTitle: Locator;
    private noRadioButton: Locator;

    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.disabilitiesTitle = this.page.getByRole('heading', { name: 'Disabilities or conditions that may affect your studies' });
        this.noRadioButton = this.page.getByRole('radio', { name: 'No' });
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
    }

    @step("Fill Disabilities or conditions that affects studies")
    async fillDisabilitiesOrConditionsThatAffectsStudies(){
        await expect(this.disabilitiesTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "AboutYou - Fill Disabilities or conditions that affects studies");
        await this.noRadioButton.click();
        await this.saveAndContinueButton.click();
    }
}