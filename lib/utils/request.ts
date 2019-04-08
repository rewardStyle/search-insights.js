import { request as nodeHttpRequest } from "http";
import {
  supportsNodeHttpModule,
  supportsSendBeacon,
  supportsXMLHttpRequest
} from "./feature-detection";

export default function makeRequester() {
  if (supportsSendBeacon()) {
    return requestWithSendBeacon;
  }

  if (supportsXMLHttpRequest()) {
    return requestWithXMLHttpRequest;
  }

  // if (supportsNodeHttpModule()) {
  //   return requestWithNodeHttpModule;
  // }

  throw new Error(
    "Could not find a supported HTTP request client in this environment."
  );
}

function requestWithSendBeacon(url, data) {
  const serializedData = JSON.stringify(data);
  navigator.sendBeacon(url, serializedData);
}

function requestWithXMLHttpRequest(url, data) {
  const serializedData = JSON.stringify(data);
  const report = new XMLHttpRequest();
  report.open("POST", url);
  report.send(serializedData);
}

function requestWithNodeHttpModule(url, data) {
  const serializedData = JSON.stringify(data);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": serializedData.length
    }
  };

  const req = nodeHttpRequest(url, options);

  req.on("error", error => {
    console.error(error);
  });

  req.write(serializedData);
  req.end();
}
