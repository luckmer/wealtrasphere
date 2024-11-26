import { appDashboardState } from "./dashboard";
import { createStoreSelectors } from "../utils";

export const dashboardSelector = createStoreSelectors(appDashboardState);
