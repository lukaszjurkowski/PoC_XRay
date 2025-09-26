import { Page, Locator, expect } from '@playwright/test'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';
import { step } from '../../stepHandler'

export class HomePage_ApplicationChooser {

    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private applicationChooserTitle: Locator;
    private lleApplicationLink: Locator;
    private pgApplicationLink: Locator;

    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = this.accessibilityScanResults;
        this.applicationChooserTitle = this.page.getByRole('heading', { name: 'Select application type' });
        this.lleApplicationLink = this.page.getByRole('link', { name: 'LLE application' });
        this.pgApplicationLink = this.page.getByRole('link', { name: 'Postgraduate application' });
        // this.newApplicationLink = this.page.getByRole('link', { name: 'View Apply for course funding' })
    }

    @step('Go to LLE Application')
    async goToLLEApplication() {
        await expect(this.applicationChooserTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        this.accessibilityScanResults.runScan(this.page, "Application Chooser.");
        await this.lleApplicationLink.click();
    }

        @step('Go to PG Application')
    async goToPGApplication() {
        // await this.page.evaluate("document.body.style.zoom=0.5");
        await expect(this.applicationChooserTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        this.accessibilityScanResults.runScan(this.page, "Application Chooser");
        await this.pgApplicationLink.click();


    }
}