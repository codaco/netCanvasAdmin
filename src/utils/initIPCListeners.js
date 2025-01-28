import { ipcRenderer } from "electron";
import { isDirty } from "redux-form";
import { store } from "@/ducks/store";
import { getHasUnsavedChanges } from "@/selectors/session";
import { actionCreators as userActions } from "@/ducks/modules/userActions";
import { actionCreators as dialogActions } from "@/ducks/modules/dialogs";
import { formName } from "@/components/StageEditor/StageEditor";
import { UnsavedChanges } from "@/components/Dialogs";

const initIPCListeners = () => {
  ipcRenderer.on("SAVE_COPY", () => {
    store.dispatch(userActions.saveAsNetcanvas());
  });

  ipcRenderer.on("OPEN", () => {
    store.dispatch(userActions.openNetcanvas());
  });

  ipcRenderer.on("SAVE", () => {
    store.dispatch(userActions.saveNetcanvas());
  });

  ipcRenderer.on("PRINT_SUMMARY", () => {
    store.dispatch(userActions.printOverview());
  });

  ipcRenderer.on("CONFIRM_CLOSE", () => {
    const state = store.getState();
    const hasUnsavedChanges = getHasUnsavedChanges(state);
    const hasDraftChanges = isDirty(formName)(state);

    ipcRenderer.send("CONFIRM_CLOSE_ACK");

    if (!hasUnsavedChanges && !hasDraftChanges) {
      ipcRenderer.send("QUIT");
      return;
    }

    store
      .dispatch(
        dialogActions.openDialog(
          UnsavedChanges({
            confirmLabel: "Exit application",
          })
        )
      )
      .then((confirm) => {
        if (confirm) {
          ipcRenderer.send("QUIT");
        }
      });
  });
};

export default initIPCListeners;
