import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./ducks/store";
import ViewManager from "./components/ViewManager/ViewManager";

import "./styles/main.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ViewManager />
      </PersistGate>
    </Provider>
  </StrictMode>
);
