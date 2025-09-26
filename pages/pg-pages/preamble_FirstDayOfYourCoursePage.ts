import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class FirstDayOfYourCoursePage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private firstDayTitle: Locator;
    private firstDayRadioButton: Locator;
    private continueButton: Locator;
    
    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.firstDayTitle = this.page.getByText('When is the first day of your course?');
        this.firstDayRadioButton = this.page.getByRole('radio', { name: 'The first day of my course is between 1 January 2027 and 31 July 2027' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    }

    @step("Confirm first date of course")
    async confirmFirstDayOfCourse(){
        await expect(this.firstDayTitle).toBeVisible({ timeout: 20000 });
         if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "Preamble - Confirm first date of course");
        await this.firstDayRadioButton.click();
        await this.continueButton.click();
    }
}