import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class WhatNeedToBeCompletePage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private applyTitle: Locator;
    private applyButton: Locator;
    // private continueButton: Locator;
    // private applicationTitle: Locator;
    
    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.applyTitle = this.page.getByRole('heading', { name: 'What you\'ll need to complete this application for student finance' });
        this.applyButton = this.page.getByRole('button', { name: 'Apply' });
        // this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        // this.applicationTitle = this.page.getByRole('heading', { name: 'Your application for student' });

    }

    @step("Confirm to apply")
    async confirmToApply(){
        await expect(this.applyTitle).toBeVisible({ timeout: 20000 });
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Preamble - Confirm to apply");
        await this.applyButton.click();
        // await expect(this.applicationTitle).toBeVisible({ timeout: 20000 });
    }
}