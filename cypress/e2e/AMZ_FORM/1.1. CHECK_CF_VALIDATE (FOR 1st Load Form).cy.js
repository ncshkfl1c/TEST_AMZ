import {
  CF_R_QUESTION,
  CF_NA_ACTION,
} from "../../QUESTION/CUSTOM_FORM/CUSTOM_FORM";
//INPUT HERE
const session_key = "TVC-Z6XRMH9JFK";
const Vehicle_Type = "CV"; // CV, SV, CDV
const TestCase = "Validate";
const Env = "PROD"; // (PROD || DEV)

// ------------------DONT MODIFIED BELOW-------------------------
describe(`TEST_FORM WITH ${Vehicle_Type} + ${TestCase}`, () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.Visit_Form(session_key, Env).as("Link_Form");
  });

  it(`Validate Link`, () => {
    cy.url().should("include", `/${session_key}/result/forms`);
  });

  it(`Choose Vehicle Type ${Vehicle_Type}`, () => {
    cy.chooseVehicleType(Vehicle_Type)
      .click()
      .should("have.css", "background-color", "rgb(39, 208, 137)");
  });

  it(`Check Validate Question CSS`, () => {

    cy.get(".ant-form-item-control-input-content > .ant-btn")
      .as("SUBMIT_BUTTON")
      .click(); // click Submit to show validate and noti

    cy.get(".ant-notification-notice")
      .should("be.visible")
      .as("HAVE_NOTIFICATION"); //CHECK NOTIFICATION


    cy.CheckValidateCss(CF_NA_ACTION,["have.css","border-color","rgba(0, 0, 0, 0)"],"NA ACTION NOT VALIDATE")
 //CSS VALIDATE NA QUESTION

    cy.CheckValidateCss(CF_R_QUESTION,["have.css", "border-color", "rgb(255, 77, 79)"],"HAVE_VALIDATE");
//CHECK VALIDATION CSS WITH R QUESTION
  });
});
