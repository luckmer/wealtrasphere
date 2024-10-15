import "@styles/imports.css";
import { Router } from "@solidjs/router";
import { routes } from "./routes";
import Sidebar from "@pages/Sidebar/Index";

function App() {
  return (
    <Router
      root={(data) => {
        return (
          <div class="flex h-[100vh] w-[100vw]">
            <Sidebar navigation={data.location.pathname} />
            {data.children}
          </div>
        );
      }}
    >
      {routes}
    </Router>
  );
}

export default App;
