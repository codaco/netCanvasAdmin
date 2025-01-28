// mock ipcRenderer for preview until we work out how to do this with tauri
const ipcRenderer = {
  send: (channel, ...args) => {
    console.log("ipcRenderer.send", channel, args);
  },
};

const preview = (protocol = {}, stageId = 0) => {
  ipcRenderer.send("preview:preview", protocol, stageId);
};

const close = () => {
  ipcRenderer.send("preview:close");
};

const clear = () => {
  ipcRenderer.send("preview:clear");
};

const driver = {
  preview,
  close,
  clear,
};

export default driver;
