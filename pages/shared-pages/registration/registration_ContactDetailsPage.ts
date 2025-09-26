import { Page, Locator, expect } from '@playwright/test'
import { AccessibilityTestCase } from '../../../accessibility/accessibilityHandler';
import { step } from '../../../stepHandler'

export class RegistrationContactDetails {

    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private contactDetailsTitle: Locator;
    private homePhoneInput: Locator;
    private mobilePhoneInput: Locator;
    private emailInput: Locator;
    private confirmEmailInput: Locator;
    private alternativeFormatDropdown: Locator;
    private continueButton: Locator;
    private generatedEmail: string;


    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.contactDetailsTitle = this.page.getByRole('heading', { name: 'Provide your contact details' , exact: true });
        this.contactDetailsTitle = this.page.getByText('Provide your contact details');
        this.homePhoneInput = this.page.getByRole('textbox', { name: 'Home phone number (optional)' });
        this.mobilePhoneInput = this.page.getByRole('textbox', { name: 'Mobile phone number (optional)' });
        this.emailInput = this.page.getByRole('textbox', { name: 'Email address', exact: true });
        this.confirmEmailInput = this.page.getByRole('textbox', { name: 'Confirm email address',  exact: true  });
        this.alternativeFormatDropdown = this.page.getByRole('option', { name: 'Alternative format for letters' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        
    }

    @step('Provide Contact Details')
    async provideContactDetails() {
        this.generatedEmail = generateUniqueEmail();
        await expect(this.contactDetailsTitle).toBeVisible({ timeout: 20000 });
        await this.emailInput.fill(this.generatedEmail);
        await this.confirmEmailInput.fill(this.generatedEmail);
        console.log('Generated email = '+ this.generatedEmail);
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Registration - Provide Contact Details");
        await this.continueButton.click();
        return this.generatedEmail;
    }

    @step('Return generated Email')
    async returnGeneratedEmail() {
        return this.generatedEmail;
    }

}

function getFormattedDate(): string {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDay()).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}${month}${year}`;
}

function generateUniqueEmail(): string {
    const letters = 'ABCDEFGHIJKLMNOPRSTUW'
    const digits = '0123456789'
    const randomChars = (source: string, lenght: number) => 
    [...Array(lenght)]
    .map(() => source.charAt(Math.floor(Math.random() * source.length)))
    .join('');
    return "slc_email_" + getFormattedDate() + "_" + randomChars(letters, 3) + randomChars(digits, 2) + "@test.test";
}