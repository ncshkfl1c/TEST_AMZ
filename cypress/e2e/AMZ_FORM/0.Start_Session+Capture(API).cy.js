import {session_key, Env} from "../INPUT"


//MODIFIED HERE
// const session_key = "MMA-BRZWT2I3SN";
// const Env = "PROD"; // (PROD || DEV)
const Flow_capture = 13;

//================xxxxxDONT MODIFIED BELOWxxxxxxx================================
describe(`Start + Post ${Flow_capture} IMG`, () => {
  it("Start Session", () => {
    cy.Start_Session(session_key, Env);
  });

  it(`Post ${Flow_capture} Img`, () => {
    cy.Post_Img(session_key, Flow_capture, Env);
  });
});
