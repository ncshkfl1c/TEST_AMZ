import QUESTION_MANUAL from "../QUESTION/MANUAL CHOOSE OPTION/QUESTION_MANUAL";

//INPUT HERE
const session_key = "TVC-KK42MFTI4J";
const Vehicle_Type = "CV";
const TestCase = "MANUAL_CHECK"; //(MODIFIED IN QUESTION/MANUAL CHOOSE OPTION/QUESTION_MANUAL)
const AddImg = false;
const Env = "PROD"; // (PROD || DEV)

// ------------------DONT MODIFIED BELOW-------------------------

const nthChild = TestCase == "FUll_YES" ? 1 : TestCase == "FULL_NO" ? 2 : 3;
var QUESTION = QUESTION_MANUAL;

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
