import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';

export class YourCoursePage {
    private page: Page;
    private continueButton: Locator;
    private saveAndContinueButton: Locator;
    private applicationTitle: Locator;
    private noRadioButton: Locator;
    private checkDetailsTitle: Locator;
    private confirmButton: Locator;
    private courseModulesTitle: Locator;
    private studyingTitle: Locator;
    private courseRadioButton: Locator;
    private fullOrPartTitle: Locator;
    private fullTimeRadioButton: Locator;
    private univNameTitle: Locator;
    private univNameInput: Locator;
    private uniValue: Locator;
    private courseTitle: Locator;
    private courseNameInput: Locator;
    private courseNameValue: Locator;
    private plannedCreditsTitle: Locator;
    private yesRadioButton: Locator;
    private repeatTitle: Locator;
    private creditsSummaryTitle: Locator;
    private expectedCourseName: Locator;
    private expectedCredits: Locator;
    private yourTimeTitle: Locator;
    private univCheckbox: Locator;
    private livingArrangTitle: Locator;
    private parentsCheckbox: Locator;
    private expectedCourse: Locator;
    private expectedFullTime: Locator;
    private expectedUnivName: Locator;
    private expectedCourseNameInSummary: Locator;
    private expectedYesValue: Locator;
    private expectedNoValue: Locator;
    private expectedProvidedValue: Locator;
    private expectedProvided2ndValue: Locator;
    private courseSummaryTitle: Locator;
    private expectedYearsValue: Locator;
    private expectedDiploma: Locator;
 

    constructor(page: Page, data: any) {
        this.page = page;
        this.courseModulesTitle = this.page.getByRole('heading', { name: 'Course or modules you plan to' });
        this.studyingTitle = this.page.getByRole('heading', { name: 'Studying a course or module', exact: true });
        this.courseRadioButton = this.page.getByRole('radio', { name: 'I will be studying a course' });
        this.fullOrPartTitle = this.page.getByText('Will you be studying full');
        this.fullTimeRadioButton = this.page.getByRole('radio', { name: 'Full time' });
        this.univNameTitle = this.page.getByRole('heading', { name: 'What\'s the name of your' });
        this.univNameInput = this.page.getByRole('textbox', { name: 'University or college name' });
        this.uniValue = this.page.getByRole('option', { name: data.universityNameOnList });
        this.courseTitle = this.page.getByRole('heading', { name: 'What\'s the name of your' });
        this.courseNameInput = this.page.getByRole('textbox', { name: 'Course name' });
        this.courseNameValue = this.page.getByRole('option', { name: data.courseNameOnList });
        this.plannedCreditsTitle = this.page.getByRole('heading', { name: 'Planned credits for this' });
        this.yesRadioButton = this.page.getByRole('radio', { name: 'Yes' });
        this.repeatTitle = this.page.getByRole('heading', { name: 'Repeat study' });
        this.creditsSummaryTitle = this.page.getByRole('heading', { name: 'Your credits summary' });
        //this.expectedCourseName = this.page.getByText(data.expectedDisplayedCourseName);
        

        this.expectedCourseName = this.page.getByText(data.courseNameOnList);
        this.expectedCredits = this.page.getByText('30', { exact: true });
        this.yourTimeTitle = this.page.getByRole('heading', { name: 'Your time while studying simple' });
        this.univCheckbox = this.page.getByRole('checkbox', { name: 'At university or college' });
        this.livingArrangTitle = this.page.getByRole('heading', { name: 'Your living arrangements for' });
        this.parentsCheckbox = this.page.getByRole('checkbox', { name: 'With parents' });
        this.expectedCourse = this.page.getByText('Course', { exact: true });
        this.expectedFullTime = this.page.getByText('Full time', { exact: true });
        this.expectedUnivName = this.page.getByText(data.expectedDisplayedUniversityName);
        this.expectedCourseNameInSummary = this.page.getByText(data.expectedDisplayedCourseNameInSummary);
        this.expectedYesValue = this.page.getByText('Yes');
        this.expectedNoValue = this.page.getByText('No');
        this.expectedProvidedValue = this.page.getByText('Provided').first();
        this.expectedProvided2ndValue = this.page.getByText('Provided').nth(1);
        this.courseSummaryTitle = this.page.getByText('Your course or module summary');
        this.expectedYearsValue = this.page.getByText('years');
        this.expectedDiploma = this.page.getByText('Bachelor Degree');
        this.checkDetailsTitle = this.page.getByText('Check your details');
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.confirmButton = this.page.locator("//button[contains(text(), 'Confirm')]")
        this.noRadioButton = this.page.getByRole('radio', { name: 'No' });
        this.applicationTitle = this.page.getByRole('heading', { name: 'Your application for student' });
    }

    @step('Fill Your Course step')
    async fillYourCourseSteps(data: any){
        await expect(this.courseModulesTitle).toBeVisible({ timeout: 20000 }); 
        await this.continueButton.click();
        
        await expect(this.studyingTitle).toBeVisible({ timeout: 20000 });
        await this.courseRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.fullOrPartTitle).toBeVisible({ timeout: 20000 });
        await this.fullTimeRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.univNameTitle).toBeVisible({ timeout: 20000 });
        await this.univNameInput.fill(data.universityName);
        await this.uniValue.click();
        await this.saveAndContinueButton.click();
        
        await expect(this.courseTitle).toBeVisible({ timeout: 20000 });
        await this.courseNameInput.fill(data.courseName);
        await this.courseNameValue.click();
        await this.saveAndContinueButton.click();

        await expect(this.plannedCreditsTitle).toBeVisible({ timeout: 20000 });
        await this.yesRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.repeatTitle).toBeVisible({ timeout: 20000 });
        await this.noRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.creditsSummaryTitle).toBeVisible({ timeout: 20000 }); 
        
        //await this.page.pause();
        await this.page.waitForTimeout(2000);
        const courseTitle = this.page.locator("//dd[contains(text(), 'simple course - full time')]");
        const courseTitleText = await courseTitle.textContent();

        expect(courseTitleText).toBe(data.courseNameOnList);
        
       // await expect(this.expectedCourseName).toBeVisible({ timeout: 20000 });
        await expect(this.expectedCredits).toBeVisible({ timeout: 20000 });
        await this.saveAndContinueButton.click();

        await expect(this.yourTimeTitle).toBeVisible({ timeout: 20000 });
        await this.univCheckbox.click();
        await this.saveAndContinueButton.click();

        await expect(this.livingArrangTitle).toBeVisible({ timeout: 20000 });
        await this.parentsCheckbox.click();
        await this.saveAndContinueButton.click();

        await expect(this.checkDetailsTitle).toBeVisible({ timeout: 20000 }); 
        await expect(this.expectedCourse).toBeVisible({ timeout: 20000 });
        await expect(this.expectedFullTime).toBeVisible({ timeout: 20000 });
        await expect(this.expectedUnivName).toBeVisible({ timeout: 20000 });
        await expect(this.expectedCourseNameInSummary).toBeVisible({ timeout: 20000 });
        await expect(this.expectedYesValue).toBeVisible({ timeout: 20000 });
        await expect(this.expectedNoValue).toBeVisible({ timeout: 20000 });
        await expect(this.expectedProvidedValue).toBeVisible({ timeout: 20000 });
        await expect(this.expectedProvided2ndValue).toBeVisible({ timeout: 20000 });
        await this.confirmButton.click();

        await expect(this.courseSummaryTitle).toBeVisible({ timeout: 20000 });
        await expect(this.expectedYearsValue).toBeVisible({ timeout: 20000 });
        await expect(this.expectedDiploma).toBeVisible({ timeout: 20000 });
        await this.confirmButton.click();    
                
        await expect(this.applicationTitle).toBeVisible({ timeout: 20000 }); 
    }
}