import { RouteDefinition } from "@solidjs/router";
import Dashboard from "@containers/Dashboard/Index";
import { NAVIGATION } from "@interfaces/enums";

export const routes: RouteDefinition[] = [
  { path: NAVIGATION.DASHBOARD, component: Dashboard },
];
