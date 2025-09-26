import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';


export class CheckResidencyDetailsPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private checkResidencyDetailsTitle: Locator;
    private expectedUKNationalValue: Locator;
    private expectedUKNationalNumber: number;

    private expectedNoGiveLaterValue: Locator;
    private confirmButton: Locator;

    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.checkResidencyDetailsTitle = this.page.getByText('Check your residency details');
        this.expectedUKNationalValue = this.page.getByText('UK national');
        this.expectedNoGiveLaterValue = this.page.getByText('No, but I\'ll give you them');
        this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
    }

    @step('Confirm Check residency details step')
    async confirmCheckResidencyDetailsStep(){
        await expect(this.checkResidencyDetailsTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Residency - Check residency details step");
        this.expectedUKNationalNumber = await this.expectedUKNationalValue.count();
        await expect(this.expectedUKNationalNumber).toBe(2);
        await expect(this.expectedNoGiveLaterValue).toBeVisible({ timeout: 20000 });
        await this.confirmButton.click();  
    }
}