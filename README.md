
# SLC test automation PoC
This project contains Playwright tests for SLC project.


## Getting started

1. Install prerequisities: node.js and git. Check if Node.js is installed by `node -v`. If not, install LTS version from official website.
[Playwright extension for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) or for your editor of choice might be of use, for example for test debugging. You can also install Playwright using these commands: `npm install -D @playwright/test` and `npx playwright install`.

2. Create the project directory. Run in this directory: `npm init -y`. Clone repository, navigate to created directory and (if applicable) checkout to appriopriate branch.

3. Install dependencies:

   `npm install`

4. Put provided `.env` file into root directory of your local repo. Insert your credentials if necessary.

.env file should look like:

```
PORTAL_URL='https://llestudentloanscompany--llesit.sandbox.my.site.com/studentfinance/s/slc-landingpage'
PORTAL_LOGIN=<your_username>
PORTAL_PASSWORD=<your_login_password>
PORTAL_SUBMIT=<your_submit_password>
```


## Running tests

It is possible to run test suite wholesale:

`npx playwright test`

or just specific files:

`npx playwright test ./tests/slc_course_funding.spec.ts`

Remember to *always* use forward slash in file path, even when running on Windows!

By default test report is launched upon test completion, but it can be accessed even without that with:

`npx playwright show-report`

For additional info refer to [Playwright documentation](https://playwright.dev/docs/intro).


## Notes on contributing

### Accessibility testing

This project uses axe-core, accessible through wrapper in `AccessibilityTestCase` class. In order to conduct axe scan, create an object, invoke `runScan` method when scan should be run, invoke `finish` on the end of test. Results are returned in HTML or JSON form attached to Playwright test report.
