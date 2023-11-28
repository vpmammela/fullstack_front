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
import RoomSelection from './components/RoomSelection/RoomSelection.tsx'
import Home from './Home.tsx'
import ReviewSelection from './components/ReviewSelection/ReviewSelection.tsx'
import axios from 'axios'
import { NotificationProvider } from './NotificationContext.tsx'


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
//axios.defaults.withCredentials = true


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/roomselection",
        element: <RoomSelection></RoomSelection>
      },
      {
        path: "/reviewselection",
        element: <ReviewSelection></ReviewSelection>
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
  
  },
 
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NotificationProvider>
      <UserProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserProvider>
    </NotificationProvider>
  </React.StrictMode>
)

