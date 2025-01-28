const noop = (fnName: string) => {
  console.log(`fs-extra-mock: ${fnName} is not implemented`);
};

export function copy() {
  noop("copy");
}

export function remove() {
  noop("remove");
}

export function rename() {
  noop("rename");
}

export function outputFile() {
  noop("outputFile");
}

export function writeFile() {
  noop("writeFile");
}

export default {
  copy,
  remove,
  rename,
  outputFile,
  writeFile,
};
