import { expect, Locator, Page } from "@playwright/test";
import { AccessibilityTestCase } from "../../accessibility/accessibilityHandler";
import { step } from "../../stepHandler";

export class ParentsLearningAllowancePage {

    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private continueBtn: Locator;
    private pageTitile: Locator;
    private benefitTitle: Locator;
    private noBtn: Locator;
    private saveAndContinueBtn: Locator;
    private tellUsTitle: Locator;
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private dayInput: Locator;
    private monthInput: Locator;
    private yearInput: Locator;
    private otherRadioBtn: Locator;
    private incomeInput: Locator;
    private confirmBtn: Locator;
    private checkResponsesTitle: Locator;
    

    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.pageTitile = this.page.getByRole('heading', { name: 'Parents’ Learning Allowance' });
        this.continueBtn = this.page.getByRole('button', { name: 'Continue' });
        this.benefitTitle = this.page.getByRole('heading', { name: 'Benefits and childcare funding' });
        this.noBtn = this.page.getByRole('radio', { name: 'No' });
        this.saveAndContinueBtn = this.page.getByRole('button', { name: 'Save and continue' });
        this.tellUsTitle  = this.page.getByRole('heading', { name: 'Tell us about any children' });
        this.firstNameInput = this.page.getByRole('textbox', { name: 'First name' });
        this.lastNameInput = this.page.getByRole('textbox', { name: 'Last name' });
        this.dayInput = this.page.getByRole('textbox', { name: 'Day' });
        this.monthInput = this.page.getByRole('textbox', { name: 'Month' });
        this.yearInput = this.page.getByRole('textbox', { name: 'Year' });
        this.otherRadioBtn = this.page.getByRole('radio', { name: 'Other' });
        this.incomeInput = this.page.getByRole('textbox', { name: 'Child\'s income' });
        this.confirmBtn = this.page.getByRole('button', { name: 'Confirm' });
        this.checkResponsesTitle = this.page.getByText('Check your responses');
    }

    @step('Fill parents learning allowance steps')
    async fillParentsLearningSteps() {
        await expect(this.pageTitile).toBeVisible({timeout: 40000});
        await this.continueBtn.click();
        await expect(this.benefitTitle).toBeVisible();
        await this.noBtn.click();
        await this.saveAndContinueBtn.click();
        await expect(this.tellUsTitle).toBeVisible();
        await this.firstNameInput.fill("FF");
        await this.lastNameInput.fill("LL");
        await this.dayInput.fill("3");
        await this.monthInput.fill("10");
        await this.yearInput.fill("2022");
        await this.otherRadioBtn.click();
        await this.noBtn.click();
        await this.incomeInput.fill("100");
        await this.saveAndContinueBtn.click();
        await expect(this.tellUsTitle).toBeVisible();
        await this.confirmBtn.click();
        await expect(this.checkResponsesTitle).toBeVisible({timeout: 40000});
        //TODO add expect to responses
        await this.confirmBtn.click();
    }
}