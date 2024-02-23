import { FaAngleDown, FaArrowDown, FaFileExport, FaFileImport } from "react-icons/fa";
import { FaFilter, FaGear } from "react-icons/fa6";
import { assignments, enrollments, grades, users } from "../../Database";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "./index.css"

function Grades() {
  const { courseId } = useParams();
  const [searchTermStudent, setSearchTermStudent] = useState('');
  const [searchTermAssignment, setSearchTermAssignment] = useState('');
  const [draftSearchStudent, setDraftSearchStudent] = useState('');
  const [draftSearchAssignment, setDraftSearchAssignment] = useState('');

  const applyFilters = () => {
    setSearchTermStudent(draftSearchStudent);
    setSearchTermAssignment(draftSearchAssignment);
  };

  const assignmentsToShow = assignments.filter(assignment =>
    assignment.course === courseId && assignment.title.toLowerCase().includes(searchTermAssignment.toLowerCase())
  );

  const enrollmentsToShow = enrollments.filter(enrollment =>
    enrollment.course === courseId &&
    users.some(user => user._id === enrollment.user && user.firstName.toLowerCase().includes(searchTermStudent.toLowerCase()))
  );
  return (
    <div className="grades-page-container">
      <div className="header-row mb-12">

        <div className="tools-icons">
          <div className="d-flex justify-content-end">
            <button className="btn"><FaFileImport /> Import</button>
            <button className="btn"><FaFileExport /> Export <FaAngleDown/></button>
            <button className="btn"><FaGear /></button>
          </div>
        </div>
      </div>
      <div className="search-fields-row">
        <div className="col-md-6 search-field">
          <label htmlFor="searchStudent" className="form-label">Student Names</label>
          <input
            id="searchStudent"
            type="text"
            className="form-control"
            placeholder="Search Student Names"
            value={draftSearchStudent}
            onChange={e => setDraftSearchStudent(e.target.value)}
          />
        </div>
        <div className="col-md-6 search-field">
          <label htmlFor="searchAssignment" className="form-label">Assignment Names</label>
          <input
            id="searchAssignment"
            type="text"
            className="form-control"
            placeholder="Search Assignments"
            value={draftSearchAssignment}
            onChange={e => setDraftSearchAssignment(e.target.value)}
          />
        </div>
      </div>
      <div className="filter-button">
          <button onClick={applyFilters}><FaFilter /> Apply Filters</button>
      </div>
      <div className="grades-table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Student Name</th>
              {assignmentsToShow.map(assignment => <th key={assignment._id}>{assignment.title}</th>)}
            </tr>
          </thead>
          <tbody>
            {enrollmentsToShow.map((enrollment, idx) => {
              const student = users.find(user => user._id === enrollment.user);
              return (
                <tr key={enrollment._id} className={idx % 2 === 0 ? "even-row" : "odd-row"}>
                  <td style={{color : "red"}}>{student ? `${student.firstName} ${student.lastName}` : ''}</td>
                  {assignmentsToShow.map(assignment => {
                    const studentGrade = grades.find(grade => grade.student === enrollment.user && grade.assignment === assignment._id);
                    return <td key={assignment._id}>{studentGrade ? studentGrade.grade : ''}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Grades;