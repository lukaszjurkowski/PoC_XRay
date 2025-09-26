import { Page, Locator, expect } from '@playwright/test'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';
import { step } from '../../stepHandler'

export class HomePage {

    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private homePageTitle: Locator;
    private applyForFundingLink: Locator;
    private previousApplicationLink: Locator;
    private cookiesButton: Locator;

    //private newApplicationLink: Locator;

    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = this.accessibilityScanResults;
        this.homePageTitle = this.page.getByRole('heading', { name: 'Applications you\'re supporting' });
        this.applyForFundingLink = this.page.getByRole('link', { name: ' Apply for funding' })
        this.previousApplicationLink = this.page.getByRole('link', { name: ' Your course funding applications' })
        this.cookiesButton = this.page.getByRole('button', { name: ' Accept analytics cookies' })


        // this.newApplicationLink = this.page.getByRole('link', { name: 'View Apply for course funding' })


    }

    @step('Go to apply for funding')
    async goToApplyForFunding() {
        await expect(this.homePageTitle).toBeVisible({ timeout: 20000 });
        await this.cookiesButton.click();
        if (this.accessibilityScanResults)
        this.accessibilityScanResults.runScan(this.page, "Go to previous application.");
        await this.applyForFundingLink.click();
    }


    @step('Go to the previous application section')
    async goToPreviousApplicationSection() {
        await expect(this.previousApplicationLink).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        this.accessibilityScanResults.runScan(this.page, "Go to previous application.");
        await this.previousApplicationLink.click();
    }

    // @step('Go to the new application section')
    // async goToNewApplicationSection() {
    //     await expect(this.newApplicationLink).toBeVisible({ timeout: 20000 });
    //     // if (this.accessibilityScanResults)
    //         // this.accessibilityScanResults.runScan(this.page, "Go to new application.");
    //     await this.newApplicationLink.click();
    // }
}