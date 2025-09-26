import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class YourApplicationForStudentPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private applicationTitle: Locator;
    private previousStudyLink: Locator;
    private yourCourseLink: Locator;
    private residencyLink: Locator;
    private aboutYouLink: Locator;
    private postgraduateMastersLoadLink: Locator;
    private additionalContactLink: Locator;
    private bankDetailsLink: Locator;
    private nationalInsuranceNumberLink: Locator;

    private continueButton: Locator;
    
    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.applicationTitle = this.page.getByRole('heading', { name: 'Your application for student finance' });
        this.previousStudyLink = this.page.getByRole('link', { name: 'Previous study' });
        this.yourCourseLink = this.page.getByRole('link', { name: 'Your course' });
        this.residencyLink = this.page.getByRole('link', { name: 'Residency' });
        this.aboutYouLink = this.page.getByRole('link', { name: 'About you' });
        this.postgraduateMastersLoadLink = this.page.getByRole('link', { name: 'Postgraduate Master\'s Loan' });
        this.additionalContactLink = this.page.getByRole('link', { name: 'Additional Contact' });
        this.bankDetailsLink = this.page.getByRole('link', { name: 'Bank details' });
        this.nationalInsuranceNumberLink = this.page.getByRole('link', { name: 'National insurance number' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });

        }

        @step("Go to Your Course section")
        async goToYourCourseSection(){
        await this.yourCourseLink.click();
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Course section.");
    }

        @step("Go to Residency section")
        async goToResidencySection(){
        await this.residencyLink.click();
        // if (this.accessibilityScanResults)
        // await this.accessibilityScanResults.runScan(this.page, "Residency section.");
    }

        @step("CGo to About You section")
        async goToAboutYouSection(){
        await this.aboutYouLink.click();
        // if (this.accessibilityScanResults)
        // await this.accessibilityScanResults.runScan(this.page, "About you section.");
    }

        @step("Go to Postgraduate Master's Loan section")
        async goToPostgraduateMastersLoanSection(){
        await this.postgraduateMastersLoadLink.click();
        // if (this.accessibilityScanResults)
        // await this.accessibilityScanResults.runScan(this.page, "Postgraduate section.");
    }

        @step("Go to Additional Contact section")
        async goToAdditionalContactSection(){
        await this.additionalContactLink.click();
        // if (this.accessibilityScanResults)
        // await this.accessibilityScanResults.runScan(this.page, "Additional contact section");
    }

        @step("Go to Bank details section")
        async goToBankDetailsSection(){
        await this.bankDetailsLink.click();
        // if (this.accessibilityScanResults)
        // await this.accessibilityScanResults.runScan(this.page, "Bank details section");
    }

        @step("Go to National Insurance Number section")
        async goToNationalInsuranceSection(){
        await this.nationalInsuranceNumberLink.click();
        // if (this.accessibilityScanResults)
        // await this.accessibilityScanResults.runScan(this.page, "National insurance number section");
    }

        @step("Continue to submit application")
        async continueToSubmitApplication(){
        await this.continueButton.click();
    }

    }