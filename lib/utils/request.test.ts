import {
  supportsSendBeacon,
  supportsXMLHttpRequest
} from "./feature-detection";

jest.mock("./feature-detection");

describe("makeRequester", () => {
  it(`should pick sendBeacon first if available`, () => {
    console.log(supportsXMLHttpRequest)

  });
});
