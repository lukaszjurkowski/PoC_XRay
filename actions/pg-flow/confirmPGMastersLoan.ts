import { Page } from '@playwright/test';
import { ConfirmCheckYourDetailsStepPostgraduateMastersLoan } from '../../pages/pg-pages/postgraduateMastersLoan_CheckyourDetailsPage';
import { HowMuchWouldYouLikeToBorrowPage } from '../../pages/pg-pages/postgraduateMastersLoan_HowMuchWouldYouLikeToBorrowPage';
import { YourApplicationForStudentPage } from '../../pages/pg-pages/yourApplicationForStudentPage';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';


export async function confirmPGMastersLoan(page: Page, data: any, accessibilityScanResults?: AccessibilityTestCase) {
    const yourApplicationForStudentPage = new YourApplicationForStudentPage(page, accessibilityScanResults);
    const howMuchWouldYouLikeToBorrowPage = new HowMuchWouldYouLikeToBorrowPage(page, data, accessibilityScanResults);
    const confirmCheckYourDetailsStepPostgraduateMastersLoan = new ConfirmCheckYourDetailsStepPostgraduateMastersLoan(page, data, accessibilityScanResults);    

    await yourApplicationForStudentPage.goToPostgraduateMastersLoanSection();
    await howMuchWouldYouLikeToBorrowPage.iWantToBorrowMaxAmountStep();
    await confirmCheckYourDetailsStepPostgraduateMastersLoan.confirmCheckYourDetailsMaxAmountStep();
 
}