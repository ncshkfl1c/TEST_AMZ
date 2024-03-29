import {
  QUESTION_CV,
  QUESTION_CDV,
  QUESTION_SV,
} from "../../QUESTION/QUESTION_NULL/QUESTION(NULL)";
import { session_key, Env, Vehicle_Type } from "../INPUT";
//INPUT HERE

const TestCase = "FULL_NO"; //("FULL_YES" || "FULL_YES_NA" || "FULL_NO" || "FULL_NO_NA")
const AddImg = true; // True: upload all img, false: not upload

// ------------------DONT MODIFIED BELOW-------------------------
describe(`TEST_FORM WITH ${Vehicle_Type} + ${TestCase}`, () => {
  const nthChild = TestCase == "FULL_YES" ? 1 : TestCase == "FULL_NO" ? 2 : 3;
  const QUESTION =
    Vehicle_Type == "CV"
      ? QUESTION_CV
      : Vehicle_Type == "CDV"
      ? QUESTION_CDV
      : QUESTION_SV;
  beforeEach(() => {
    cy.clearCookies();
    cy.Visit_Form(session_key, Env).as("Link_Form");
  });

  afterEach(() => {
    cy.wait(2000);
  });

  it(`Validate Link`, () => {
    cy.url().should("include", `/${session_key}/result/forms`);
  });

  it(`Choose Vehicle Type ${Vehicle_Type}`, () => {
    cy.chooseVehicleType(Vehicle_Type)
      .click()
      .should("have.css", "background-color", "rgb(39, 208, 137)");
  });

  it(`choose Option ${TestCase} + UPLOAD_IMG: ${AddImg}`, () => {
    //CHOOSE FULL
    for (let Title in QUESTION) {
      console.log(QUESTION[Title]);
      for (let Option in QUESTION[Title]) {
        cy.get(`#${Title}_${Option}`).then((Qusestion) => {
          console.log(Qusestion.children());

          if (Qusestion.children().length == 3) {
            cy.get(`#${Title}_${Option}>:nth-child(${nthChild})`)
              .as("QuestionOPTION")
              .click();
          } else {
            switch (nthChild) {
              case 3:
                cy.get(
                  `#${Title}_${Option}>:nth-child(${
                    TestCase == "FULL_YES_NA" ? 1 : 2
                  })`
                ).click();
                break;
              default:
                cy.get(`#${Title}_${Option}>:nth-child(${nthChild})`).click();
                break;
            }
          }
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

  it.skip(`Submit Form`, () => {
    cy.get(".ant-form-item-control-input-content > .ant-btn")
      .as("SUBMIT_BUTTON")
      .click(); // click Submit
  });
});
