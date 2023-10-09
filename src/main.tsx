import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AuthProvider } from "./AuthProvider.tsx";
import { HomePage } from "./components/HomePage.tsx";
import SafetyReview from "./components/SafetyReview/SafetyReview.tsx";

// Navigation inside the app. 
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: (
          <AuthProvider>
            <HomePage />
          </AuthProvider>
        ),
      },
      {
        path: "SafetyReview",
        element: (
          <AuthProvider>
            <SafetyReview user={null} />
          </AuthProvider>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
