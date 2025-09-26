import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class NameOfUniversityOrCollegePage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private universityDetailsPage: Locator;
    private expectedUnivName: Locator;
    private univNameInput: Locator;
    private uniValue: Locator;
    private expectedCourseNameInSummary: Locator;
    private saveAndContinueButton: Locator;


    
    constructor(page: Page, data: any, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.universityDetailsPage = this.page.getByText('What\'s the name of your university or college?');
        this.univNameInput = this.page.getByRole('textbox', { name: 'University or college name' });
        // this.expectedUnivName = this.page.getByText(data.expectedDisplayedUniversityName);
        this.uniValue = this.page.getByRole('option', { name: data.universityNameOnList });
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });

    }

    @step("Confirm Name Of Univeristy or College")
    async confirmUniversityName(data: any){
        await expect(this.universityDetailsPage).toBeVisible({ timeout: 20000 });
        await this.univNameInput.fill(data.universityName);
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "YourCourse - Confirm Name Of Univeristy or College");
        await this.uniValue.click();
        await this.saveAndContinueButton.click();
    }
}