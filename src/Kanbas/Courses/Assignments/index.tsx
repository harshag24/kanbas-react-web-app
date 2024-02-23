import React, {useState} from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaEdit, FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import "./index.css";

function Assignments() {
  const { courseId } = useParams();
  const assignmentList = assignments.filter(
    (assignment) => assignment.course === courseId);
  const [value, setValue] = useState("");

  const changeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div className="row top-bar">
        <div className="col-4">
          <input type="text" className="form-control" placeholder="Search for Assignment" onChange={changeEvent}/>
        </div>
        <div className="col d-flex justify-content-end">
          <button className="btn"><FaPlus />  Group </button>
          <button className="btn btn-red"> <FaPlus /> Assignment </button>
          <button>
            <FaEllipsisV className="me-2" />
          </button>
        </div>
      </div>

      <hr />
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div className="heading-section">
            <FaEllipsisV className="me-2" /> ASSIGNMENTS
            <span className="float-end">
              <span className="round-box">40% of total</span>
              <FaPlusCircle className="ms-2" />
              <FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {assignmentList.map((assignment) => (
              <li className="list-group-item">
                <FaEllipsisV className="me-2" />
                <FaEdit className="me-2" />
                <Link
                  to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>{assignment.title}</Link>
                <span className="float-end">
                  <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /></span>
              </li>))}
          </ul>
        </li>
      </ul>
    </>
  );
}
export default Assignments;