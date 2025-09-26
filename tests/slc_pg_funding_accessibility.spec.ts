import { _android, test } from '@playwright/test';
import dotenv from 'dotenv';
import testData from "../test_data/slc_test_data.json";
import { loginToSLCPortal_PG } from '../actions/lle-flow/loginToSLCPortal_PG';
import { createNewPGApplication } from '../actions/pg-flow/createNewPGApplication';
import { goThroughPreamble } from '../actions/pg-flow/goThroughPreamble';
import { fillPreviousStudy } from '../actions/pg-flow/fillPreviousStudy';
import { fillYourCourse } from '../actions/pg-flow/fillYourCourse';
import { confirmResidency } from '../actions/pg-flow/confirmResidency';
import { fillOrdinaryResidencyDetails } from '../actions/pg-flow/fillOrdinaryResidencyDetails';
import { confirmAboutYou } from '../actions/pg-flow/confirmAboutYou';
import { confirmPGMastersLoan } from '../actions/pg-flow/confirmPGMastersLoan';
import { fillAdditionalContact } from '../actions/pg-flow/fillAdditionalContact';
import { fillBankDetails } from '../actions/pg-flow/fillBankDetails';
import { confirmNationalInsuranceNumber } from '../actions/pg-flow/confirmNationalInsuranceNumber';
import { submitApplicationSteps } from '../actions/pg-flow/submitApplicationSteps';
import { registerAccount } from '../actions/registration/registerAccount';
import { AccessibilityTestCase, screenshotSettingValues } from '../accessibility/accessibilityHandler';

dotenv.config();

// Tests run one by one
test.describe.serial('SLC - PG funding', () => {
    for (const data of testData.filter((dataSet)=> dataSet.name === 'SLC PG funding flow')) {
        test(`Course funding: ${data.name}`, async ({page}, testInfo) => {
           
            const usedTags: string[] = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
            const projectKey: string = "SLC - Test Automation PoC";
            let accessibilityScanResults = new AccessibilityTestCase(usedTags, projectKey, [], true, screenshotSettingValues.ON_FAIL, false, true);
            
            // 0. Register to SLC
            const loginEmail = await registerAccount(page, data, process.env.PORTAL_URL!, process.env.PORTAL_PASSWORD!);
            
            // 1. Login to SLC Portal
            await loginToSLCPortal_PG(page, loginEmail, process.env.PORTAL_PASSWORD!, accessibilityScanResults);

            // 2. Select new PG Journey 
            await createNewPGApplication(page, accessibilityScanResults);

            // 3. Go through Preamble steps - for existing customer, to modify in future
            await goThroughPreamble(page, accessibilityScanResults);

            // 4. Fill Previous Study information
            await fillPreviousStudy(page, accessibilityScanResults);
            
            // 5. Fill Previous Study information
            await fillYourCourse(page, data, accessibilityScanResults);

            // 6. Confirm Residency details
            await confirmResidency(page, data, accessibilityScanResults);
    
            // 7. Fill Ordinary Residence details
            await fillOrdinaryResidencyDetails(page, data, accessibilityScanResults);

            // 8. Confirm About You details
            await confirmAboutYou(page, accessibilityScanResults);

            // 9. Placeholder for steps in PG Master's Loan
            await confirmPGMastersLoan(page, data, accessibilityScanResults);

            // 10. Fill in Additional Contact details
            await fillAdditionalContact(page, data, accessibilityScanResults);
            
            // 10. Fill in Bank Details details
            await fillBankDetails(page, accessibilityScanResults);

            // 11. Placeholder for steps National Insurance Number
            await confirmNationalInsuranceNumber (page, accessibilityScanResults);

            // 12. Submit Application steps
            await submitApplicationSteps (page, process.env.PORTAL_SUBMIT!, accessibilityScanResults);

            await accessibilityScanResults.finish(testInfo);

            // // 3. Create a new application
            // await createNewApplication(page, data, process.env.PORTAL_SUBMIT!);

            // Uncomment to pause the test in any place and use the Inspector
            // await this.page.pause();

        });
    }
});
