import Notification from "./components/Notification/Notification";
import { Outlet } from "react-router-dom";
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
        </div>
      </div>
     
    </>
  );
}