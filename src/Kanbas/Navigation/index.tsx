import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaBook, FaRegCalendarAlt, FaInbox, FaHistory, FaDesktop, FaQuestionCircle, FaRegUserCircle } from "react-icons/fa";
function KanbasNavigation() {
  const links = [
    { label: "Account", icon: <FaRegUserCircle className="fs-2"  /> },
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" /> },
    { label: "Courses", icon: <FaBook className="fs-2" /> },
    { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" /> },
    { label: "Inbox", icon: <FaInbox className="fs-2" /> },
    { label: "History", icon: <FaHistory className="fs-2" /> },
    { label: "Studio", icon: <FaDesktop className="fs-2" /> },
    { label: "Help", icon: <FaQuestionCircle className="fs-2" /> },
  ];
  const { pathname } = useLocation();
  return (
    <ul className="wd-kanbas-navigation">
      <div className="wd-uni-container">
        <a href="/Kanbas/Dashboard">
          <img
            src="./images/neu.png"
            className="wd-uni"
            alt="University"
          />
        </a>
      </div>
      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
          <Link to={`/Kanbas/${link.label}`}> {link.icon} <br/> {link.label} </Link>
        </li>
      ))}
    </ul>
  );
}
export default KanbasNavigation;