import { Routes, Route } from "react-router-dom";

// Layout do site
import SiteLayout from "../layouts/SiteLayout";

//Site
import Home from "../pages/site/Home";
import CentroAjuda from "../pages/site/CentroAjuda";
import Termos from "../pages/site/Termos";
import Privacidade from "../pages/site/Privacidade";
import NotFound from "../pages/site/NotFound";


export default function AppRoutes() {
  return (
    <Routes>
      {/*Rotas do site */}
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/ajuda" element={<CentroAjuda />} />
        <Route path="/termos" element={<Termos />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/*Rotas de autenticação */}

    </Routes>
  );
}
