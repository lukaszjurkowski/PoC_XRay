import { Page, Locator, expect } from '@playwright/test';
import { step } from '../../stepHandler';
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';


export class WhenDidYouLiveAtGivenAddressPage {
    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private previousAddressPeriodTitle: Locator;
    private dateDayInput: Locator;
    private dateMonthInput: Locator;
    private dateYearInput: Locator;
    private numOfFields: number;
   
    private saveAndContinueButton: Locator;
    private titleName: string;

    constructor(page: Page, data:any, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.titleName = 'When did you live at ';
        this.titleName = this.titleName.concat(data.addressTitleOrdinaryResidency.toString());
        this.previousAddressPeriodTitle = this.page.getByRole('heading', { name:  this.titleName});

        // this.startDateDayInput = this.page.getByRole('textbox', {name: 'date-input-day'});
        // Two same names, id dynamically changed. 
        this.dateDayInput = this.page.getByLabel('Day');
        this.dateMonthInput = this.page.getByLabel('Month');
        this.dateYearInput = this.page.getByLabel('Year');


        // this.addressDropdown = this.page.getByText('Address'); //or 'Select an address'
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
    }

    @step('Confirm when did you live at given address ')
    async confirmWhenDidYouLiveThere(data){
        await expect(this.previousAddressPeriodTitle).toBeVisible({ timeout: 20000 });

        this.numOfFields = await this.dateDayInput.count();
        // console.log('Number of dateDayInput elements = '+ this.numOfFields);

        //filling in start dates
        await this.dateDayInput.nth(0).fill(data.startDayOrdinaryResidency);
        await this.dateMonthInput.nth(0).fill(data.startMonthOrdinaryResidency);
        await this.dateYearInput.nth(0).fill(data.startYearOrdinaryResidency);
        //fillinf in end dates
        await this.dateDayInput.nth(1).fill(data.endDayOrdinaryResidency);
        await this.dateMonthInput.nth(1).fill(data.endMonthOrdinaryResidency);
        await this.dateYearInput.nth(1).fill(data.endYearOrdinaryResidency);
        if (this.accessibilityScanResults)
        await this.accessibilityScanResults.runScan(this.page, "OrdinaryResidency - Confirm when did you live at given address");
        await this.saveAndContinueButton.click();
    }
}