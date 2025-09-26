import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class CourseNamePage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private courseTitle: Locator;
    private courseNameInput: Locator;
    private courseNameValue: Locator;
    private saveAndContinueButton: Locator;
  
    
    constructor(page: Page, data: any, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.courseTitle = this.page.getByRole('heading', { name: 'What\'s the name of your course?' });
        this.courseNameInput = this.page.getByRole('textbox', { name: 'Course name' });
        this.courseNameValue = this.page.getByRole('option', { name: data.courseNameOnList });
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
        
    }

    @step("Confirm Course Name")
    async confirmCourseName(data: any){
        await expect(this.courseTitle).toBeVisible({ timeout: 20000 });
        await this.courseNameInput.fill(data.courseName);
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "YourCourse - Confirm Course Name");
        await this.courseNameValue.click();
        await this.saveAndContinueButton.click();
    }
}