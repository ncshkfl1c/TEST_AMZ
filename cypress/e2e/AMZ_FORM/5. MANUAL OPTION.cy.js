import QUESTION_MANUAL from "../../QUESTION/MANUAL CHOOSE OPTION/QUESTION_MANUAL";
import { session_key, Env, Vehicle_Type } from "../INPUT";

//INPUT HERE
const TestCase = "MANUAL_CHECK"; //(MODIFIED IN "QUESTION/MANUAL CHOOSE OPTION/QUESTION_MANUAL")
const AddImg = true; // True: upload all img, false: not upload

// ------------------DONT MODIFIED BELOW-------------------------
var QUESTION = QUESTION_MANUAL;

describe(`TEST_FORM WITH ${Vehicle_Type} + ${TestCase}`, () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.Visit_Form(session_key, Env).as("Link_Form");
    cy.wait(2000)
  });

  it.skip(`Validate Link`, () => {
    cy.url().should("include", `/${session_key}/result/forms`);
  });

  it(`Choose Vehicle Type ${Vehicle_Type}`, () => {
    cy.chooseVehicleType(Vehicle_Type)
      .click()
      .should("have.css", "background-color", "rgb(39, 208, 137)");
  });

  it(`choose Option ${TestCase}`, () => {
    //CHOOSE FULL
    for (let Title in QUESTION) {
      console.log(QUESTION[Title]);
      for (let Option in QUESTION[Title]) {
        cy.get(`#${Title}_${Option}`).then((Qusestion) => {
          cy.get(
            `#${Title}_${Option}>:nth-child(${QUESTION[Title][Option]})`
          ).click();
        });
      }
    }

    //BOX UPLOAD IMG
    cy.get(".ant-upload-select > .ant-upload > input[type=file]").as(
      "UPLOADIMG"
    );

    //UPLOAD FULL HÌNH
    AddImg &&
      cy.get("@UPLOADIMG").each(($UPlOAD_BTN) => {
        cy.wrap($UPlOAD_BTN).selectFile("cypress/fixtures/test-img.jpg", {
          force: true,
        });
      });
  });

  it.skip(`Submit Form`, () => {
    cy.get(".ant-form-item-control-input-content > .ant-btn")
      .as("SUBMIT_BUTTON")
      .click(); // click Submit
  });
});
