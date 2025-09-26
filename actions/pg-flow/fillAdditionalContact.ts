import { Page } from '@playwright/test';
import { AdditionalContactPage } from '../../pages/pg-pages/additionalContact_AdditionalContactPage';
import { NameOfAdditionalContactPage } from '../../pages/pg-pages/additionalContact_NameOfAdditionalContactPage';
import { RelationshipWithAdditionalContactPage } from '../../pages/pg-pages/additionalContact_RelationshipWithAdditionalContactPage';
import { AddressOfAdditionalContactPage } from '../../pages/pg-pages/additionalContact_AddressOfAdditionalContactPage';
import { WhatIsTheAddressOfAdditionalContactPage } from '../../pages/pg-pages/additionalContact_WhatIsTheAddressOfAdditionalContactPage';
import { CheckAnswersPage } from '../../pages/pg-pages/additionalContact_CheckAnswersPage';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';
import { YourApplicationForStudentPage } from '../../pages/pg-pages/yourApplicationForStudentPage';


export async function fillAdditionalContact(page: Page, data: any, accessibilityScanResults?: AccessibilityTestCase) {
    const additionalContactPage = new AdditionalContactPage(page, data, accessibilityScanResults);    
    const nameOfAdditionalContactPage = new NameOfAdditionalContactPage(page, data,  accessibilityScanResults);
    const relationshipWithAdditionalContactPage = new RelationshipWithAdditionalContactPage(page, data, accessibilityScanResults);    
    const addressOfAdditionalContactPage = new AddressOfAdditionalContactPage(page, data, accessibilityScanResults);    
    const whatIsTheAddressOfAdditionalContactPage = new WhatIsTheAddressOfAdditionalContactPage(page, data, accessibilityScanResults);
    const checkAnswersPage = new CheckAnswersPage(page, data, accessibilityScanResults);   
    const yourApplicationForStudentPage = new YourApplicationForStudentPage(page, accessibilityScanResults);
     

    await yourApplicationForStudentPage.goToAdditionalContactSection();
    await additionalContactPage.verifyAdditionalContactStep(data);
    await nameOfAdditionalContactPage.fillNameOfAdditionalContact(data);
    await relationshipWithAdditionalContactPage.chooseRelationshipWithAdditionalContact(data);
    await addressOfAdditionalContactPage.findAddressOfAdditionalContact(data);
    await whatIsTheAddressOfAdditionalContactPage.chooseAddressOfAdditionalContact(data);
    await checkAnswersPage.confirmCheckAnswersStep(data);
 
}