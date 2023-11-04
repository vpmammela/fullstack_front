import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Root.jsx'
import ReviewInfo from './components/ReviewInfo/ReviewInfo.tsx'
import SemesterReview from './components/SemesterReview/SemesterReview.tsx'
import ContinuousReview, {action as continuosReviewAction} from './components/ContinuousReview/ContinuousReview.tsx'
import SafetyReview from './components/SafetyReview/SafetyReview.tsx'
import ManagementReview from './components/ManagementReview/ManagementReview.tsx'
import { UserProvider } from './UserContext';
import HomeComponent from './components/HomeComponent/HomeComponent.tsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/home",
        element: <HomeComponent></HomeComponent>
      },
      {
        path: "/reviews/:id",
        element: <ReviewInfo></ReviewInfo>
        //loader: reviewLoader
      },
      {
        path: "/continuous",
        element: <ContinuousReview></ContinuousReview>,
        action: continuosReviewAction
      },
      {
        path: "/semester",
        element: <SemesterReview></SemesterReview>
        //action: createSemesterReview
      },
      {
        path: "/safety",
        element: <SafetyReview></SafetyReview>
        //action: createSafetyReview
      },
      {
        path: "/management",
        element: <ManagementReview></ManagementReview>
        //action: createManagementReview
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router}></RouterProvider>
    </UserProvider>
  </React.StrictMode>
)

