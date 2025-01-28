import { errToString } from "@/lib/protocol-validation/validation/helpers";
import { validateLogic } from "@/lib/protocol-validation/validation/validateLogic";
import { validateSchema } from "@/lib/protocol-validation/validation/validateSchema";

const asyncValidateSchema = async (protocol) =>
  new Promise((resolve, reject) => {
    try {
      const schemaErrors = validateSchema(protocol);
      resolve(schemaErrors);
    } catch (e) {
      reject(e);
    }
  });

const asyncValidateLogic = async (protocol) =>
  new Promise((resolve, reject) => {
    try {
      const logicErrors = validateLogic(protocol);
      resolve(logicErrors);
    } catch (e) {
      reject(e);
    }
  });

const validateProtocol = (protocol) => {
  console.debug("validateProtocol()");

  return Promise.all([
    asyncValidateLogic(protocol),
    asyncValidateSchema(protocol),
  ])
    .catch((e) => {
      console.debug("  error in validators");
      console.error(e);
      return protocol;
    })
    .then(([logicErrors, schemaErrors]) => {
      if (schemaErrors.length > 0 || logicErrors.length > 0) {
        console.debug("  not valid");
        const validationErrors = new Error(
          [...schemaErrors, ...logicErrors].map(errToString).join("")
        );

        console.error(validationErrors);
        throw validationErrors;
      }

      console.debug("  valid");

      return protocol;
    });
};

export default validateProtocol;
