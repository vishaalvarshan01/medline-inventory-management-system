import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/HomePage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Layout from "./pages/Layout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import IssuesPage from "./pages/IssuesPage.jsx";
import InventoryPage from "./pages/InventoryPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ReportsPages from "./pages/ReportsPages.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";

import { RecoilRoot } from "recoil";
import IssuePage from "./pages/IssuePage.jsx";
import AddIssuePage from "./pages/AddIssuePage.jsx";
import EditIssuePage from "./pages/EditIssuePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LoginPage />} loader={() => "login"}></Route>
      <Route path="home" element={<PrivateRoute element={<Layout />} />}>
        <Route path="" element={<Home />} />
        <Route path="issues" element={<IssuesPage />} />
        <Route path="issues/addissue" element={<AddIssuePage />} />
        <Route path="issues/editIssue/:issueId" element={<EditIssuePage />} />
        <Route path="issues/:issueId" element={<IssuePage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="reports" element={<ReportsPages />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
