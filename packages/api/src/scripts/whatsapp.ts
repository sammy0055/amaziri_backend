import { WhatSappAccountManager } from "../helpers/integrations/manage-whatsapp";

const access_token =
  "EAAGu0w0jKycBO6NfPznktGHaZCb0lTX2IIk0jddDFcKRJ8xxunP18pcRtUtqfZCUuXsTyGe7SDFnVsQ0t02EnYwlrLhLT48GWA2HTfzwQcNfGF7Yf51RNpZC7zgTIweTHlbtkPIMwwtZC3fUorYtMbo2kwhkHoEZC3zaZAL20qIi00vvd8e0p5tZA9VtscXgjuLqnX9mOZBUzBY7JZCO0WQL9h7V2sWUByoH5QZBbs8MLsvASIZBCZAaTOTZBycuMRnbWgOffx8u9XVZB1bAZDZD";
const { inspectAcessToken } = new WhatSappAccountManager("emial");
const business_id = "448450234592588";
const dd = async () => {
  // const ddd = await inspectAcessToken(access_token)
  const url = `https://graph.facebook.com/v17.0/${business_id}/owned_whatsapp_business_accounts?access_token=${access_token}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log("====================================");
  console.log(data);
  console.log("====================================");
};

dd();
