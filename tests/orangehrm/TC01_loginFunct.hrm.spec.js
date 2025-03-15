const { test, expect } = require('@playwright/test');
const {Actions} = require('../../utils/actions');
const {LoginHrmPage} = require('../../pages/pagesOrangehrm/login.hrm.page');

let action
let hrmLogin, hrmUsername, hrmPwd

test.describe("HRM TESTS @LOGIN",() => {
    test.beforeEach(async({page})=>{
        action = new Actions(page)
        hrmLogin = new LoginHrmPage(page)
        hrmUsername = process.env.USERNAME_D
        hrmPwd = process.env.PWD_D

        await test.step("Login", async () => {
            await action.navigateTo(process.env.WEBURL_HRM);
            await page.waitForLoadState("domcontentloaded")
        });
    });

    test('TC-ID-0001 = Login with valid credentials (hrm)', async ({ page }) => {
        await test.step("User login with valid credentials", async()=> {
            await action.verifyElementTextContains(hrmLogin.headerLoginHrm, "Login");
            await action.verifyElementTextContains(hrmLogin.lblUsername, "Username");
            await action.setElementText(hrmLogin.inputUsrname, "Admin");
            await action.verifyElementTextContains(hrmLogin.lblPassword, "Password");
            await action.setElementText(hrmLogin.inputPassword, "admin123");
            await action.clickOnElement(hrmLogin.btnLoginHrm);
            await page.waitForLoadState("domcontentloaded")
            await action.verifyElementTextContains(hrmLogin.headerDashboard, "Dashboard")
            console.log("*** LOG: User login successfully ***");
        })
    });

    test('TC-ID-0002 = Login with invalid credentials (hrm)', async ({ page }) => {
        await test.step("Unable to login with invalid credentials", async()=> {
            await action.verifyElementTextContains(hrmLogin.headerLoginHrm, "Login");
            await action.verifyElementTextContains(hrmLogin.lblUsername, "Username");
            await action.setElementText(hrmLogin.inputUsrname, "invalidusername23@gmail.com");
            await action.verifyElementTextContains(hrmLogin.lblPassword, "Password");
            await action.setElementText(hrmLogin.inputPassword, "!nv@lidpassword");
            await action.clickOnElement(hrmLogin.btnLoginHrm);
            console.log("*** LOG: Checking credentials error message ***");
            await action.verifyElementTextContains(hrmLogin.invalidErrorMsg, "Invalid credentials");
        })
    });

    test('TC-ID-0003 = Verify user login valid details ', async ({ page }) => {
        await test.step("Login Scenario", async()=> {
            //await action.navigateTo(process.env.WEBURL_HRM);
            await page.waitForLoadState("domcontentloaded")
            await hrmLogin.loginScenarioHrm(hrmUsername, hrmPwd)
        })
    });

});
