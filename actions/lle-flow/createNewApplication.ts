import { Page } from '@playwright/test';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';
import { AboutYouPage } from '../../pages/lle-pages/aboutYouPage';
import { AdditionalContactPage } from '../../pages/lle-pages/additionalContactPage';
import { AdultDependantGrantPage } from '../../pages/lle-pages/adultDependantsGrantPage';
import { BankDetailsPage } from '../../pages/lle-pages/bankDetailsPage';
import { ChildcareGrantPage } from '../../pages/lle-pages/childcareGrantPage';
import { DisabledStudentsAllowancePage } from '../../pages/lle-pages/disabledStudentsAllowancePage';
import { HomePage } from '../../pages/lle-pages/homePage';
import { HouseholdIncomePage } from '../../pages/lle-pages/householdIncomePage';
import { MaintenanceLoanPage } from '../../pages/lle-pages/maintenanceLoanPage';
import { NationalInsuranceNumberPage } from '../../pages/lle-pages/nationalInsuranceNumberPage';
import { NewApplicationPage } from '../../pages/lle-pages/newApplicationPage';
import { ParentsLearningAllowancePage } from '../../pages/lle-pages/parentsLearningAllowancePage';
import { PreviousStudyPage } from '../../pages/lle-pages/previousStudyPage';
import { ResidencyPage } from '../../pages/lle-pages/residencyPage';
import { SponsorDetailsPage } from '../../pages/lle-pages/sponsorDetailsPage';
import { TuitionFeeLoanPage } from '../../pages/lle-pages/tuitionFeeLoanPage';
import { YourCoursePage } from '../../pages/lle-pages/yourCoursePage';
import { HomePage_ApplicationChooser } from '../../pages/shared-pages/homePage_ApplicationChooser';


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
    const sponsorDetailsPage = new SponsorDetailsPage(page, accessibilityScanResults);
    const parentsLearningAllowancePage = new ParentsLearningAllowancePage(page, accessibilityScanResults);
    const childcareGrantPage = new ChildcareGrantPage(page, accessibilityScanResults);
    const adultDependantGrantPage = new AdultDependantGrantPage(page, accessibilityScanResults);
    const disabledStudentsAllowancePage = new DisabledStudentsAllowancePage(page, accessibilityScanResults);
    
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

    await newApplicationPage.goToSponsorDetailSection();
    await sponsorDetailsPage.fillSponsorDetailsSteps();

    await newApplicationPage.goToParentsLearningSection();
    await parentsLearningAllowancePage.fillParentsLearningSteps();

    await newApplicationPage.goToChildcareGrantSection();
    await childcareGrantPage.fillChildcareGrantSteps();

    await newApplicationPage.goToAdultDependantsSection();
    await adultDependantGrantPage.fillAdultDependantsGrantStep();

    await newApplicationPage.goToDisabledStudentsAllowanceSection();
    await disabledStudentsAllowancePage.fillDisabledStudentsAllowanceSteps();

    await newApplicationPage.submitForm(submit_password);
}