import {QUESTION_CV, QUESTION_CDV, QUESTION_SV} from "../../QUESTION/QUESTION_NULL/QUESTION(NULL).js";
import {R_QUESTION_CV, R_QUESTION_CDV, R_QUESTION_SV} from "../../QUESTION/QUESTION_REQUIRED/R_QUESTION";

//INPUT HERE
const session_key = "TVC-2BLNHEXVPZ";
const Vehicle_Type = "CV";
const TestCase = "RANDOM_OPTION"; //RANDOM_OPTION || RANDOM_OPTION_SKIPNA
const AddImg = true; // (true || false)
const Env = "PROD"; // (PROD || DEV)

// ------------------DONT MODIFIED BELOW-------------------------
describe(`TEST_FORM WITH ${Vehicle_Type} + ${TestCase}`, () => {
  const R_QUESTION =
  Vehicle_Type == "CV"
    ? R_QUESTION_CV
    : Vehicle_Type == "CDV"
    ? R_QUESTION_CDV
    : R_QUESTION_SV;

  const F_QUESTION =
    Vehicle_Type == "CV"
      ? QUESTION_CV
      : Vehicle_Type == "CDV"
      ? QUESTION_CDV
      : QUESTION_SV;
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

  it.skip(`Validate Link`, () => {
    cy.url().should("include", `/${session_key}/result/forms`);
  });

  it.skip(`Choose Vehicle Type ${Vehicle_Type}`, () => {
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
    let QUESTION = TestCase == "RANDOM_OPTION" ? F_QUESTION : R_QUESTION;
    for (let Title in QUESTION) {
      console.log(QUESTION[Title]);
      for (let Option in QUESTION[Title]) {
        cy.get(`#${Title}_${Option}`).then((Qusestion) => {
          console.log(Qusestion.children());

          const RandomQuestion = Math.floor(Math.random() * 3) + 1
          
          if (Qusestion.children().length == 3) {
            cy.get(`#${Title}_${Option}>:nth-child(${RandomQuestion})`)
              .as("QuestionOPTION")
              .click();
          } else {
            switch (RandomQuestion) {
              case 3:
                cy.get(`#${Title}_${Option}>:nth-child(1)`).click();
                break;
              default:
                cy.get(`#${Title}_${Option}>:nth-child(${RandomQuestion})`).click();
                break;
            }
          }
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
