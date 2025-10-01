import { expect, Locator, Page } from "@playwright/test";
import { AccessibilityTestCase } from "../../accessibility/accessibilityHandler";
import { step } from '../../stepHandler';

export class DisabledStudentsAllowancePage {

    page: Page;
    pageTitle: Locator;
    private accessibilityScanResults?: AccessibilityTestCase;
    private continueBtn: Locator;
    private whatTitle: Locator;
    private householdTitle: Locator;
    private youllNeedTitle: Locator;
    private assessmentTitle: Locator;
    private dsaTitle: Locator;
    private keepInTouchTitle: Locator;
    private doNotWantOption: Locator;
    private doYouWantTitle: Locator;
    private saveAndContinueBtn: Locator;
    private checkAnswersTitle: Locator;
    private confirmBtn: Locator;

    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.pageTitle = this.page.locator("//h1[contains(text(), 'Before you continue, read the')]");
        this.continueBtn = this.page.getByRole('button', { name: 'Continue' });
        this.whatTitle = this.page.locator("//h1[contains(text(), 'What is Disabled ')]");
        this.householdTitle = this.page.locator("//h1[contains(text(), 'Household income does')]");
        this.youllNeedTitle = this.page.locator("//h1[contains(text(), 'You')]");
        this.assessmentTitle = this.page.locator("//h1[contains(text(), 'You may need to')]");
        this.dsaTitle = this.page.locator("//h1[contains(text(), '5. The DSA application')]");
        this.keepInTouchTitle = this.page.locator("//h1[contains(text(), '6. We')]");
        this.doNotWantOption = this.page.getByRole('radio', { name: 'I do not want to apply for' });
        this.doYouWantTitle = this.page.locator("//label[contains(text(), 'When do you want to')]");
        this.saveAndContinueBtn = this.page.getByRole('button', { name: 'Save and continue' });
        this.checkAnswersTitle = this.page.locator("//label[contains(text(), 'Check your answers')]");
        this.confirmBtn = this.page.locator("//button[contains(text(), 'Confirm')]")
    }

    @step('Fill Disabled students Allowance steps')
    async fillDisabledStudentsAllowanceSteps() {
        await expect(this.pageTitle).toBeVisible({ timeout: 20000});
        await this.continueBtn.click();
        await expect(this.whatTitle).toBeVisible({ timeout: 20000});
        await this.continueBtn.click();
        await expect(this.householdTitle).toBeVisible({ timeout: 40000});
        await this.continueBtn.click();
        await expect(this.youllNeedTitle).toBeVisible({ timeout: 20000});
        await this.continueBtn.click();
        await expect(this.assessmentTitle).toBeVisible({ timeout: 20000});
        await this.continueBtn.click();
        await expect(this.dsaTitle).toBeVisible({ timeout: 20000});
        await this.continueBtn.click();
        await expect(this.keepInTouchTitle).toBeVisible({ timeout: 20000});
        await this.continueBtn.click();
        await expect(this.doYouWantTitle).toBeVisible({ timeout: 30000});
        await this.doNotWantOption.click();
        await this.saveAndContinueBtn.click();
        await expect(this.checkAnswersTitle).toBeVisible({ timeout: 30000});
        await expect(this.confirmBtn).toBeVisible({timeout: 30000});
        await this.confirmBtn.click();
    }
}