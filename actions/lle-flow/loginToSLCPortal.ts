import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/lle-pages/loginPage';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export async function loginToSLCPortal(page: Page, url: string, login: string, password: string, accessibilityScanResults?: AccessibilityTestCase) {
    const loginPage = new LoginPage(page, accessibilityScanResults);
    
    await loginPage.loginToSLCPortal(url, login, password);
}