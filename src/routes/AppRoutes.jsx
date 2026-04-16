import { Routes, Route } from "react-router-dom";

// Layout do site
import SiteLayout from "../layouts/SiteLayout";

// 
import PrivateRoute from "../routes/PrivateRoute";

//Site
import Home from "../pages/site/Home";
import CentroAjuda from "../pages/site/CentroAjuda";
import Termos from "../pages/site/Termos";
import Privacidade from "../pages/site/Privacidade";
import NotFound from "../pages/site/NotFound";

//Autenticação
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import CompleteSolicitante from "../pages/auth/CompleteSolicitante";
import CompleteEntregador from "../pages/auth/CompleteEntregador";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

//Dashboard Solicitante
import DashboardSolicitante from "../pages/solicitante/DashboardSolicitante";
import MeusPedidos from "../pages/solicitante/MeusPedidos";
import HistoricoPedidos from "../pages/solicitante/HistoricoPedidos";
import ConfigSolicitante from "../pages/solicitante/ConfigSolicitante";
import MensagensSolicitante from "../pages/solicitante/MensagensSolicitante";
import NotificacoesSolicitante from "../pages/solicitante/NotificacoesSolicitante";
import NotFoundSolicitante from "../pages/solicitante/NotFoundSolicitante";

//Dashboard Entregador
import DashboardEntregador from "../pages/entregador/DashboardEntregador";
import Entregas from "../pages/entregador/Entregas";
import HistoricoEntregador from "../pages/entregador/HistoricoEntregador";
import ConfigEntregador from "../pages/entregador/ConfigEntregador";
import MensagensEntregador from "../pages/entregador/MensagensEntregador";
import NotificacoesEntregador from "../pages/entregador/NotificacoesEntregador";
import NotFoundEntregador from "../pages/entregador/NotFoundEntregador";


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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/complete-solicitante" element={<CompleteSolicitante />} />
      <Route path="/complete-entregador" element={<CompleteEntregador />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/*Rotas do solicitante */}
      <Route element={<PrivateRoute allowedTypes={["SOLICITANTE"]} />}>
        <Route path="/dashboard/solicitante/">
          <Route path="" element={<DashboardSolicitante />} />
          <Route path="pedidos" element={<MeusPedidos />} />
          <Route path="historico" element={<HistoricoPedidos />} />
          <Route path="configuracoes" element={<ConfigSolicitante />} />
          <Route path="mensagens" element={<MensagensSolicitante />} />
          <Route path="notificacoes" element={<NotificacoesSolicitante />} />
          <Route path="*" element={<NotFoundSolicitante />} />
        </Route>
      </Route>

      {/*Rotas do Entregador */}
      <Route element={<PrivateRoute allowedTypes={["ENTREGADOR"]} />}>
        <Route path="/dashboard/entregador/">
          <Route path="" element={<DashboardEntregador />} />
          <Route path="entregas" element={<Entregas />} />
          <Route path="historico" element={<HistoricoEntregador />} />
          <Route path="configuracoes" element={<ConfigEntregador />} />
          <Route path="mensagens" element={<MensagensEntregador />} />
          <Route path="notificacoes" element={<NotificacoesEntregador />} />
          <Route path="*" element={<NotFoundEntregador />} />
        </Route>
      </Route>
    </Routes>
  );
}
