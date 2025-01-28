import { v4 as uuid } from "uuid";
import path from "path";

const remote = {
  app: {
    getPath: (temp) => temp,
  },
};

/**
 * Generates a path in the application /tmp/ to be used
 * as a working copy for editing protocols.
 *
 * @returns The destination path in /tmp/.
 */
const getLocalDirectoryFromArchivePath = () =>
  path.join(remote.app.getPath("temp"), "protocols", uuid());

export default getLocalDirectoryFromArchivePath;
