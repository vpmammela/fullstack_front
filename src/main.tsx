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
import LoginForm from './components/LoginForm/LoginForm.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Locations from './components/Locations.tsx'
import CreateLocation from './components/CreateLocation.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Root></Root></ProtectedRoute>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/locations",
        element: <Locations></Locations>
      },
      {
        path: "/locations/create",
        element: <CreateLocation></CreateLocation>
      },
      {
        path: "/locations/:id",
        element: <Location></Location>
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
  {  
    path: "/login",
    element: <LoginForm></LoginForm>
  }
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

