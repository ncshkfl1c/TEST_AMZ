import {QUESTION_CV, QUESTION_CDV, QUESTION_SV} from "../QUESTION/QUESTION_NULL/QUESTION(NULL).js";
//INPUT HERE
const session_key = "TVC-KK42MFTI4J";
const Vehicle_Type = "CV";
const TestCase = "RANDOM_CHECK"; //(MODIFIED IN QUESTION/MANUAL CHOOSE OPTION/QUESTION_MANUAL)
const AddImg = false;
const Env = "PROD"; // (PROD || DEV)

// ------------------DONT MODIFIED BELOW-------------------------

const nthChild = TestCase == "FUll_YES" ? 1 : TestCase == "FULL_NO" ? 2 : 3;
const QUESTION =
    Vehicle_Type == "CV"
      ? QUESTION_CV
      : Vehicle_Type == "CDV"
      ? QUESTION_CDV
      : QUESTION_SV;

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
    cy.wait(5000);
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


  //Choose Random
  it(`choose Option ${TestCase}`, () => {    
    for (let Title in QUESTION) {
      console.log(QUESTION[Title]);
      for (let Option in QUESTION[Title]) {
        const RandomQuestion = Math.floor(Math.random() * 2) + 1
        cy.get(`#${Title}_${Option}`).then((Qusestion) => {
          cy.get(
            `#${Title}_${Option}>:nth-child(${RandomQuestion})`
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
