import {
  R_QUESTION_CV,
  R_QUESTION_CDV,
  R_QUESTION_SV,
} from "../../QUESTION/QUESTION_REQUIRED/R_QUESTION";
import { session_key, Env, Vehicle_Type } from "../INPUT";

//INPUT HERE
const TestCase = "SKIP NA_FNO"; //SKIP NA_FYES || SKIP NA_FNO
const AddImg = true; // True: upload all img, false: not upload

// ------------------DONT MODIFIED BELOW-------------------------

describe(`TEST_FORM WITH ${Vehicle_Type} + ${TestCase}`, () => {
  const nthChild = TestCase == "SKIP NA_FYES" ? 1 : 2;
  const QUESTION =
    Vehicle_Type == "CV"
      ? R_QUESTION_CV
      : Vehicle_Type == "CDV"
      ? R_QUESTION_CDV
      : R_QUESTION_SV;

  beforeEach(() => {
    cy.clearCookies();
    cy.Visit_Form(session_key, Env).as("Link_Form");
  });

  afterEach(() => {
    cy.wait(5000);
  });

  it(`Validate Link`, () => {
    cy.url().should("include", `/${session_key}/result/forms`);
  });

  it(`Choose Vehicle Type ${Vehicle_Type}`, () => {
    cy.chooseVehicleType(Vehicle_Type)
      .click()
      .should("have.css", "background-color", "rgb(39, 208, 137)");
  });

  //CHOOSE OPTION
  it(`choose Option ${TestCase} + UPLOAD_IMG: ${AddImg}`, () => {
    for (let Title in QUESTION) {
      console.log(QUESTION[Title]);
      for (let Option in QUESTION[Title]) {
        cy.get(`#${Title}_${Option}`).then((Qusestion) => {
          console.log(Qusestion.children());
          cy.get(`#${Title}_${Option}>:nth-child(${nthChild})`).click();
        });
      }
    }

    //UPLOAD FULL HÌNH
    cy.get(".ant-upload-select > .ant-upload > input[type=file]").as(
      "UPLOADIMG"
    );
    AddImg &&
      cy.get("@UPLOADIMG").each(($UPlOAD_BTN) => {
        cy.wrap($UPlOAD_BTN).selectFile("cypress/fixtures/test-img.jpg", {
          force: true,
        });
      });
  });

  // click Submit
  it.skip(`Submit Form`, () => {
    cy.get(".ant-form-item-control-input-content > .ant-btn")
      .as("SUBMIT_BUTTON")
      .click();
  });
});
