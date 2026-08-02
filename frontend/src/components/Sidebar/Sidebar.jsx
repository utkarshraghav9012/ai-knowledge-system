import {
  FaHome,
  FaFilePdf,
  FaVideo,
  FaMicrophone,
  FaImage,
  FaBook,
  FaUpload,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {

  return (

    <aside className="sidebar">

      <div className="sidebar-top">

        <button className="collapse-btn">
          <FaChevronLeft />
        </button>


        <nav className="sidebar-menu">


          <div className="menu-item active">
            <FaHome />
            <span>Dashboard</span>
          </div>


          <div className="menu-item">
            <FaFilePdf />
            <span>PDF AI</span>
          </div>


          <div className="menu-item">
            <FaVideo />
            <span>Video AI</span>
          </div>


          <div className="menu-item">
            <FaMicrophone />
            <span>Audio AI</span>
          </div>


          <div className="menu-item">
            <FaImage />
            <span>Image AI</span>
          </div>


          <div className="menu-item">
            <FaBook />
            <span>Knowledge</span>
          </div>


          <div className="menu-item">
            <FaUpload />
            <span>Uploads</span>
          </div>


          <div className="menu-item">
            <FaChartBar />
            <span>Analytics</span>
          </div>


          <div className="menu-item">
            <FaCog />
            <span>Settings</span>
          </div>


        </nav>


      </div>


      <div className="sidebar-bottom">

        <div className="menu-item logout">

          <FaSignOutAlt />

          <span>
            Logout
          </span>

        </div>


        <div className="sidebar-version">

          <h4>
            AI Knowledge Search
          </h4>

          <p>
            v1.0
          </p>

        </div>


      </div>


    </aside>

  );

}


export default Sidebar;