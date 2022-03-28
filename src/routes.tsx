import {  
  Routes as RoutesDOM,
  Route,
} from "react-router-dom";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import HomeView from "./views/Home";
import { NotFoundView } from "./views/NotFound";
import { RegisterView } from "./views/Register";

export default function Routes() {
  return (
    <RoutesDOM>
      <Route path="/" element={<HomeView />} />
      <Route path="/cadastro" element={
        <PublicOnlyRoute>
          <RegisterView />
        </PublicOnlyRoute>
        } />
      <Route path="*" element={<NotFoundView />} />
    </RoutesDOM>
  )
}