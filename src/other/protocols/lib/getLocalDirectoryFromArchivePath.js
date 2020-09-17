/* eslint-disable import/prefer-default-export */
import { remote } from 'electron';
import fse from 'fs-extra';
import uuid from 'uuid';
import path from 'path';

/**
 * Generates a path in the application /tmp/ to be used
 * as a working copy for editing protocols.
 *
 * @returns The destination path in /tmp/.
 */
const getLocalDirectoryFromArchivePath = () => {
  const localDir = path.join(remote.app.getPath('temp'), 'complexdatacollective', 'architect', 'protocols', uuid());
  fse.ensureDirSync(localDir);
  return localDir;
};

export default getLocalDirectoryFromArchivePath;
