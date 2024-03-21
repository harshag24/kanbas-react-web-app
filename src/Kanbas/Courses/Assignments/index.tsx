import React, {useState} from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { assignments } from "../../Database";
import "./index.css";
import { deleteAssignment } from "./reducer";
import { KanbasState } from "../../store";

function Assignments() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignmentList = useSelector((state: KanbasState) => state.assignmentsReducer.assignments.filter((assignment) => assignment.course === courseId));
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
          <button className="btn" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Assignments/new`)}><FaPlus /> Assignment </button>
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
            {assignmentList.map((assignment, index) => (
              <li key={index} className="list-group-item">
                <FaEllipsisV className="me-2" />
                <FaEdit className="me-2" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`)}/>
                <span>{assignment.title}</span>
                <span className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaTrash className="ms-2" onClick={() => {
                    const confirmDelete = window.confirm("Are you sure you want to delete this assignment?");
                    if (confirmDelete) {
                      dispatch(deleteAssignment(assignment._id));
                    }
                  }} />
                  <FaEllipsisV className="ms-2" />
                </span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
}
export default Assignments;