import { Page } from '@playwright/test';
import { WillYouBeStudyingFullMastersCoursePage } from '../../pages/pg-pages/yourCourse_WillYouBeStudyingFullMastersCoursePage';
import { FullTimeOrPartTimePage } from '../../pages/pg-pages/yourCourse_FullTimeOrPartTimePage';
import { NameOfUniversityOrCollegePage } from '../../pages/pg-pages/yourCourse_NameOfUniversityOrCollegePage';
import { CourseNamePage } from '../../pages/pg-pages/yourCourse_CourseNamePage';
import { CourseSummaryPage } from '../../pages/pg-pages/yourCourse_CourseSummaryPage';
import { YourApplicationForStudentPage } from '../../pages/pg-pages/yourApplicationForStudentPage';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';



export async function fillYourCourse(page: Page, data: any, accessibilityScanResults?: AccessibilityTestCase) {
    const willYouBeStudyingFullMastersCoursePage = new WillYouBeStudyingFullMastersCoursePage(page, accessibilityScanResults);    
    const fullTimeOrPartTimePage = new FullTimeOrPartTimePage(page, accessibilityScanResults);
    const nameOfUniversityOrCollegePage = new NameOfUniversityOrCollegePage(page, data, accessibilityScanResults);
    const courseNamePage = new CourseNamePage(page, data, accessibilityScanResults);
    const courseSummaryPage = new CourseSummaryPage(page, data, accessibilityScanResults);
    const yourApplicationForStudentPage = new YourApplicationForStudentPage(page, accessibilityScanResults);

    await yourApplicationForStudentPage.goToYourCourseSection();
    await willYouBeStudyingFullMastersCoursePage.confirmFullMasterCourse();
    await fullTimeOrPartTimePage.confirmFullorPartTime();
    await nameOfUniversityOrCollegePage.confirmUniversityName(data);
    await courseNamePage.confirmCourseName(data);
    await courseSummaryPage.checkYourCourseDetailsStep(data);
    
}