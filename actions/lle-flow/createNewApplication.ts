import { Page } from '@playwright/test';
import { HomePage } from '../../pages/lle-pages/homePage';
import { HomePage_ApplicationChooser } from '../../pages/shared-pages/homePage_ApplicationChooser';
import { NewApplicationPage } from '../../pages/lle-pages/newApplicationPage';
import { AboutYouPage } from '../../pages/lle-pages/aboutYouPage';
import { YourCoursePage } from '../../pages/lle-pages/yourCoursePage';
import { PreviousStudyPage } from '../../pages/lle-pages/previousStudyPage';
import { ResidencyPage } from '../../pages/lle-pages/residencyPage';
import { HouseholdIncomePage } from '../../pages/lle-pages/householdIncomePage';
import { TuitionFeeLoanPage } from '../../pages/lle-pages/tuitionFeeLoanPage';
import { MaintenanceLoanPage } from '../../pages/lle-pages/maintenanceLoanPage';
import { AdditionalContactPage } from '../../pages/lle-pages/additionalContactPage';
import { BankDetailsPage } from '../../pages/lle-pages/bankDetailsPage';
import { NationalInsuranceNumberPage } from '../../pages/lle-pages/nationalInsuranceNumberPage';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export async function createNewApplication(page: Page, data: any, submit_password: string, accessibilityScanResults?: AccessibilityTestCase) {
    const homePage = new HomePage(page, accessibilityScanResults);
    const homePage_ApplicationChooser = new HomePage_ApplicationChooser(page, accessibilityScanResults);
    const newApplicationPage = new NewApplicationPage(page, accessibilityScanResults);
    const aboutYouPage = new AboutYouPage(page, accessibilityScanResults);
    const yourCoursePage = new YourCoursePage(page, data);
    const previousStudyPage = new PreviousStudyPage(page);
    const residencyPage = new ResidencyPage(page);
    const householdIncomePage = new HouseholdIncomePage(page);
    const tuitionFeeLoanPage = new TuitionFeeLoanPage(page);
    const maintenanceLoanPage = new MaintenanceLoanPage(page);
    const additionalContactPage = new AdditionalContactPage(page, data);
    const bankDetailsPage = new BankDetailsPage(page);
    const nationalInsuranceNumberPage = new NationalInsuranceNumberPage(page);
    
    await homePage.goToApplyForFunding();
    await homePage_ApplicationChooser.goToLLEApplication();

    await newApplicationPage.fillPreambleSteps();

    await newApplicationPage.goToAboutYouSection();
    await aboutYouPage.fillAboutYouSteps();

    await newApplicationPage.goToYourCourseSection();
    await yourCoursePage.fillYourCourseSteps(data);

    await newApplicationPage.goToPreviousStudySection();
    await previousStudyPage.fillPreviousStudySteps();
    
    await newApplicationPage.goToResidencySection();
    await residencyPage.fillResidencySteps();
    
    await newApplicationPage.goToHouseholdIncomeSection();
    await householdIncomePage.fillHouseholdIncomeSteps();
    
    await newApplicationPage.goToTuitionFeeLoanSection();
    await tuitionFeeLoanPage.fillTuitionFeeLoanSteps();
    
    await newApplicationPage.goToMaintenanceLoanSection();
    await maintenanceLoanPage.fillMaintenanceLoanSteps();

    await newApplicationPage.goToAdditionalContactSection();
    await additionalContactPage.fillAdditionalContactSteps(data);
    
    await newApplicationPage.goToBankDetailsSection();
    await bankDetailsPage.fillBankDetailsSteps();
    
    await newApplicationPage.goToNationalInsuranceNumberSection();
    await nationalInsuranceNumberPage.fillNationalInsuranceNumberSteps();

    await newApplicationPage.submitForm(submit_password);
}