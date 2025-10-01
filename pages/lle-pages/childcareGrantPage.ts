import { expect, Locator, Page } from "@playwright/test";
import { AccessibilityTestCase } from "../../accessibility/accessibilityHandler";
import { step } from "../../stepHandler";


export class ChildcareGrantPage {

    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private pageTitle: Locator;
    private continueBtn: Locator;
    private noOption: Locator;
    private saveAndContinueBtn: Locator;
    private checkTitle: Locator;
    private confirmBtn: Locator;

    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.pageTitle = this.page.locator("//h1[contains(text(), 'Childcare Grant')]");
        this.continueBtn = this.page.getByRole('button', { name: 'Continue' });
        this.noOption = this.page.getByRole('radio', { name: 'No, I do not want to apply' });
        this.saveAndContinueBtn = this.page.getByRole('button', { name: 'Save and continue' });
        this.checkTitle = this.page.getByRole('heading', { name: 'Check your details' });
        this.confirmBtn = this.page.getByRole('button', { name: 'Confirm' });
    }

    @step('Fill Childcare Grant steps')
    async fillChildcareGrantSteps() {
        await expect(this.pageTitle).toBeVisible({ timeout: 20000 });
        await this.continueBtn.click();
        await expect(this.noOption).toBeVisible({ timeout: 20000 });
        await this.noOption.click();
        await this.saveAndContinueBtn.click();
        await expect(this.checkTitle).toBeVisible({ timeout: 20000 });
        //TODO add expect to selected options
        await this.confirmBtn.click();

    }
}