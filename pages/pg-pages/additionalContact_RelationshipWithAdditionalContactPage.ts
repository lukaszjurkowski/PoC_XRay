import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class RelationshipWithAdditionalContactPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private saveAndContinueButton: Locator;
    private additionalRelationTitle: Locator;
    private additionalRelationDropdown: Locator;

    constructor(page: Page, data: any, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.additionalRelationTitle = this.page.getByText('What\'s your additional');
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
        this.additionalRelationDropdown = this.page.getByLabel('What\'s your additional');
    }

    @step('Choose Relationship with additional contact')
    async chooseRelationshipWithAdditionalContact(data: any){
        await expect(this.additionalRelationTitle).toBeVisible({ timeout: 20000 });
        await this.additionalRelationDropdown.selectOption(data.relationAdditionalContact);
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "AdditionalContact - Relationship with additional contact");
        await this.saveAndContinueButton.click();
    }
}