import {
  CDV_NA_ACTION,
  CV_NA_ACTION,
  SV_NA_ACTION,
} from "../../QUESTION/QUESTION WITH NA_CTION/NA_ACTION.js";
import {
  R_QUESTION_CV,
  R_QUESTION_CDV,
  R_QUESTION_SV,
} from "../../QUESTION/QUESTION_REQUIRED/R_QUESTION";
import {session_key, Env, Vehicle_Type} from "../INPUT"

//INPUT HERE
const TestCase = "Validate";

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
    cy.Visit_Form(session_key, Env).as("Link_Form");
    cy.wait(2000)
  });

  it(`Validate Link`, () => {
    cy.url().should("include", `/${session_key}/result/forms`);
  });

  it(`Choose Vehicle Type ${Vehicle_Type}`, () => {
    cy.chooseVehicleType(Vehicle_Type)
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

    cy.CheckValidateCss(
      NA_QUESTION,
      ["have.css", "border-color", "rgba(0, 0, 0, 0)"],
      "NA ACTION NOT VALIDATE"
    );
    //CSS VALIDATE NA QUESTION

    cy.CheckValidateCss(
      R_QUESTION,
      ["have.css", "border-color", "rgb(255, 77, 79)"],
      "HAVE_VALIDATE"
    );
    //CHECK VALIDATION CSS WITH R QUESTION
  });
});
