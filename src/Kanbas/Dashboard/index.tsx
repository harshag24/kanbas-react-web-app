import React from "react";
import { Link } from "react-router-dom";
import { courses } from "../Database";
import { FaEllipsisV } from "react-icons/fa";
function Dashboard() {
  return (
    <>
    <div className="p-4">
      <h1>Dashboard</h1>              <hr />
      <h2>Published Courses (8)</h2> <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {courses.map((course) => (
            <div key={course._id} className="col" style={{ width: 300 }}>
              <div className="card position-relative">
               <FaEllipsisV className="position-absolute top-0 end-0 m-2" style={{color : "white"}}/> 
                <img src={`/images/${course.image}`} className="card-img-top"
                     style={{ height: 150 }}/>
                <div className="card-body">
                  <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}
                    style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                    {course.name} </Link>
                  <p className="card-text">{course.name}</p>
                  <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary" style={{backgroundColor: "green"}}>
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