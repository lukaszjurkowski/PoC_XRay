import { Page, Locator, expect, _android } from '@playwright/test'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';
import { step } from '../../stepHandler'

export class SubmitApplicationPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private submitTitle: Locator;
    private yesUnderstoodRadioButton: Locator;
    private submitPasswordInput: Locator;
    private submitButton: Locator;

    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.yesUnderstoodRadioButton = this.page.getByRole('radio', { name: 'Yes, I have read, understood' });
        this.submitTitle = this.page.getByRole('heading', { name: 'Submit your application' });
        this.submitPasswordInput = this.page.getByRole('textbox', { name: 'Enter your password to sign' });
        this.submitButton = this.page.getByRole('button', { name: 'Submit your application' });    }

    @step("Submit application")
    async submitApplication(submit_password: string) {
        await expect(this.submitTitle).toBeVisible({ timeout: 20000 });
        await this.yesUnderstoodRadioButton.click();
        // TODO: submitting disabled by purpose - to not break the flow after successful submitting
        // await this.submitPasswordInput.fill(submit_password);
        await this.submitPasswordInput.fill(submit_password);
        await this.submitButton.click();
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Submit application page scan");
    }
}