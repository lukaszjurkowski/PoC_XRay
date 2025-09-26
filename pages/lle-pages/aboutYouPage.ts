import { Page, Locator, expect } from '@playwright/test'
import { step } from '../../stepHandler'
import { AccessibilityTestCase } from '../../accessibility/accessibilityHandler';

export class AboutYouPage {

    private page: Page;
    private accessibilityScanResults?: AccessibilityTestCase;
    private saveAndContinueButton: Locator;
    private applicationTitle: Locator;
    private relationStatus: Locator;
    private singleRadioButton: Locator;
    private haveYouTitle: Locator;
    private noIHaventRadioButton: Locator;
    private willYouCareTitle: Locator;
    private noIWillNotHaveCareRadioButton: Locator;
    private adultDependTitle: Locator;
    private noAdultDependRadioButton: Locator;
    private circumTitle: Locator;
    private noCircumRadioButton: Locator;
    private disabilitiesTitle: Locator;
    private noRadioButton: Locator;
    private checkDetailsTitle: Locator;
    private expectedRelationshipStatus: Locator;
    private expectedMarried: Locator;
    private expectedPersonUnder18: Locator;
    private expectedAdultDependency: Locator;
    private expectedCareLeaver: Locator;
    private expectedFinanciallySupport: Locator;
    private expectedRegularContacts: Locator;
    private expectedMainReason: Locator;
    private expectedCircumstances: Locator;
    private expectedDisabilities: Locator;
    private confirmButton: Locator;
    private careExperienceTitle: Locator;
    private weNeedToKnowTitle: Locator;
    private regularContactsTitle: Locator;
    private contactWithParentsTitle: Locator;
    private noneRadioButton: Locator;

    private relationStatusMarriedRadioLabel: Locator;
    private relationStatusLivingWithPartnerRadioLabel: Locator;
    private relationStatusWidowedRadioLabel: Locator;
    private relationStatusDivorcedRadioLabel: Locator;
    private relationStatusSeparatedRadioLabel: Locator;
    private relationStatusSingleRadioLabel: Locator;

    private haveYouYesRadioLabel: Locator;
    private haveYouNoRadioLabel: Locator;

    private willYouCareYesRadioLabel: Locator;
    private willYouCareNoRadioLabel: Locator;

    private adultDependYesRadioLabel: Locator;
    private adultDependNoRadioLabel: Locator;

    constructor(page: Page, accessibilityScanResults?: AccessibilityTestCase) {
        this.page = page;
        this.accessibilityScanResults = accessibilityScanResults;
        this.relationStatus = this.page.getByRole('heading', { name: 'Relationship status', exact: true });
        this.singleRadioButton = this.page.getByRole('radio', { name: 'Single' });
        this.haveYouTitle = this.page.getByText('Have you been, or will you be');
        this.noIHaventRadioButton = this.page.getByRole('radio', { name: 'No, I have not been or will' });
        this.willYouCareTitle = this.page.getByRole('heading', { name: 'Will you have care of a' });
        this.noIWillNotHaveCareRadioButton = this.page.getByRole('radio', { name: 'No, I will not have care of a' });
        this.adultDependTitle = this.page.getByRole('heading', { name: 'Adult dependants' });
        this.noAdultDependRadioButton = this.page.getByRole('radio', { name: 'No, an adult will not depend' });
        this.circumTitle = this.page.getByRole('heading', { name: 'Circumstances', exact: true });
        this.noCircumRadioButton = this.page.getByRole('radio', { name: 'No, these circumstances do' });
        this.disabilitiesTitle = this.page.getByRole('heading', { name: 'Disabilities or conditions that may affect your studies' });
        this.noRadioButton = this.page.getByRole('radio', { name: 'No' });
        this.checkDetailsTitle = this.page.getByText('Check your details');
        this.expectedRelationshipStatus = this.page.getByText('Single');
        this.expectedMarried = this.page.getByText('No, I have not been or will');
        this.expectedPersonUnder18 = this.page.getByText('No, I will not have care of a');
        this.expectedAdultDependency = this.page.getByText('No, an adult will not depend');
        this.expectedCareLeaver = this.page.getByText('No', { exact: true }).first();
        this.expectedFinanciallySupport = this.page.getByText('No', { exact: true }).nth(1);
        this.expectedRegularContacts = this.page.getByText('No', { exact: true }).nth(2);
        this.expectedMainReason = this.page.getByText('None of the above');
        this.expectedCircumstances = this.page.getByText('No, these circumstances do');
        this.expectedDisabilities = this.page.getByText('No', { exact: true }).nth(3);
        this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
        this.careExperienceTitle = this.page.getByRole('heading', { name: 'Care experience' });
        this.weNeedToKnowTitle = this.page.getByRole('heading', { name: 'We need to know if you have' });
        this.regularContactsTitle = this.page.getByText('Do you have regular contact');
        this.contactWithParentsTitle = this.page.getByRole('heading', { name: 'Contact with parents' });
        this.noneRadioButton = this.page.getByRole('radio', { name: 'None of the above' });
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and continue' });
        this.applicationTitle = this.page.getByRole('heading', { name: 'Your application for student' });

        this.relationStatusMarriedRadioLabel = this.page.getByText('Married or civil partnership');
        this.relationStatusLivingWithPartnerRadioLabel = this.page.getByText('Living with partner');
        this.relationStatusWidowedRadioLabel = this.page.getByText('Widowed or');
        this.relationStatusDivorcedRadioLabel = this.page.getByText('Divorced or');
        this.relationStatusSeparatedRadioLabel = this.page.getByText('Separated');
        this.relationStatusSingleRadioLabel = this.page.getByText('Single');

        this.haveYouYesRadioLabel = this.page.getByText('Yes, I');
        this.haveYouNoRadioLabel = this.page.getByText('No, I have not');

        this.willYouCareYesRadioLabel = this.page.getByText('Yes, I');
        this.willYouCareNoRadioLabel = this.page.getByText('No, I will not');

        this.adultDependYesRadioLabel = this.page.getByText('Yes, an adult');
        this.adultDependNoRadioLabel = this.page.getByText('No, an adult');
    }

    @step("Fill about you steps")
    async fillAboutYouSteps(){
        await expect(this.relationStatus).toBeVisible({ timeout: 20000 });

        await expect(this.relationStatusMarriedRadioLabel).toBeVisible({ timeout: 20000 });
        await expect(this.relationStatusLivingWithPartnerRadioLabel).toBeVisible({ timeout: 20000 });
        await expect(this.relationStatusWidowedRadioLabel).toBeVisible({ timeout: 20000 });
        await expect(this.relationStatusDivorcedRadioLabel).toBeVisible({ timeout: 20000 });
        await expect(this.relationStatusSeparatedRadioLabel).toBeVisible({ timeout: 20000 });
        await expect(this.relationStatusSingleRadioLabel).toBeVisible({ timeout: 20000 });

        if (this.accessibilityScanResults)
            await this.accessibilityScanResults.runScan(this.page, "Fill 'About you' steps - 'Relation status'.");
        await this.singleRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.haveYouTitle).toBeVisible({ timeout: 20000 });

        await expect(this.haveYouYesRadioLabel).toBeVisible({ timeout: 20000 });
        await expect(this.haveYouNoRadioLabel).toBeVisible({ timeout: 20000 });

        if (this.accessibilityScanResults)
            await this.accessibilityScanResults.runScan(this.page, "Fill 'About you' steps - 'Have you been, or will you be...'.");
        await this.noIHaventRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.willYouCareTitle).toBeVisible({ timeout: 20000 });

        await expect(this.willYouCareYesRadioLabel).toBeVisible({ timeout: 20000 });
        await expect(this.willYouCareNoRadioLabel).toBeVisible({ timeout: 20000 });

        if (this.accessibilityScanResults)
            await this.accessibilityScanResults.runScan(this.page, "Fill 'About you' steps - 'Will you have care...'.");
        await this.noIWillNotHaveCareRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.adultDependTitle).toBeVisible({ timeout: 20000 });

        await expect(this.adultDependYesRadioLabel).toBeVisible({ timeout: 20000 });
        await expect(this.adultDependNoRadioLabel).toBeVisible({ timeout: 20000 });

        if (this.accessibilityScanResults)
            await this.accessibilityScanResults.runScan(this.page, "Fill 'About you' steps - 'Adult dependants'.");
        await this.noAdultDependRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.careExperienceTitle).toBeVisible({ timeout: 20000 });
        await this.noRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.weNeedToKnowTitle).toBeVisible({ timeout: 20000 });
        await this.noRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.regularContactsTitle).toBeVisible({ timeout: 20000 });
        await this.noRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.contactWithParentsTitle).toBeVisible({ timeout: 20000 });
        await this.noneRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.circumTitle).toBeVisible({ timeout: 20000 });
        await this.noCircumRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.disabilitiesTitle).toBeVisible({ timeout: 20000 });
        await this.noRadioButton.click();
        await this.saveAndContinueButton.click();

        await expect(this.checkDetailsTitle).toBeVisible({ timeout: 20000 }); 
        await expect(this.expectedRelationshipStatus).toBeVisible({ timeout: 20000 });
        await expect(this.expectedMarried).toBeVisible({ timeout: 20000 });
        await expect(this.expectedPersonUnder18).toBeVisible({ timeout: 20000 });
        await expect(this.expectedAdultDependency).toBeVisible({ timeout: 20000 });
        await expect(this.expectedCareLeaver).toBeVisible({ timeout: 20000 });
        await expect(this.expectedFinanciallySupport).toBeVisible({ timeout: 20000 });
        await expect(this.expectedRegularContacts).toBeVisible({ timeout: 20000 });
        await expect(this.expectedMainReason).toBeVisible({ timeout: 20000 });
        await expect(this.expectedCircumstances).toBeVisible({ timeout: 20000 });
        await expect(this.expectedDisabilities).toBeVisible({ timeout: 20000 });
        await this.confirmButton.click();

        await expect(this.applicationTitle).toBeVisible({ timeout: 20000 }); 
    }
}