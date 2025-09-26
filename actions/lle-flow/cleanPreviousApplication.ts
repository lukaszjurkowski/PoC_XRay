import { Page } from '@playwright/test';
import { HomePage } from '../../pages/lle-pages/homePage';
import { PreviousApplicationsPage } from '../../pages/lle-pages/previousApplicationsPage';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export async function cleanPreviousApplication(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
    const homePage = new HomePage(page, accessibilityScanResults);
    const previousApplicationsPage = new PreviousApplicationsPage(page, accessibilityScanResults);
    
    await homePage.goToPreviousApplicationSection();
    await previousApplicationsPage.cleanPreviousApplication();
    await homePage.goToPreviousApplicationSection();
    await previousApplicationsPage.cleanPreviousApplication();
}