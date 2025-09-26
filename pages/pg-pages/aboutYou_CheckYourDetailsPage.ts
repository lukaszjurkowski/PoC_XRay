import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class CheckYourDetailsPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private applicationTitle: Locator;
    private checkDetailsTitle: Locator;
    private expectedRelationshipStatus: Locator;
    private expectedMarried: Locator;
    private expectedPersonUnder18: Locator;
    private expectedAdultDependency: Locator;
        // These locators are currently missing from the page 
    // private expectedCareLeaver: Locator;
    // private expectedFinanciallySupport: Locator;
    // private expectedRegularContacts: Locator;
    // private expectedMainReason: Locator;
    private expectedCircumstances: Locator;
    private expectedDisabilities: Locator;
    private confirmButton: Locator;
    
    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.checkDetailsTitle = this.page.getByText('Check your details');
        // this.expectedRelationshipStatus = this.page.getByText('Single');
        // this.expectedMarried = this.page.getByText('No, I have not been or will');
        // this.expectedPersonUnder18 = this.page.getByText('No, I will not have care of a');
        // this.expectedAdultDependency = this.page.getByText('No, an adult will not depend');
        // // this.expectedCareLeaver = this.page.getByText('No', { exact: true }).first();
        // // this.expectedFinanciallySupport = this.page.getByText('No', { exact: true }).nth(1);
        // // this.expectedRegularContacts = this.page.getByText('No', { exact: true }).nth(2);
        // // this.expectedMainReason = this.page.getByText('None of the above');
        // this.expectedCircumstances = this.page.getByText('No, these circumstances do');
        // this.expectedDisabilities = this.page.getByText('No', { exact: true }).nth(3);
        this.expectedDisabilities = this.page.getByText('No', { exact: true });

        this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
        this.applicationTitle = this.page.getByRole('heading', { name: 'Your application for student' });
    }

    @step("Confirm Check your details step")
    async confirmCheckYourDetailsStep(){
        await expect(this.checkDetailsTitle).toBeVisible({ timeout: 20000 }); 
        // await expect(this.expectedRelationshipStatus).toBeVisible({ timeout: 20000 });
        // await expect(this.expectedMarried).toBeVisible({ timeout: 20000 });
        // await expect(this.expectedPersonUnder18).toBeVisible({ timeout: 20000 });
        // await expect(this.expectedAdultDependency).toBeVisible({ timeout: 20000 });
        // await expect(this.expectedCareLeaver).toBeVisible({ timeout: 20000 });
        // await expect(this.expectedFinanciallySupport).toBeVisible({ timeout: 20000 });
        // await expect(this.expectedRegularContacts).toBeVisible({ timeout: 20000 });
        // await expect(this.expectedMainReason).toBeVisible({ timeout: 20000 });
        // await expect(this.expectedCircumstances).toBeVisible({ timeout: 20000 });
        await expect(this.expectedDisabilities).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "AboutYou - Check your details page scan");
        await this.confirmButton.click();
        await expect(this.applicationTitle).toBeVisible({ timeout: 20000 }); 
    }
}