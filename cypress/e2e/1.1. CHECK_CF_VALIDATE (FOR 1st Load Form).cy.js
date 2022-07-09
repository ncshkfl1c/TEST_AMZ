import {CF_R_QUESTION, CR_NA_ACTION} from "../QUESTION/CUSTOM_FORM/CUSTOM_FORM"
//INPUT HERE
const session_key = "TVC-Z6XRMH9JFK";
const Vehicle_Type = "CV"; // CV, SV, CDV
const TestCase = "Validate";
const Env = "PROD"; // (PROD || DEV)

// ------------------DONT MODIFIED BELOW-------------------------
describe(`TEST_FORM WITH ${Vehicle_Type} + ${TestCase}`, () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.visit(
      `https://capture${
        Env == "PROD" ? "" : "-dev"
      }.paveapi.com/${session_key}/result/forms`
    ).as("Link_Form");
  });

  afterEach(() => {
    cy.wait(2000);
  });

  it(`Validate Link`, () => {
    cy.url().should("include", `/${session_key}/result/forms`);
  });

  it(`Choose Vehicle Type ${Vehicle_Type}`, () => {
    cy.get(
      `#VEHICLE_TYPE > :nth-child(${
        Vehicle_Type == "CV" ? 1 : Vehicle_Type == "CDV" ? 2 : 3
      })`
    )
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
    
    for (let Title in CR_NA_ACTION) {
      for (let Option in CR_NA_ACTION[Title]) {
        cy.get(`#${Title}_${Option} > label`)
          .should("have.css", "border-color", "rgba(0, 0, 0, 0)")
          .as("NA ACTION NOT VALIDATE");
      }
    } //CSS VALIDATE NA QUESTION

    for (let Title in CF_R_QUESTION) {
      for (let Option in CF_R_QUESTION[Title]) {
        cy.get(`#${Title}_${Option} > label`)
          .should("have.css", "border-color", "rgb(255, 77, 79)")
          .as("HAVE_VALIDATE");
      }
    } //CHECK VALIDATION CSS WITH R QUESTION



  });
});
