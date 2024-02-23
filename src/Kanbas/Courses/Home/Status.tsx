import "./index.css";
import { FaTimesCircle, FaCheckCircle, FaExclamation, FaCalendar, FaFile, FaCloud, FaHome, FaBook, FaBell, FaBullhorn, FaCheck} from "react-icons/fa";
function Status() {
    return (
        <>
            <div className="row course-status-section">
                <div className="row">
                <button className="unpublished"><FaTimesCircle /> Unpublish</button>
                <button className="published"><FaCheckCircle /> Published</button>
                </div>
                <div className="row status-buttons">
                    <ul>
                        <li><button><FaFile/> Import Existing Content</button></li>
                        <li><button><FaCloud/> Import From Commons</button></li>
                        <li><button><FaHome/> Choose Home Page</button></li>
                        <li><button><FaBook/> View Course Stream</button></li>
                        <li><button><FaBell/> View Course Notifications</button></li>
                        <li><button><FaBullhorn/> New Announcement</button></li>
                        <li><button><FaCheck/> New Analytics</button></li>
                    </ul>
                </div>
                <div className="row to-do">
                    To Do
                    <hr/>
                    <ul>
                        <li>
                            <FaExclamation /> <a href="#">Assignment 1</a>
                        </li>
                        <li>
                            <FaExclamation /> <a href="#">Assignment 2</a>
                        </li>
                        <li>
                            <FaExclamation /> <a href="#">Assignment 3</a>
                        </li>
                    </ul>
                </div>

                <div className="row coming-up">
                    Coming Up
                    <hr/>
                    <ul>
                        <li><a href="#"><FaCalendar />Lecture 1</a></li>
                        <li><a href="#"><FaCalendar />Lecture 2</a></li>
                        <li><a href="#"><FaCalendar />Lecture 3</a></li>
                    </ul>
                </div>
                <div className="row calendar">
                    <ul>
                        <li><FaCalendar /> <a href="#">View Calendar</a></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Status;