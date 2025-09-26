import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';


export class CheckAnswersPage {
    private page: Page;
    private applicationTitle: Locator;
    private accessibilityScanResults?: AccessibilityTestCase;
    private confirmButton: Locator;
    private checkAnswersTitle: Locator;
    private expectedNoGiveLaterValue: Locator;

    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.checkAnswersTitle = this.page.getByText('Check your answers');
        this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
        this.applicationTitle = this.page.getByRole('heading', { name: 'Your application for student' });
        this.expectedNoGiveLaterValue = this.page.getByText('No, but I\'ll give you them');
    }

    @step('Confirm Check answers step')
    async confirmCheckAnswersStep(){
        await expect(this.checkAnswersTitle).toBeVisible({ timeout: 20000 });
        await expect(this.expectedNoGiveLaterValue).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "BankDetails - Confirm Check answers");
        await this.confirmButton.click();    

        await expect(this.applicationTitle).toBeVisible({ timeout: 20000 }); 
    }
}