import { _android, expect, test } from '@playwright/test';
import dotenv from 'dotenv';
import testData from "../test_data/slc_course_funding.json";
import { loginToSLCPortal } from '../actions/loginToSLCPortal';
import { cleanPreviousApplication } from '../actions/cleanPreviousApplication';
import { createNewApplication } from '../actions/createNewApplication';
import { AccessibilityTestCase } from '../accessibility/accessibilityHandler';

dotenv.config();

test.use({ screenshot: 'off' });

// Tests run one by one
test.describe.serial('SLC - course funding - accessibility', () => {
    for (const data of testData) {
        test(`Course funding: ${data.name}`, async ({page}, testInfo) => {

            const usedTags: string[] = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
            const projectKey: string = "SLC - Test Automation PoC";

            let accessibilityScanResults = new AccessibilityTestCase(usedTags, projectKey, [ "minor" ], true);
            
            // 1. Login to SLC Portal
            await loginToSLCPortal(page, process.env.PORTAL_URL!, process.env.PORTAL_LOGIN!, process.env.PORTAL_PASSWORD!, accessibilityScanResults);
    
            // 2. Cancel the previously created application
            await cleanPreviousApplication(page, accessibilityScanResults);

            // 3. Create a new application
            await createNewApplication(page, data, process.env.PORTAL_SUBMIT!, accessibilityScanResults);
            
            await accessibilityScanResults.finish(testInfo);
        });
    }
});
