import { get } from "lodash-es";
import packageJson from "../../package.json";

import codenames from "../codenames.json";

const appVersion = packageJson.version;
const codename = get(codenames, appVersion, "");

export default appVersion;

export { codename, appVersion };
