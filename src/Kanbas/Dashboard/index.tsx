import React, { useState } from "react";
import { Link } from "react-router-dom";
import { courses } from "../Database";
import { FaEllipsisV, FaTrash, FaEdit, FaPlus } from "react-icons/fa";

function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }: {
  courses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void; }) 
  {
    const [showForm, setShowForm] = useState(false); 
  return (
    <>
      <div className="p-4">
        <h1>Dashboard</h1>              <hr />
        <h2>Published Courses ({courses.length})</h2>
        <hr />
        <span className=" float-end">
        <button className="btn" style={{backgroundColor: "green"}} onClick={() => setShowForm(!showForm)}> <FaPlus/></button>
        </span>
        {showForm && (
          <div>
            <h5>Course</h5>
            <input value={course.name || ''} className="form-control" placeholder="Course Name"
              onChange={(e) => setCourse({ ...course, name: e.target.value })} />
            <input value={course.number || ''} className="form-control" placeholder="Course Number"
              onChange={(e) => setCourse({ ...course, number: e.target.value })} />
            <input value={course.startDate || ''} className="form-control" type="date" placeholder="Start Date"
              onChange={(e) => setCourse({ ...course, startDate: e.target.value })} />
            <input value={course.endDate || ''} className="form-control" type="date" placeholder="End Date"
              onChange={(e) => setCourse({ ...course, endDate: e.target.value })} />

            <button className="btn" onClick={() => { addNewCourse(); setShowForm(false); setCourse({ name: '', number: '', startDate: '', endDate: '' });}}>
              Add
            </button>
            <button className="btn" onClick={() => { updateCourse(); setShowForm(false); setCourse({ name: '', number: '', startDate: '', endDate: '' }); }}>
              Update
            </button>
          </div>
        )}
        <div className="row">
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {courses.map((course) => (
              <div key={course._id} className="col" style={{ width: 300 }}>
                <div className="card position-relative">
                  <div className="position-absolute top-0 end-0 m-2" style={{ display: 'flex', alignItems: 'center' }}>
                    <button style={{ color: "green", backgroundColor: "transparent", border: "none", marginRight: "5px" }} onClick={(event) => {
                      event.preventDefault();
                      setCourse(course);
                      setShowForm(true);
                    }}><FaEdit />
                    </button>
                    <button style={{ color: "red", backgroundColor: "transparent", border: "none" }} onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);
                    }}>
                      <FaTrash />
                    </button>
                  </div>
                  {/* <FaEllipsisV className="position-absolute top-0 end-0 m-2" style={{color : "white"}}/>  */}
                  <img src={`/images/${course.image}`} className="card-img-top" alt={course.name}
                    style={{ height: 150 }} />
                  <div className="card-body">
                    <Link className="card-title" to={`/Kanbas/Courses/${course._id}`}
                      style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                      {course.name} </Link>
                    <p className="card-text">{course.name}</p>
                    <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary" style={{ backgroundColor: "green" }}>
                      Go </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;