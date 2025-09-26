import { Page } from '@playwright/test';
import { CheckYourAddressHistoryPage } from '../../pages/pg-pages/ordinaryResidency_CheckYourAddressHistoryPage';
import { CheckYourPreviousAddressPage } from '../../pages/pg-pages/ordinaryResidency_CheckYourPreviousAddressPage';
import { PlaceOfResidenceInGivenTimePeriodPage } from '../../pages/pg-pages/ordinaryResidency_PlaceOfResidenceInGivenTimePeriodPage';
import { PreviousAddressesPage } from '../../pages/pg-pages/ordinaryResidency_PreviousAddressesPage';
import { TellAboutPreviousAddressesPage } from '../../pages/pg-pages/ordinaryResidency_TellAboutPreviousAddressesPage';
import { WhatWasTheReasonYouLiveAtGivenAddressPage } from '../../pages/pg-pages/ordinaryResidency_WhatWasTheReasonYouLiveAtGivenAddressPage';
import { WhenDidYouLiveAtGivenAddressPage } from '../../pages/pg-pages/ordinaryResidency_WhenDidYouLiveAtGivenAddressPage';
import { YourPreviousAddressessSummaryPage } from '../../pages/pg-pages/ordinaryResidency_YourPreviousAddressessSummaryPage';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';


export async function fillOrdinaryResidencyDetails(page: Page, data: any, accessibilityScanResults?: AccessibilityTestCase) {
    const checkYourAddressHistoryPage = new CheckYourAddressHistoryPage(page, accessibilityScanResults);    
    const checkYourPreviousAddressPage = new CheckYourPreviousAddressPage(page, data, accessibilityScanResults);
    const placeOfResidenceInGivenTimePeriodPage = new PlaceOfResidenceInGivenTimePeriodPage(page, accessibilityScanResults);
    const previousAddressesPage = new PreviousAddressesPage(page, data, accessibilityScanResults);    
    const tellAboutPreviousAddressesPage = new TellAboutPreviousAddressesPage(page, data, accessibilityScanResults);
    const whatWasTheReasonYouLiveAtGivenAddressPage = new WhatWasTheReasonYouLiveAtGivenAddressPage(page, data, accessibilityScanResults);
    const whenDidYouLiveAtGivenAddressPage = new WhenDidYouLiveAtGivenAddressPage(page, data, accessibilityScanResults);    
    const yourPreviousAddressessSummaryPage = new YourPreviousAddressessSummaryPage(page, data, accessibilityScanResults);


    await placeOfResidenceInGivenTimePeriodPage.fillPlaceOfResidencyOrdinary();
    await previousAddressesPage.fillPreviousPostcode(data);
    await tellAboutPreviousAddressesPage.fillPreviousAddresses(data);
    await whenDidYouLiveAtGivenAddressPage.confirmWhenDidYouLiveThere(data);
    await whatWasTheReasonYouLiveAtGivenAddressPage.fillPreviousAddressesReason(data);
    await checkYourPreviousAddressPage.checkYourAddressSummaryPage();
    await yourPreviousAddressessSummaryPage.checkYourAddressSummaryPage();
    await checkYourAddressHistoryPage.checkYourAddressHistoryPage();



}