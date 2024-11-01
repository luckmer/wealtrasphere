import { Accessor, createMemo, createRoot } from "solid-js";

export function createStoreSelectors<T extends object>(
  store: () => T
): { [K in keyof T]: Accessor<T[K]> } {
  // Create a root to ensure proper disposal of computations
  return createRoot(() => {
    const keys = Object.keys(store()) as (keyof T)[];
    const selectors = keys.reduce((acc, key) => {
      /*@once*/
      acc[key] = createMemo(() => store()[key]);
      return acc;
    }, {} as { [K in keyof T]: Accessor<T[K]> });

    // Return the selectors object
    return selectors;
  });
}
