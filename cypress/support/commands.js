// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "cypress-file-upload";

Cypress.Commands.add("Start_Session", (session_key, Env) => {
  cy.request({
    method: "POST",
    url: `https://session${Env === "PROD" ? "" : "-dev"}.paveapi.com/api/start`,
    form: true,
    body: {
      session_key: `${session_key}`,
    },
  });
});

Cypress.Commands.add("Post_Img", (session_key, Flow_capture, Env) => {
  for (let i = 1; i <= Flow_capture; i++) {
    if (i == 14) {
      continue;
    }

    cy.fixture(`TEST_IMG/${i}.jpg`, "binary").then((imageBin) => {
      const blob = Cypress.Blob.binaryStringToBlob(imageBin, "jpg");
      const data = new FormData();
      data.set("photo_code", `0${i}`);
      data.set("image", blob, `${i}.jpg`);
      data.set("session_key", `${session_key}`);

      cy.request({
        method: "POST",
        url: `https://session${
          Env === "PROD" ? "" : "-dev"
        }.paveapi.com/api/photos`,
        headers: {
          "content-type": "multipart/form-data",
        },
        body: data,
      });
    });
  }
});

Cypress.Commands.add("Visit_Form", (session_key, Env) => {
  cy.visit(
    `https://capture${
      Env == "PROD" ? "" : "-dev"
    }.paveapi.com/${session_key}/result/forms`
  );
});

Cypress.Commands.add("chooseVehicleType", (Vehicle_Type) => {
  cy.get(
    `#VEHICLE_TYPE > :nth-child(${
      Vehicle_Type == "CV" ? 1 : Vehicle_Type == "CDV" ? 2 : 3
    })`
  ).cl;
});

Cypress.Commands.add("CheckValidateCss", (QUESTION, CSS_OPTION, NAME) => {
  for (let Title in QUESTION) {
    for (let Option in QUESTION[Title]) {
      cy.get(`#${Title}_${Option} > label`)
        .should(CSS_OPTION[0], CSS_OPTION[1], CSS_OPTION[2])
        .as(NAME);
    }
  }
})