import { _android, test } from '@playwright/test';
import dotenv from 'dotenv';
import testData from "../../test_data/slc_test_data.json";
import { loginToSLCPortal_PG } from '../../actions/lle-flow/loginToSLCPortal_PG';
import { createNewPGApplication } from '../../actions/pg-flow/createNewPGApplication';
import { goThroughPreamble } from '../../actions/pg-flow/goThroughPreamble';
import { fillPreviousStudy } from '../../actions/pg-flow/fillPreviousStudy';
import { fillYourCourse } from '../../actions/pg-flow/fillYourCourse';
import { confirmResidency } from '../../actions/pg-flow/confirmResidency';
import { fillOrdinaryResidencyDetails } from '../../actions/pg-flow/fillOrdinaryResidencyDetails';
import { confirmAboutYou } from '../../actions/pg-flow/confirmAboutYou';
import { confirmPGMastersLoan } from '../../actions/pg-flow/confirmPGMastersLoan';
import { fillAdditionalContact } from '../../actions/pg-flow/fillAdditionalContact';
import { fillBankDetails } from '../../actions/pg-flow/fillBankDetails';
import { confirmNationalInsuranceNumber } from '../../actions/pg-flow/confirmNationalInsuranceNumber';
import { submitApplicationSteps } from '../../actions/pg-flow/submitApplicationSteps';
import { registerAccount } from '../../actions/registration/registerAccount';

dotenv.config();

// Tests run one by one
test.describe.serial('SLC - PG funding', () => {
    for (const data of testData.filter((dataSet)=> dataSet.name === 'SLC PG funding flow')) {
        test(`Course funding: ${data.name}`, async ({page}) => {
           
            // 0. Register to SLC
            const loginEmail = await registerAccount(page, data, process.env.PORTAL_URL!, process.env.PORTAL_PASSWORD!);
            // 1. Login to SLC Portal
            await loginToSLCPortal_PG(page, loginEmail, process.env.PORTAL_PASSWORD!);
            // 2. Select new PG Journey 
            await createNewPGApplication(page);
            // 3. Go through Preamble steps - for existing customer, to modify in future
            await goThroughPreamble(page);
            // 4. Fill Previous Study information
            await fillPreviousStudy(page);          
            // 5. Fill Previous Study information
            await fillYourCourse(page, data);
            // 6. Confirm Residency details
            await confirmResidency(page, data);  
            // 7. Fill Ordinary Residence details
            await fillOrdinaryResidencyDetails(page, data);
            // 8. Confirm About You details
            await confirmAboutYou(page);
            // 9. Placeholder for steps in PG Master's Loan
            await confirmPGMastersLoan(page, data);
            // 10. Fill in Additional Contact details
            await fillAdditionalContact(page, data);            
            // 10. Fill in Bank Details details
            await fillBankDetails(page);
            // 11. Placeholder for steps National Insurance Number
            await confirmNationalInsuranceNumber (page);
            // 12. Submit Application steps
            await submitApplicationSteps (page, process.env.PORTAL_SUBMIT!);
          
            // Uncomment to pause the test in any place and use the Inspector
            // await this.page.pause();

        });
    }
});
