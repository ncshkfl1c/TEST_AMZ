import QUESTION_MANUAL from "../../QUESTION/MANUAL CHOOSE OPTION/QUESTION_MANUAL";

//INPUT HERE
const session_key = "TVC-B5NONUMDJW";
const Vehicle_Type = "CV";
const TestCase = "REALOAD_CHECK";
const AddImg = false;
const Env = "PROD"; // (PROD || DEV)

// ------------------DONT MODIFIED BELOW-------------------------

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

  it(`Check Case ${TestCase}`, () => {
    //Check Css
    for (let Title in QUESTION) {
      console.log(QUESTION[Title]);
      for (let Option in QUESTION[Title]) {
        let answer =QUESTION[Title][Option];
        cy.get(
          `#${Title}_${Option}>:nth-child(${answer})`
        ).should("have.class", "ant-radio-button-wrapper-checked").as(` ${answer == 1 ? "@Yes" : answer == 2 ? "@No" : "@NA"} `);
      }
    }

    //BOX UPLOAD IMG
    cy.get(".ant-upload-span").as(
      "UPLOADIMG"
    );

    //CHECK HÌNH có tồn tại ko
    cy.get("@UPLOADIMG").each(($UPlOAD_BTN) => {
      cy.wrap($UPlOAD_BTN).should("be.visible");
    });
  });

  it.skip(`Submit Form`, () => {
    cy.get(".ant-form-item-control-input-content > .ant-btn")
      .as("SUBMIT_BUTTON")
      .click(); // click Submit
  });
});
