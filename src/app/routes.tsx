import { createBrowserRouter } from "react-router"
import {
  Layout,
  HomePage,
  ProjectsPage,
  ProjectPage,
  AboutPage,
  ContactPage,
  LegalPage,
  NotFoundPage,
} from "./pages"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "projekte", Component: ProjectsPage },
      { path: "projekte/:slug", Component: ProjectPage },
      { path: "ueber-mich", Component: AboutPage },
      { path: "kontakt", Component: ContactPage },
      { path: "impressum", element: <LegalPage title="Impressum" /> },
      { path: "datenschutz", element: <LegalPage title="Datenschutz" /> },
      { path: "*", Component: NotFoundPage },
    ],
  },
])
