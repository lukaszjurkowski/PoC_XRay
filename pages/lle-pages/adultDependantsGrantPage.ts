import { expect, Locator, Page } from "@playwright/test";
import { AccessibilityTestCase } from "../../accessibility/accessibilityHandler";
import { step } from "../../stepHandler";

export class AdultDependantGrantPage {

    page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private pageTitle: Locator;
    private noOption: Locator;
    private saveAndContinueBtn: Locator;
    private checkDetailsTitle: Locator;
    private confirmBtn: Locator;

    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.pageTitle = this.page.locator("//h1[contains(text(), 'Adult')]");
        this.noOption = this.page.locator("//input[@value='No']");
        this.saveAndContinueBtn = this.page.getByRole('button', { name: 'Save and continue' });
        this.checkDetailsTitle = this.page.getByText('Check your details');
        this.confirmBtn = this.page.getByRole('button', { name: 'Confirm' });
    }

    @step('Fill Adult Dependants Grant steps')
    async fillAdultDependantsGrantStep() {
        await expect(this.pageTitle).toBeVisible({ timeout: 40000 });
        await expect(this.noOption).toBeVisible({timeout: 40000});
        await this.noOption.click();
        await this.saveAndContinueBtn.click();
        await expect(this.checkDetailsTitle).toBeVisible({ timeout: 40000 });
        await this.confirmBtn.click();
    }
}