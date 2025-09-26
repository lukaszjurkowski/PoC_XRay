import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';


export class YourNationalityPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private nationalityTitle: Locator;
    private UKNationalRadioButton: Locator;
    private saveAndContinueButton: Locator;

    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.nationalityTitle = this.page.getByText('What\'s your nationality?');
        this.UKNationalRadioButton = this.page.getByRole('radio', { name: 'UK national' });
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
    }

    @step('Fill Your nationality step')
    async fillYourNationalityStep(){
        await expect(this.nationalityTitle).toBeVisible({ timeout: 20000 });
        await this.UKNationalRadioButton.click();
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Residency - Your nationality step");
        await this.saveAndContinueButton.click();
    }
}