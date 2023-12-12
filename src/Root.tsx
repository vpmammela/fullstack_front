import Notification from "./components/Notification/Notification";
import { Outlet } from "react-router-dom";
import TestBackendConnection from "./components/TestBackendConnection/TestBackendConnection";
import './components/styles.css';
import Header from "./components/header";




export default function Root() {


  return (
    <>
    <Header></Header>
      <div className="app-container">
        <Notification />
        <div className="content-container">
          <Outlet></Outlet>
          {/*<TestBackendConnection />*/}
        </div>
      </div>
     
    </>
  );
}