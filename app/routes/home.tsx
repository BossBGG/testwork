import type { Route } from "./+types/home";
import ImoDesignerPage from "../pages/imoDesignerPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}


export default function Home() {

  return <ImoDesignerPage />;
  
}
