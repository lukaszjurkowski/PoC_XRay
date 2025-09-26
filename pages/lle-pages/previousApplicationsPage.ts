import { Page, Locator, expect } from '@playwright/test'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';
import { step } from '../../stepHandler'

export class PreviousApplicationsPage {

    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private pageTitle: Locator;
    private previousApplicationIndicator: Locator;
    private cancelButton: Locator;
    private confirmationTitle: Locator;
    private confirmationCancelButton: Locator;
    private confirmationCancelTitle: Locator;
    private goBackLink: Locator;
    private homePageLink: Locator;

    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.pageTitle = this.page.getByRole('heading', { name: /^Course/ });
        this.previousApplicationIndicator = this.page.getByText('Incomplete', { exact: true });
        this.cancelButton = this.page.getByRole('link', { name: 'Cancel', exact: true });
        this.confirmationTitle = this.page.getByRole('heading', { name: 'Are you sure you want to' });
        this.confirmationCancelButton = this.page.getByRole('button', { name: 'Cancel' });
        this.confirmationCancelTitle = this.page.getByText('Application cancelled');
        this.goBackLink = this.page.getByRole('link', { name: 'Go back to your applications' });
        this.homePageLink = this.page.getByRole('link', { name: 'Home' });

    }

    @step('Clean the previous application')
    async cleanPreviousApplication() {
        await expect(this.pageTitle).toBeVisible({ timeout: 20000 });
        if(this.accessibilityScanResults)
            await this.accessibilityScanResults.runScan(this.page, "Clean previous application.");

        if (await this.isPreviousApplicationPresent()) {
            console.log('Cleaning the previous application');
            await this.cancelButton.click();
            await expect(this.confirmationTitle).toBeVisible({ timeout: 20000 });
//            if (this.accessibilityScanResults)
//                await this.accessibilityScanResults.runScan(this.page, "Step");
            await this.confirmationCancelButton.click();
            await expect(this.confirmationCancelTitle).toBeVisible({ timeout: 20000 });
//            if (this.accessibilityScanResults)
//                await this.accessibilityScanResults.runScan(this.page, "Step");
            await this.goBackLink.click();
            await expect(this.pageTitle).toBeVisible({ timeout: 20000 });
//            if(this.accessibilityScanResults)
//                this.accessibilityScanResults.runScan(this.page, "Step");
        } else {
            console.log('There is no previous application');
        }
        await this.homePageLink.click();
    }

    async isPreviousApplicationPresent(): Promise<boolean> {
        return this.previousApplicationIndicator.isVisible();
      }
      
}