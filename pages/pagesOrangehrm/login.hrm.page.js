const { Actions } = require("../../utils/actions");
let action

export class LoginHrmPage {
    constructor(page) {
        this.page = page;
        action = new Actions(this.page);

        //login page
        this.logoCompany = this.page.getByRole('img', { name: 'company-branding' })
        this.headerLoginHrm = this.page.getByRole('heading', { name: 'Login' })
        this.lblUsername = this.page.locator("xpath=//label[contains(.,'Username')]")
        this.inputUsrname = this.page.locator("xpath=//input[@name='username']")
        this.lblPassword = this.page.getByText('Password', { exact: true })
        this.inputPassword = this.page.getByPlaceholder('Password')
        this.btnLoginHrm = this.page.getByRole('button', { name: 'Login' })
        this.headerDashboard = this.page.getByRole('heading', { name: 'Dashboard' })
        this.invalidErrorMsg = this.page.getByText('Invalid credentials')
    }

    async loginScenarioHrm(hrmUsername,hrmPassword){
        await action.verifyElementVisible(this.logoCompany);
        await action.verifyElementTextContains(this.headerLoginHrm, "Login")
        await action.verifyElementTextContains(this.lblUsername, "Username")
        await action.setElementText(this.inputUsrname,hrmUsername)
        await action.verifyElementTextContains(this.lblPassword, "Password")
        await action.setElementText(this.inputPassword,hrmPassword)
        await action.clickOnElement(this.btnLoginHrm)
        await this.page.waitForLoadState("domcontentloaded")
        await action.verifyElementTextContains(this.headerDashboard, "Dashboard")
    }


}