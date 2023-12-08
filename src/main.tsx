import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Root.jsx'
import SemesterReview from './components/SemesterReview/SemesterReview.tsx'
import ContinuousReview, {action as continuosReviewAction} from './components/ContinuousReview/ContinuousReview.tsx'
import SafetyReview from './components/SafetyReview/SafetyReview.tsx'
import ManagementReview from './components/ManagementReview/ManagementReview.tsx'
import { UserProvider } from './UserContext';
import RoomSelection from './components/RoomSelection/RoomSelection.tsx'
import Home from './Home.tsx'
import ReviewSelection from './components/ReviewSelection/ReviewSelection.tsx'
import { NotificationProvider } from './NotificationContext.tsx'
import LoginForm from './components/LoginForm/LoginForm.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Locations from './components/Locations.tsx'
import CreateLocation from './components/CreateLocation.tsx'
import Raports from './components/raports.tsx'
import UserControl from './components/UserControl.tsx'
import { ReviewProvider } from './ReviewContext.tsx'


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
      },
      {
        path: "/raports",
        element: <Raports></Raports>
      },
      {
        path: "/usercontrol",
        element: <UserControl isAdmin={false}></UserControl>
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
        <ReviewProvider>
          <RouterProvider router={router}></RouterProvider>
        </ReviewProvider>
      </UserProvider>
    </NotificationProvider>
  </React.StrictMode>
)

