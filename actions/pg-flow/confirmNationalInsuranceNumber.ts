import { Page } from '@playwright/test';
import { NationalInsuranceCheckDetails } from '../../pages/pg-pages/nationalInsurance_CheckYourDetailsPage';
import { GiveNationalInsuranceNumberNowPage } from '../../pages/pg-pages/nationalInsurance_GiveNationalInsuranceNumberNowPage';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';
import { YourApplicationForStudentPage } from '../../pages/pg-pages/yourApplicationForStudentPage';


export async function confirmNationalInsuranceNumber(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
    const nationalInsuranceCheckDetails = new NationalInsuranceCheckDetails(page, accessibilityScanResults);    
    const giveNationalInsuranceNumberNowPage = new GiveNationalInsuranceNumberNowPage(page, accessibilityScanResults);
    const yourApplicationForStudentPage = new YourApplicationForStudentPage(page, accessibilityScanResults);

    await yourApplicationForStudentPage.goToNationalInsuranceSection();
    await giveNationalInsuranceNumberNowPage.confirmNationalInsuranceNumber();
    await nationalInsuranceCheckDetails.confirmFullMasterCourse();

}