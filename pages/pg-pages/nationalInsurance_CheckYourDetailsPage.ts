import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class NationalInsuranceCheckDetails {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private checkDetailsTitle: Locator;
    private expectedNoGiveLaterValue: Locator;
    private confirmButton: Locator;
    private applicationTitle: Locator;

    
    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.checkDetailsTitle = this.page.getByText('Check your details');
        this.expectedNoGiveLaterValue = this.page.getByText('No, but I\'ll give you it later');
        this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
        this.applicationTitle = this.page.getByRole('heading', { name: 'Your application for student' });

    }

    @step("CheckDetailsOfNationalInsurance")
    async confirmFullMasterCourse(){
        await expect(this.checkDetailsTitle).toBeVisible({ timeout: 20000 });
        await expect(this.expectedNoGiveLaterValue).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "NationalInsurance - check details of national insurance page");
        await this.confirmButton.click();    
        await expect(this.applicationTitle).toBeVisible({ timeout: 20000 }); 
    }
}