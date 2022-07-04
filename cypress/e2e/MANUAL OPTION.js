import {
  QUESTION_CV,
  QUESTION_CDV,
  QUESTION_SV,
} from "../QUESTION/QUESTION_NULL/QUESTION(NULL).js";

//INPUT HERE
const session_key = "TVC-8XUL7YLQKO";
const Vehicle_Type = "CV";
const TestCase = "FULL_YES_NA"; //(FULL_YES || FULL_YES_NA || FULL_NO)
const AddImg = false;

// ------------------DONT MODIFIED BELOW-------------------------

const nthChild = TestCase == "FUll_YES" ? 1 : TestCase == "FULL_NO" ? 2 : 3;
var QUESTION =
  Vehicle_Type == "CV"
    ? QUESTION_CV
    : Vehicle_Type == "CDV"
    ? QUESTION_CDV
    : QUESTION_SV;

describe(`TEST_FORM WITH ${Vehicle_Type} + ${TestCase}`, () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit(`https://capture-dev.paveapi.com/${session_key}/result/forms`).as(
      "Link_Form"
    );
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

  it(`choose Option ${TestCase}`, () => {
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
                cy.get(`#${Title}_${Option}>:nth-child(1)`).click();
                break;
              default:
                cy.get(`@QuestionOPTION`).click();
                break;
            }
          }
        });
      }
    }

    cy.get(".ant-upload-select > .ant-upload > input[type=file]").as(
      "UPLOADIMG"
    ); //BOX UPLOAD IMG

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
