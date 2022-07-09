import {CDV_NA_ACTION, CV_NA_ACTION, SV_NA_ACTION} from "../QUESTION/QUESTION WITH NA_CTION/NA_ACTION.js";
import {R_QUESTION_CV, R_QUESTION_CDV, R_QUESTION_SV} from "../QUESTION/QUESTION_REQUIRED/R_QUESTION";

//INPUT HERE
const session_key = "TVC-Z6XRMH9JFK";
const Vehicle_Type = "CDV"; // CV, SV, CDV
const TestCase = "Validate";
const Env = "PROD"; // (PROD || DEV)

// ------------------DONT MODIFIED BELOW-------------------------
describe(`TEST_FORM WITH ${Vehicle_Type} + ${TestCase}`, () => {
  var NA_QUESTION =
    Vehicle_Type == "CV"
      ? CV_NA_ACTION
      : Vehicle_Type == "CDV"
      ? CDV_NA_ACTION
      : SV_NA_ACTION;

  var R_QUESTION =
    Vehicle_Type == "CV"
      ? R_QUESTION_CV
      : Vehicle_Type == "CDV"
      ? R_QUESTION_CDV
      : R_QUESTION_SV;

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

  it(`Submit Before choose Option - Validate Question CSS`, () => {
    cy.get(".ant-form-item-control-input-content > .ant-btn")
      .as("SUBMIT_BUTTON")
      .click(); // click Submit to show validate and noti

    cy.get(".ant-notification-notice")
      .should("be.visible")
      .as("HAVE_NOTIFICATION"); //CHECK NOTIFICATION
    cy.log(
      `${
        Vehicle_Type == "CV"
          ? "QUESTION_CV"
          : Vehicle_Type == "CDV"
          ? "QUESTION_CDV"
          : "QUESTION_SV"
      }`
    ); //SHOW QUESTION

    for (let Title in NA_QUESTION) {
      for (let Option in NA_QUESTION[Title]) {
        cy.get(`#${Title}_${Option} > label`)
          .should("have.css", "border-color", "rgba(0, 0, 0, 0)")
          .as("NA ACTION NOT VALIDATE");
      }
    } //CSS VALIDATE NA QUESTION

    for (let Title in R_QUESTION) {
      for (let Option in R_QUESTION[Title]) {
        cy.get(`#${Title}_${Option} > label`)
          .should("have.css", "border-color", "rgb(255, 77, 79)")
          .as("HAVE_VALIDATE");
      }
    } //CHECK VALIDATION CSS WITH R QUESTION



  });
});
