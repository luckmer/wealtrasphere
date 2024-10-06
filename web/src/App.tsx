import "@styles/imports.css";
import { Router } from "@solidjs/router";
import { Suspense } from "solid-js";
import { routes } from "./routes";

function App() {
  return (
    <Suspense>
      <div class="container">
        <Router>{routes}</Router>
      </div>
    </Suspense>
  );
}

export default App;
