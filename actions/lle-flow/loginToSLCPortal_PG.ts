import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/shared-pages/loginPage';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export async function loginToSLCPortal_PG(page: Page, loginEmail: string, password: string, accessibilityScanResults?: AccessibilityTestCase) {
    const loginPage = new LoginPage(page, accessibilityScanResults);

    await loginPage.loginToSLCPortal (loginEmail, password);
}