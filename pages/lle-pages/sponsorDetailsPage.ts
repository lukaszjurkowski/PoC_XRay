import { expect, Locator, Page } from "@playwright/test";
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';
import { step } from "../../stepHandler";


export class SponsorDetailsPage {

    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private pageTitle: Locator;
    private continueBtn: Locator;
    private checkAnswersTitle: Locator;
    private confirmBtn: Locator;

    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.pageTitle = this.page.locator("//h1[contains(text(), 'Support for your application')]");
        this.continueBtn = this.page.getByRole('button', { name: 'Continue' });
        this.checkAnswersTitle = this.page.locator("//label[contains(text(), 'Check your answers')]");
        this.confirmBtn = this.page.getByRole('button', { name: 'Confirm' });
    }

    @step('Fill sponsor details steps')
    async fillSponsorDetailsSteps() {
        await expect(this.pageTitle).toBeVisible({ timeout: 40000 });
        await this.continueBtn.click();
        await expect(this.checkAnswersTitle).toBeVisible({ timeout: 40000 });
        await this.confirmBtn.click();
    }
}