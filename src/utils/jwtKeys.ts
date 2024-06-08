import fs from "fs";
import path from "path";

/**
 * This module exports public and private keys for JWT authentication.
 * It reads the keys from the filesystem and makes them available for use.
 *
 * The keys are stored in a subdirectory named 'auth' in the root of the project.
 * The keys are expected to be in PEM format and should be named 'public.key' and
 * 'private.key' respectively.
 *
 * @module jwtKeys
 * @returns {Object} An object containing the public and private keys as strings.
 */

export const privateKey = fs.readFileSync(
  path.join(__dirname, "../../auth/private.key"),
  "utf8"
);
export const publicKey = fs.readFileSync(
  path.join(__dirname, "../../auth/public.key"),
  "utf8"
);
