import { Page, Locator, expect } from '@playwright/test'
import { AccessibilityTestCase } from '../../../accessibility/accessibilityHandler';
import { step } from '../../../stepHandler'

export class RegistrationPersonalDetails {

    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private personalDetailsTitle: Locator;
    private titleDropdown: Locator;
    private firstNameInput: Locator;
    private lastNameNameInput: Locator;
    private dayDateDOBInput: Locator;
    private monthDateDOBInput: Locator;
    private yearDateDOBInput: Locator;
    private genderDropdown: Locator;
    private townOfBirthInput: Locator;
    private continueButton: Locator;



    constructor(page: Page,  accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.personalDetailsTitle = this.page.getByRole('heading', { name: 'Provide your personal details' });
        this.titleDropdown = this.page.getByLabel('Title');
        this.firstNameInput = this.page.getByRole('textbox', { name: 'First name' });
        this.lastNameNameInput = this.page.getByRole('textbox', { name: 'Last name' });
        this.dayDateDOBInput = this.page.getByRole('textbox', { name: 'Day' });
        this.monthDateDOBInput = this.page.getByRole('textbox', { name: 'Month' });
        this.yearDateDOBInput = this.page.getByRole('textbox', { name: 'Year' });
        this.genderDropdown = this.page.getByLabel('Gender');
        this.townOfBirthInput = this.page.getByRole('textbox', { name: 'Town of birth' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        // this.signOutBtn = this.page.getByRole('link', { name: 'Sign out' });
    }

    @step('ProvidePersonalDetails')
    async providePersonalDetails(data) {
        await expect(this.personalDetailsTitle).toBeVisible({ timeout: 20000 });
        // await this.titleDropdown.click();
        await this.titleDropdown.selectOption(data.registrationTitle);
        await this.firstNameInput.fill(data.registrationFirstName);
        await this.lastNameNameInput.fill(data.registrationLastName);
        await this.dayDateDOBInput.fill(data.registrationDayDOB);
        await this.monthDateDOBInput.fill(data.registrationMonthDOB);
        await this.yearDateDOBInput.fill(data.registrationYearDOB);
        await this.genderDropdown.selectOption(data.registrationGender);
        await this.townOfBirthInput.fill(data.registrationTownOfBirth);
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Registration - Provide Personal Details");
        await this.continueButton.click();

    }
}