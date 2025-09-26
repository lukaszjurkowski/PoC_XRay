import { _android, test } from '@playwright/test';
import dotenv from 'dotenv';
//import testData from "../test_data/slc_course_funding.json";
import testData from "../test_data/slc_test_data.json";
//import { loginToSLCPortal } from '../actions/loginToSLCPortal';
import { loginToSLCPortal_PG } from '../actions/loginToSLCPortal_PG';
import { cleanPreviousApplication } from '../actions/cleanPreviousApplication';
import { createNewApplication } from '../actions/createNewApplication';
import { registerAccount } from '../actions/registration/registerAccount';

dotenv.config();

// Tests run one by one
test.describe.serial('SLC - course funding', () => {
    
    for (const data of testData.filter((dataSet) => dataSet.name === 'SLC LLE course funding flow')) {
        test(`Course funding: ${data.name}`, async ({page}) => {

            
            // 0. Register to SLC
            const loginEmail = await registerAccount(page, data, process.env.PORTAL_URL!, process.env.PORTAL_PASSWORD!);          
            
            // 1. Login to SLC Portal
            //await loginToSLCPortal(page, process.env.PORTAL_URL!, process.env.PORTAL_LOGIN!, process.env.PORTAL_PASSWORD!);
            await loginToSLCPortal_PG(page, loginEmail, process.env.PORTAL_PASSWORD!);
    
            // 2. Cancel the previously created application
            //await cleanPreviousApplication(page);

            // 3. Create a new application
            await createNewApplication(page, data, process.env.PORTAL_SUBMIT!);

            // Uncomment to pause the test in any place and use the Inspector
            // await this.page.pause();

        });
    }
});
