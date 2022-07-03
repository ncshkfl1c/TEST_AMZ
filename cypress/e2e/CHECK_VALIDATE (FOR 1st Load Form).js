import QUESTION_CV from "../QUESTION/CV_QUESTION(NULL)";
import QUESTION_SV from "../QUESTION/SV_QUESTION(NULL)";
import QUESTION_CDV from "../QUESTION/CDV_ QUESTION(NULL)";

//INPUT HERE
const session_key = "TVC-8XUL7YLQKO";
const Vehicle_Type = "CV";
const TestCase = "Validate";

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

  it(`Submit Before choose Option - Validate Question CSS`, () => {
    
    cy.get(".ant-form-item-control-input-content > .ant-btn")
      .as("SUBMIT_BUTTON")
      .click(); // click Submit to show validate and noti
    
    cy.get(".ant-notification-notice").should("be.visible"); //CHECK NOTIFICATION
    cy.log(
      `${
        Vehicle_Type == "CV"
          ? "QUESTION_CV"
          : Vehicle_Type == "CDV"
          ? "QUESTION_CDV"
          : "QUESTION_SV"
      }`
    ); //SHOW QUESTION

    for (let Title in QUESTION) {
      console.log(QUESTION[Title]);
      for (let Option in QUESTION[Title]) {
        cy.get(`#${Title}_${Option} > label`).should(
          "have.css",
          "border-color",
          "rgb(255, 77, 79)"
        );
      }
    }
  }); //CHECK VALIDATION
});
