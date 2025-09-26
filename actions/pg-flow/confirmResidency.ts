import { Page } from '@playwright/test';
import { YourNationalityPage } from '../../pages/pg-pages/residency_YourNationalityPage';
import { CanYouGivePassportDetailsPage } from '../../pages/pg-pages/residency_CanYouGivePassportDetailsPage';
import { HowToProveIdentityPage } from '../../pages/pg-pages/residency_HowToProveIdentityPage';
import { CheckResidencyDetailsPage } from '../../pages/pg-pages/residency_CheckResidencyDetailsPage';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';
import { YourApplicationForStudentPage } from '../../pages/pg-pages/yourApplicationForStudentPage';


export async function confirmResidency(page: Page, data: any, accessibilityScanResults?: AccessibilityTestCase) {
    const yourNationalityPage = new YourNationalityPage(page, accessibilityScanResults);    
    const canYouGivePassportDetailsPage = new CanYouGivePassportDetailsPage(page, accessibilityScanResults);
    const howToProveIdentityPage = new HowToProveIdentityPage(page, accessibilityScanResults);
    const checkResidencyDetailsPage = new CheckResidencyDetailsPage(page, accessibilityScanResults);
    const yourApplicationForStudentPage = new YourApplicationForStudentPage(page, accessibilityScanResults);

    await yourApplicationForStudentPage.goToResidencySection();
    await yourNationalityPage.fillYourNationalityStep();
    await canYouGivePassportDetailsPage.fillCanYouGivePassportDetailsStep();
    await howToProveIdentityPage.verifyHowToProveIdentityStep()
    await checkResidencyDetailsPage.confirmCheckResidencyDetailsStep();    
}