import "@styles/imports.css";
import { Router, useNavigate } from "@solidjs/router";
import { routes } from "./routes";
import Sidebar from "@pages/Sidebar/Index";
import ModalRoot from "@containers/Modals/Index";

function App() {
  return (
    <Router
      root={(data) => {
        const navigate = useNavigate();
        return (
          <div class="flex h-[100vh] w-[100vw]">
            <ModalRoot />
            <Sidebar
              navigation={data.location.pathname}
              onClick={(path) => {
                navigate(path);
              }}
            />
            <div class="p-16 w-full">{data.children}</div>
          </div>
        );
      }}
    >
      {routes}
    </Router>
  );
}

export default App;
