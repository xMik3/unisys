// Ambient augmentation only. `UserType` lives in general.ts so it can be
// imported normally -- a .d.ts has no emitted .js counterpart to import from.
import type { UserType } from "./general.js";

declare global {
  namespace Express {
    interface Request {
      userID?: number;
      userType?: UserType;
      courses?: string[];
    }
  }
}
