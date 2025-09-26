import { Page } from '@playwright/test';
import { HomePage } from '../../pages/lle-pages/homePage';
import { HomePage_ApplicationChooser } from '../../pages/shared-pages/homePage_ApplicationChooser';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export async function createNewPGApplication(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
    const homePage = new HomePage(page, accessibilityScanResults);
    const homePage_ApplicationChooser = new HomePage_ApplicationChooser(page, accessibilityScanResults);
    
    await homePage.goToApplyForFunding();
    await homePage_ApplicationChooser.goToPGApplication();

}