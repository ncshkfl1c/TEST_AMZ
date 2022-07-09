//MODIFIED HERE
const session_key = "TVC-PTUWOXPXJS";
const Env = "PROD"; // (PROD || DEV)
const Flow_capture = 13;

//================xxxxxDONT MODIFIED BELOWxxxxxxx================================
describe(`Start + Post ${Flow_capture} IMG`, () => {
  it("Start Session", () => {
    cy.request({
      method: "POST",
      url: `https://session${
        Env === "PROD" ? "" : "-dev"
      }.paveapi.com/api/start`,
      form: true,
      body: {
        session_key: `${session_key}`,
      },
    });
  });

  it(`Post ${Flow_capture} Img`, () => {
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
});
