import { NAVIGATION } from "@interfaces/enums";
import { RouteDefinition } from "@solidjs/router";

import { lazy } from "solid-js";

const Dashboard = lazy(() => import("@containers/Dashboard/Index"));
const Accounts = lazy(() => import("@containers/Accounts/Index"));
const Settings = lazy(() => import("@containers/Settings/Index"));

export const routes: RouteDefinition[] = [
  { path: NAVIGATION.DASHBOARD, component: Dashboard },
  { path: NAVIGATION.ACCOUNTS, component: Accounts },
  { path: NAVIGATION.SETTINGS, component: Settings },
];
