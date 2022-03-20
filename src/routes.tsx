import {  
  Routes as RoutesDOM,
  Route,
} from "react-router-dom";
import HomeView from "./views/Home";
import { NotFoundView } from "./views/NotFound";

export default function Routes() {
  return (
    <RoutesDOM>
      <Route path="/" element={<HomeView />} />
      <Route path="*" element={<NotFoundView />} />
    </RoutesDOM>
  )
}