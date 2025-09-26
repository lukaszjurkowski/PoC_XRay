import { Page } from '@playwright/test';
import { CheckYourDetailsPage } from '../../pages/pg-pages/aboutYou_CheckYourDetailsPage';
import { DisabilitiesOrConditionsThatAffectsStudiesPage } from '../../pages/pg-pages/aboutYou_DisabilitiesOrConditionsThatAffectsStudiesPage';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';
import { YourApplicationForStudentPage } from '../../pages/pg-pages/yourApplicationForStudentPage';


export async function confirmAboutYou(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
    const checkYourDetailsPage = new CheckYourDetailsPage(page, accessibilityScanResults);    
    const disabilitiesOrConditionsThatAffectsStudiesPage = new DisabilitiesOrConditionsThatAffectsStudiesPage(page, accessibilityScanResults);
    const yourApplicationForStudentPage = new YourApplicationForStudentPage(page, accessibilityScanResults);

    await yourApplicationForStudentPage.goToAboutYouSection();
    await disabilitiesOrConditionsThatAffectsStudiesPage.fillDisabilitiesOrConditionsThatAffectsStudies();
    await checkYourDetailsPage.confirmCheckYourDetailsStep();
 
}