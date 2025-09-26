import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { AccessibilityTestStep, AccessibilityTestCase } from '../accessibility/accessibilityHandler.ts'

dotenv.config();

// Tests run one by one
test.describe.serial('Accessibility test example - pass', () => {
        test('test failed by serious and critial WCAG 2.1 A and AA violations', async ({ page }, testInfo) => {

            const usedTags: string[] = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
            const projectKey: string = "SLC - Test Automation PoC";

            let accessibilityTestResults = new AccessibilityTestCase(usedTags, projectKey, ["minor", "moderate" ]);

            // step 1

            await page.goto('https://www.hse.gov.uk/');

            await accessibilityTestResults.runScan(page,
                "Co za koncept, u kaduka! Pannom w głowie krokodyle, bo dziś każda zgrozy szuka. To dziś modne, wdzięczne, ładne, co zabójcze, co szkaradne!"
            );

            // step 2

            await page.goto('https://find-and-update.company-information.service.gov.uk/')

            await accessibilityTestResults.runScan(page,
                "Dawniej młoda panieneczka mile rzekła kochankowi: «Daj mi, luby, kanareczka»."
            );

            // step 3

            await page.goto('https://www.gov.pl/web/finanse')

            await accessibilityTestResults.runScan(page,
                "A dziś każda swemu powié: «Jeśli nie chcesz mojej zguby, krrokodyla daj mi, luby!»."
            );

            // step 4

            await page.goto('https://llestudentloanscompany--llesit.sandbox.my.site.com/studentfinance/s/slc-landingpage')

            await accessibilityTestResults.runScan(page,
                "Post, milczenie — wszystko fraszka, straży przy mnie nie postawi. Ale potwór nie igraszka, czart, nie Papkin go przystawi."
            );

            // reports etc

            await accessibilityTestResults.finish(testInfo);

        });

        test('test failed by critical WCAG 2.1 A and AA violations only', async ({ page }, testInfo) => {

            const usedTags: string[] = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
            const projectKey: string = "SLC - Test Automation PoC";

            let accessibilityTestResults = new AccessibilityTestCase(usedTags, projectKey, ["minor", "moderate", "serious" ]);

            // step 1

            await page.goto('https://umcs.pl/');

            await accessibilityTestResults.runScan(page,
                "Ja – z nim w zgodzie? – Mocium Panie, wprzódy słońce w miejscu stanie!"
            );

            // step 2

            await page.goto('https://www.gov.pl/web/finanse')

            await accessibilityTestResults.runScan(page,
                "Wprzódy w morzu wyschnie woda, nim tu u nas będzie zgoda!"
            );


            // reports etc

            await accessibilityTestResults.finish(testInfo);

        });

});
