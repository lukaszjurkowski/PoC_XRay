import { Page } from '@playwright/test';
import { BeforeYouSubmitPage } from '../../pages/pg-pages/beforeYouSubmitPage';
import { EnteringIntoAContractPage } from '../../pages/pg-pages/enteringIntoAContractPage';
import { ResponsibilityToKeepContactDetailsUpToDatePage } from '../../pages/pg-pages/responsibilityToKeepContactDetailsUpToDatePage';
import { SubmitApplicationPage } from '../../pages/pg-pages/submitApplicationPage';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';
import { YourApplicationForStudentPage } from '../../pages/pg-pages/yourApplicationForStudentPage';


export async function submitApplicationSteps(page: Page, submit_password: string, accessibilityScanResults?: AccessibilityTestCase) {
    const beforeYouSubmitPage = new BeforeYouSubmitPage(page, accessibilityScanResults);    
    const enteringIntoAContractPage = new EnteringIntoAContractPage(page, accessibilityScanResults);
    const responsibilityToKeepContactDetailsUpToDatePage = new ResponsibilityToKeepContactDetailsUpToDatePage(page, accessibilityScanResults);    
    const submitApplicationPage = new SubmitApplicationPage(page, accessibilityScanResults);
    const yourApplicationForStudentPage = new YourApplicationForStudentPage(page, accessibilityScanResults);


    await yourApplicationForStudentPage.continueToSubmitApplication();
    await beforeYouSubmitPage.verifyBeforeYouSubmitStep();
    await enteringIntoAContractPage.verifyEnteringIntoAContractStep();
    await responsibilityToKeepContactDetailsUpToDatePage.verifyResponsibilityToKeepContactDetailsUpToDateStep();
    await submitApplicationPage.submitApplication(submit_password);
}