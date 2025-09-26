import { Page } from '@playwright/test';
import { RegistrationAccountCreated } from '../../pages/shared-pages/registration/registration_AccountCreated';
import { RegistrationCheckDetails } from '../../pages/shared-pages/registration/registration_CheckDetailsPage';
import { RegistrationContactAddress } from '../../pages/shared-pages/registration/registration_ContactAddressPage';
import { RegistrationContactDetails } from '../../pages/shared-pages/registration/registration_ContactDetailsPage';
import { RegistrationPageHaveYouCreatedAccount } from '../../pages/shared-pages/registration/registration_HaveYouEverCreatedAccountPage';
import { RegistrationPage } from '../../pages/shared-pages/registration/registration_Page';
import { RegistrationPasswordCreationPage } from '../../pages/shared-pages/registration/registration_PasswordCreationPage';
import { RegistrationTermsOfUse } from '../../pages/shared-pages/registration/registration_TermsOfUse';
import { RegistrationPersonalDetails } from '../../pages/shared-pages/registration/registration_PersonalDetailsPage';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';


export async function registerAccount(page: Page, data: any, url: string, password: string, accessibilityScanResults?: AccessibilityTestCase) {
    const registrationAccountCreated = new RegistrationAccountCreated(page, accessibilityScanResults);    
    const registrationCheckDetails = new RegistrationCheckDetails(page, accessibilityScanResults);
    const registrationContactDetails = new RegistrationContactDetails(page, accessibilityScanResults);    
    const registrationContactAddress = new RegistrationContactAddress(page, accessibilityScanResults);    
    const registrationPageHaveYouCreatedAccount = new RegistrationPageHaveYouCreatedAccount(page, accessibilityScanResults);    
    const registrationPage = new RegistrationPage(page, accessibilityScanResults);    
    const registrationPasswordCreationPage = new RegistrationPasswordCreationPage(page, accessibilityScanResults);
    const registrationTermsOfUse = new RegistrationTermsOfUse(page, accessibilityScanResults);
    const registrationPersonalDetails = new RegistrationPersonalDetails(page, accessibilityScanResults);

    await registrationPage.registertoSLC(url);
    await registrationPageHaveYouCreatedAccount.ConfirmHaveYouAccount();
    await registrationPersonalDetails.providePersonalDetails(data);
    await registrationContactAddress.provideContactAddress(data);
    const loginEmail = await registrationContactDetails.provideContactDetails();
    await registrationCheckDetails.checkRegistrationDetails();
    await registrationPasswordCreationPage.createPassword(password);
    await registrationTermsOfUse.confirmTermsOfUse()
    await registrationAccountCreated.confirmAccountCreation();

    return loginEmail;
 
}