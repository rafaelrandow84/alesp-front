import fs from "fs";

const fileString = fs.readFileSync("./app.json", "utf8");

const appJson = JSON.parse(fileString);

appJson.expo.ios.buildNumber = ((parseInt(appJson.expo.ios.buildNumber) || 0) + 1).toString();
appJson.expo.android.versionCode = (appJson.expo.android.versionCode || 0) + 1;

fs.writeFileSync("./app.json", JSON.stringify(appJson, null, 4) + "\n");
