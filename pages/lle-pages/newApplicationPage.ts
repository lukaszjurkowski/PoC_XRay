import { Page, Locator, expect, _android } from '@playwright/test'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';
import { step } from '../../stepHandler'

export class NewApplicationPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private firstDayTitle: Locator;
    private firstDayRadioButton: Locator;
    private continueButton: Locator;
    private makeSureTitle: Locator;
    private placeResidenceTitle: Locator;
    private providedValueResidenceRadioButton: Locator;
    private repayingTitle: Locator;
    private dataProtectionTitle: Locator;
    private agreeRadioButton: Locator;
    private whatCompleteTitle: Locator;
    private applyButton: Locator;
    private applicationTitle: Locator;
    private aboutYouLink: Locator;
    private yourCourseLink: Locator;
    private previousStudyLink: Locator;
    private residencyLink: Locator;
    private householdIncomeLink: Locator;
    private tuitionFeeLoanLink: Locator;
    private maintenanceLoanLink: Locator;
    private additionalContactLink: Locator;
    private bankDetailsLink: Locator;
    private nationalInsuranceNumberLink: Locator;
    private beforeSubmitTitle: Locator;
    private enteringTitle: Locator;
    private responsibilityTitle: Locator;
    private submitTitle: Locator;
    private yesUnderstoodRadioButton: Locator;
    private submitPasswordInput: Locator;
    private submitButton: Locator;
    private sponsorDetailsLink: Locator;
    private parentsLearningLink: Locator;
    private childcareGrantLink: Locator;
    private adultDependantsLink: Locator;
    private disabledStudentAllowanceLink: Locator;

    constructor(page: Page, accessibilityScanResults: AccessibilityTestCase | undefined) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.firstDayTitle = this.page.getByText('When is the first day of your');
        //this.firstDayRadioButton = this.page.getByRole('radio', { name: 'The first day of my course is between 18 May 2025 and 18 June' });
        this.firstDayRadioButton = this.page.locator('xpath=(//input[@type="radio"])[1]');  //locator changed to xpath in order to make test stable on both environments
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.makeSureTitle = this.page.getByRole('heading', { name: 'To make sure we give you the' });
        this.placeResidenceTitle = this.page.getByRole('heading', { name: 'Place of residence outside of' });
        // this.providedValueResidenceRadioButton = this.page.locator('input[type="radio"][value="ProvidedAddress"]');
        this.providedValueResidenceRadioButton = this.page.locator('input[type="radio"][value="ProvidedAddress"][name="Screen1_RadioNormallyLive2"]');
        this.repayingTitle = this.page.getByRole('heading', { name: 'Repaying your loan - key facts' });
        this.dataProtectionTitle = this.page.getByRole('heading', { name: 'Data protection statement and privacy notice', exact: true });
        this.agreeRadioButton = this.page.getByRole('radio', { name: 'I agree with how you\'ll use' });
        this.whatCompleteTitle = this.page.getByRole('heading', { name: 'What you\'ll need to complete' });
        this.applyButton = this.page.getByRole('button', { name: 'Apply' });
        this.applicationTitle = this.page.getByRole('heading', { name: 'Your application for student' });
        this.aboutYouLink = this.page.getByRole('link', { name: 'About You' });
        this.yourCourseLink = this.page.getByRole('link', { name: 'Your course' });
        this.previousStudyLink = this.page.getByRole('link', { name: 'Previous study' });
        this.residencyLink = this.page.getByRole('link', { name: 'Residency' });
        this.householdIncomeLink = this.page.getByRole('link', { name: 'Household income' });
        this.tuitionFeeLoanLink = this.page.getByRole('link', { name: 'Tuition Fee Loan' });
        this.maintenanceLoanLink = this.page.getByRole('link', { name: 'Maintenance Loan' });
        this.additionalContactLink = this.page.getByRole('link', { name: 'Additional contact' });
        this.bankDetailsLink = this.page.getByRole('link', { name: 'Bank details' });
        this.nationalInsuranceNumberLink = this.page.getByRole('link', { name: 'National insurance number' });
        this.beforeSubmitTitle = this.page.getByRole('heading', { name: 'Before you submit' });
        this.enteringTitle = this.page.getByRole('heading', { name: 'You are entering into a' });
        this.responsibilityTitle = this.page.getByRole('heading', { name: 'You have a responsibility to' });
        this.submitTitle = this.page.getByRole('heading', { name: 'Submit your application' });
        this.yesUnderstoodRadioButton = this.page.getByRole('radio', { name: 'Yes, I have read, understood' });
        this.submitPasswordInput = this.page.getByRole('textbox', { name: 'Enter your password to sign' });
        this.submitButton = this.page.getByRole('button', { name: 'Submit your application' });
        this.sponsorDetailsLink = this.page.getByRole('link', { name: 'Sponsor details' });
        this.parentsLearningLink = this.page.getByRole('link', { name: 'Parents\' Learning Allowance' });
        this.childcareGrantLink = this.page.getByRole('link', { name: 'Childcare Grant' });
        this.adultDependantsLink = this.page.getByRole('link', { name: 'Adult Dependants\' Grant' });
        this.disabledStudentAllowanceLink = this.page.getByRole('link', { name: 'Disabled Students\' Allowance' });
    }
    
    @step("Go to 'About you' section'")
    async goToAboutYouSection(){
        await this.aboutYouLink.click();
    }

    @step("Go to 'Your course' section'")
    async goToYourCourseSection(){
        await this.yourCourseLink.click();
    }

    @step("Go to 'Previous study' section'")
    async goToPreviousStudySection(){
        await this.previousStudyLink.click();
    }

    @step("Go to 'Residency' section'")
    async goToResidencySection(){
        await this.residencyLink.click();
    }

    @step("Go to 'Household income' section'")
    async goToHouseholdIncomeSection(){
        await this.householdIncomeLink.click();
    }

    @step("Go to 'Tuition fee loan' section'")
    async goToTuitionFeeLoanSection(){
        await this.tuitionFeeLoanLink.click();
    }

    @step("Go to 'Maintenance loan' section'")
    async goToMaintenanceLoanSection(){
        await this.maintenanceLoanLink.click();
    }

    @step("Go to 'Additional contact' section'")
    async goToAdditionalContactSection() {
        await this.additionalContactLink.click();
    }

    @step("Go to 'Bank details' section'")
    async goToBankDetailsSection() {
        await this.bankDetailsLink.click();
    }

    @step("Go to 'National insurance number' section'")
    async goToNationalInsuranceNumberSection() {
        await this.nationalInsuranceNumberLink.click();
    }

    @step("Go to 'Sponsor details' section'")
    async goToSponsorDetailSection() {
        await this.sponsorDetailsLink.click();
    }

    @step("Go to 'Parents Learning Allowance' section'")
    async goToParentsLearningSection() {
        await this.parentsLearningLink.click();
    }

    @step("Go to 'Childcare Grant' section'")
    async goToChildcareGrantSection() {
        await this.childcareGrantLink.click();
    }

    @step("Go to 'Adult Dependants Grant' section'")
    async goToAdultDependantsSection() {
        expect(this.adultDependantsLink).toBeVisible({timeout: 20000});
        await this.adultDependantsLink.click();
    }

    @step("Go to 'Disabled Students Allowance' section")
    async goToDisabledStudentsAllowanceSection() {
        await this.disabledStudentAllowanceLink.click();
    }

    @step("Fill preamble steps")
    async fillPreambleSteps(){
        await expect(this.firstDayTitle).toBeVisible({ timeout: 20000 });

        // if (this.accessibilityScanResults)
            // await this.accessibilityScanResults.runScan(this.page, "Fill preamble steps.");

        await this.firstDayRadioButton.click();
        await this.continueButton.click();

        // --- Please comment this section in case of the issue with missing preamble steps

        await expect(this.makeSureTitle).toBeVisible({ timeout: 20000 });
        await this.continueButton.click();

        await expect(this.placeResidenceTitle).toBeVisible({ timeout: 20000 });
        await this.providedValueResidenceRadioButton.click();
        await this.continueButton.click();

        await expect(this.repayingTitle).toBeVisible({ timeout: 20000 });
        await this.continueButton.click();

        await expect(this.dataProtectionTitle).toBeVisible({ timeout: 20000 });
        await this.agreeRadioButton.click();
        await this.continueButton.click();
        
        await expect(this.whatCompleteTitle).toBeVisible({ timeout: 20000 });
        await this.applyButton.click();

        // ---
        
        await expect(this.applicationTitle).toBeVisible({ timeout: 20000 }); 
    }

    @step("Submit the application form")
    async submitForm(submit_password: string) {
        await expect(this.continueButton).toBeVisible({timeout: 30000});
        await this.continueButton.click();

        await expect(this.beforeSubmitTitle).toBeVisible({ timeout: 50000 });
        await this.continueButton.click();

        await expect(this.enteringTitle).toBeVisible({ timeout: 50000 });
        await this.continueButton.click();
        
        await expect(this.responsibilityTitle).toBeVisible({ timeout: 50000 });
        await expect(this.continueButton).toBeEnabled({timeout: 50000});
        await this.continueButton.click();

        await expect(this.submitTitle).toBeVisible({ timeout: 50000 });
        await this.yesUnderstoodRadioButton.click();
        // TODO: submitting disabled by purpose - to not break the flow after successful submitting
        // await this.submitPasswordInput.fill(submit_password);
        await this.submitPasswordInput.fill('some incorrect password');
        await this.submitButton.click();
    }
}