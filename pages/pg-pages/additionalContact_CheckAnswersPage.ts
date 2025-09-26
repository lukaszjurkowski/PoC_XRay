import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class CheckAnswersPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private applicationTitle: Locator;
    private confirmButton: Locator;
    private checkAnswersTitle: Locator;
    private expectedFirstNameValue: Locator;
    private expectedLastNameValue: Locator;
    private expectedRelationValue: Locator;
    private expectedAddressValue: Locator;

    constructor(page: Page, data: any, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.checkAnswersTitle = this.page.getByText('Check your answers');
        this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
        this.expectedFirstNameValue = this.page.getByText(data.expectedDisplayedFirstNameAdditionalContact);
        this.expectedLastNameValue = this.page.getByText(data.expectedDisplayedLastNameAdditionalContact);
        this.expectedRelationValue = this.page.getByText(data.expectedDisplayedRelationAdditionalContact);
        this.expectedAddressValue = this.page.getByText(data.expectedDisplayedAddressAdditionalContact);
        this.applicationTitle = this.page.getByRole('heading', { name: 'Your application for student' });
    }

    @step('Confirm Check answers step')
    async confirmCheckAnswersStep(data: any){
        await expect(this.checkAnswersTitle).toBeVisible({ timeout: 20000 });
        await expect(this.expectedFirstNameValue).toBeVisible({ timeout: 20000 });
        await expect(this.expectedLastNameValue).toBeVisible({ timeout: 20000 });
        await expect(this.expectedRelationValue).toBeVisible({ timeout: 20000 });
        await expect(this.expectedAddressValue).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "AdditionalContact - Check answer page.");
        await this.confirmButton.click();    

        await expect(this.applicationTitle).toBeVisible({ timeout: 20000 }); 
    }
}