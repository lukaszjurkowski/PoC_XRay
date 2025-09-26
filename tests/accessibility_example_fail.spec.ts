import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { AccessibilityTestCase, screenshotSettingValues } from '../accessibility/accessibilityHandler.ts'

dotenv.config();

// Tests run one by one
test.describe.serial('Accessibility test example - fail', () => {

        test('should not have any automatically detectable WCAG A or AA violations', async ({ page }, testInfo) => {

            const usedTags: string[] = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
            const projectKey: string = "SLC - Test Automation PoC";

            let accessibilityTestResults = new AccessibilityTestCase(usedTags, projectKey, [], true, screenshotSettingValues.ON_FAIL, false, true);

            // step 1

            await page.goto('https://1lochelm.pl/');

            await accessibilityTestResults.runScan(page,
                "Jestem Papkin — lew północy, rotmistrz sławny i kawaler."
            );

            // step 2

            await page.goto('https://umcs.pl/')

            await accessibilityTestResults.runScan(page,
                "Tak, siak, tedy i owędy. Mądry w radzie, dzielny w boju, dusza wojny, wróg pokoju."
            );

            // step 3

            await page.goto('https://umcs.bip.gov.pl/')

            await accessibilityTestResults.runScan(page,
                "Znają Szwedy, muzułmany, Sasy, Włochy i Hiszpany Artemizy ostrze sławne i nim władać ramię wprawne."
            );

            // step 4

            await page.goto('https://llestudentloanscompany--llesit.sandbox.my.site.com/studentfinance/s/slc-landingpage')

            await accessibilityTestResults.runScan(page,
                "Jednym słowem, krótko mówiąc, kula ziemska zna Papkina — teraz, bratku, daj mi wina."
            );

            // reports etc

            await accessibilityTestResults.finish(testInfo);

        });
});
