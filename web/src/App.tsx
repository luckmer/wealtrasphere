import ModalRoot from "@containers/Modals/Index";
import Sidebar from "@pages/Sidebar/Index";
import { Router, useNavigate } from "@solidjs/router";
import "@styles/imports.css";
import { onMount } from "solid-js";
import { routes } from "./routes";
import { fetchDatabaseAccounts } from "@store/accounts/actions";

function App() {
  onMount(() => {
    fetchDatabaseAccounts().catch(() => {});
  });

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
            <div class="p-16 pr-[0px] w-full">{data.children}</div>
          </div>
        );
      }}
    >
      {routes}
    </Router>
  );
}

export default App;
