import { isEqual } from "lodash-es";

export const getScreensMessage = (state) => state.ui.screens.message;

export const getScreensStack = (state) => state.ui.screens.screens;

export const makeScreenMessageListener = (screen) => {
  let previousMessage = null;

  return (state) => {
    const message = getScreensMessage(state);

    if (isEqual(message, previousMessage)) {
      return null;
    }
    if (message.screen !== screen) {
      return null;
    }
    previousMessage = message;

    return message.params;
  };
};
