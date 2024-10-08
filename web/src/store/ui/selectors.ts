import { appUiState } from "./ui";
import { createStoreSelectors } from "../utils";

export const uiSelector = createStoreSelectors(appUiState);
