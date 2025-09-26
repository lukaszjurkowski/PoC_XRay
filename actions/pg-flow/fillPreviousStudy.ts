import { Page } from '@playwright/test';
import { PreviousPostgraduateMastersFundingPage } from '../../pages/pg-pages/previousStudy_PreviousPostgraduateMastersFundingPage';
import { PreviousStudyAndQualificationsPage } from '../../pages/pg-pages/previousStudy_PreviousStudyAndQualificationsPage';
import { CheckDetailsPage } from '../../pages/pg-pages/previousStudy_CheckDetailsPage';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';


export async function fillPreviousStudy(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
    const previousPostgraduateMastersFundingPage = new PreviousPostgraduateMastersFundingPage(page, accessibilityScanResults);    
    const previousStudyAndQualificationsPage = new PreviousStudyAndQualificationsPage(page, accessibilityScanResults);
    const checkDetailsPage = new CheckDetailsPage(page, accessibilityScanResults);


    await previousPostgraduateMastersFundingPage.confirmPreviousPG();
    await previousStudyAndQualificationsPage.confirmPreviousStudiesAndQualifications()
    await checkDetailsPage.checkPreviousStudyDetails();
    
}