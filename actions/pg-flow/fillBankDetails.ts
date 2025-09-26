import { Page } from '@playwright/test';
import { CheckAnswersPage } from '../../pages/pg-pages/bankDetails_CheckAnswersPage';
import { NeedYourUKBankOrBuildingSocietyAccountDetailsPage } from '../../pages/pg-pages/bankDetails_NeedYourUKBankOrBuildingSocietyAccountDetailsPage';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';
import { YourApplicationForStudentPage } from '../../pages/pg-pages/yourApplicationForStudentPage';


export async function fillBankDetails(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
    const checkAnswersPage = new CheckAnswersPage(page, accessibilityScanResults);    
    const needYourUKBankOrBuildingSocietyAccountDetailsPage = new NeedYourUKBankOrBuildingSocietyAccountDetailsPage(page,  accessibilityScanResults);
    const yourApplicationForStudentPage = new YourApplicationForStudentPage(page, accessibilityScanResults);

    await yourApplicationForStudentPage.goToBankDetailsSection();
    await needYourUKBankOrBuildingSocietyAccountDetailsPage.fillUKBankOrBuildingSocietyAccountDetails();
    await checkAnswersPage.confirmCheckAnswersStep();
 
}