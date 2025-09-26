import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';


export class WhatWasTheReasonYouLiveAtGivenAddressPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private previousAddressReasonTitle: Locator;
    private reasonInput: Locator;
    private saveAndContinueButton: Locator;
    private titleName: string;

    constructor(page: Page, data:any, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.titleName = 'What was the reason you lived at ';
        this.titleName = this.titleName.concat(data.addressTitleOrdinaryResidency.toString());
        this.previousAddressReasonTitle = this.page.getByRole('heading', { name:  this.titleName});
        this.reasonInput = this.page.getByRole('textbox', {name: 'text-area'});
        this.reasonInput = this.page.locator('textarea[name="text-area"]');

        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
    }

    @step('Fill reason for living in previous address ')
    async fillPreviousAddressesReason(data){
        await expect(this.previousAddressReasonTitle).toBeVisible({ timeout: 20000 });
        await this.reasonInput.fill(data.reasonToLiveOrdinaryResidency);
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "OrdinaryResidency - Fill reason for living in previous address");
        await this.saveAndContinueButton.click();
    }
}