import { Page } from '@playwright/test';
import { DataProtectionStatementPage } from '../../pages/pg-pages/preamble_DataProtectionStatementPage';
import { DirectEntryStudentPage } from '../../pages/pg-pages/preamble_DirectEntryStudentPage';
import { FirstDayOfYourCoursePage } from '../../pages/pg-pages/preamble_FirstDayOfYourCoursePage';
import { MakeSureIfTheRightApplicationGivenPage } from '../../pages/pg-pages/preamble_MakeSureIfTheRightApplicationGivenPage';
import { PlaceOfResidenceOutsideStudiesPage } from '../../pages/pg-pages/preamble_PlaceOfResidenceOutsideStudiesPage';
import { RepayingLoanKeyFactsPage } from '../../pages/pg-pages/preamble_RepayingLoanKeyFactsPage';
import { WhatNeedToBeCompletePage } from '../../pages/pg-pages/preamble_WhatNeedToBeCompletePage';
import { YourApplicationTaskListPage } from '../../pages/pg-pages/preamble_YourApplicationTaskListPage';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';


export async function goThroughPreamble(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
    const firstDayOfYourCoursePage = new FirstDayOfYourCoursePage(page, accessibilityScanResults);    
    const makeSureIfTheRightApplicationGivenPage = new MakeSureIfTheRightApplicationGivenPage(page, accessibilityScanResults);
    const placeOfResidenceOutsideStudiesPage = new PlaceOfResidenceOutsideStudiesPage(page, accessibilityScanResults);
    const directEntryStudentPage = new DirectEntryStudentPage(page, accessibilityScanResults);
    const repayingLoanKeyFactsPage = new RepayingLoanKeyFactsPage(page, accessibilityScanResults);
    const dataProtectionStatementPage = new DataProtectionStatementPage(page, accessibilityScanResults);
    const whatNeedToBeCompletePage = new WhatNeedToBeCompletePage(page, accessibilityScanResults);
    const yourApplicationTaskListPage = new YourApplicationTaskListPage(page, accessibilityScanResults);



    await firstDayOfYourCoursePage.confirmFirstDayOfCourse();
    await makeSureIfTheRightApplicationGivenPage.confirmMakeSureApplication();
    await placeOfResidenceOutsideStudiesPage.confirmPlaceOfResidenceOutsideOfStudies();
    await directEntryStudentPage.confirmDirectEntryStudent();
    await repayingLoanKeyFactsPage.confirmRepayingLoanKeyFacts();
    await dataProtectionStatementPage.confirmDataProtectionStatement();
    await whatNeedToBeCompletePage.confirmToApply();
    await yourApplicationTaskListPage.confirmYourApplicationForFinance();

}