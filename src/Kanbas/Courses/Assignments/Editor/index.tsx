import { ChangeEvent , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addAssignment, updateAssignment } from "../reducer"; 
import { KanbasState } from "../../../store"; 
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";

function AssignmentEditor() {
  const { courseId, assignmentId } = useParams();
  console.log(assignmentId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const assignments = useSelector((state: KanbasState) => state.assignmentsReducer.assignments);
  const existingAssignment = assignments.find(assignment => assignment._id === assignmentId);

  const [assignment, setAssignment] = useState({
    _id: existingAssignment ? existingAssignment._id : '',
    title: existingAssignment ? existingAssignment.title : '',
    description: existingAssignment ? existingAssignment.description : '',
    points: existingAssignment ? existingAssignment.points : '',
    dueDate: existingAssignment ? existingAssignment.dueDate : '',
    availableFromDate: existingAssignment ? existingAssignment.availableFromDate : '',
    availableUntilDate: existingAssignment ? existingAssignment.availableUntilDate : '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAssignment({
      ...assignment,
      [name]: value,
    });
  };

  const handleSave = () => {
    let assignmentData;
    if (assignmentId !== "new") {
      assignmentData = {
        ...assignment,
        course: courseId,
      };
      dispatch(updateAssignment(assignmentData));
    } else {
      const newId = generateNextAssignmentId(assignments);
      assignmentData = {
        ...assignment,
        _id: newId,
        course: courseId,
      };
      dispatch(addAssignment(assignmentData));
    }
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };
  

  return (
    <div>
      <div className="d-flex justify-content-end g-5">
        <label className="text-success"><FaCheckCircle/> Published</label>
        <button><FaEllipsisV/></button>
      </div>
      <hr/>
      <div>
        <h4>Assignment Name</h4>
        <input name="title" value={assignment.title} onChange={handleInputChange} className="form-control mb-2" />
        <h4>Description</h4>
        <textarea name="description" value={assignment.description} onChange={handleInputChange} className="form-control mb-2" />
        <h4>Points</h4>
        <input name="points" value={assignment.points} onChange={handleInputChange} className="form-control mb-2" />
        <h4>Due Date</h4>
        <input name="dueDate" type="date" value={assignment.dueDate} onChange={handleInputChange} className="form-control mb-2" />
        <h4>Available From</h4>
        <input name="availableFromDate" type="date" value={assignment.availableFromDate} onChange={handleInputChange} className="form-control mb-2" />
        <h4>Available Until</h4>
        <input name="availableUntilDate" type="date" value={assignment.availableUntilDate} onChange={handleInputChange} className="form-control mb-2" />
        <button onClick={handleSave} className="btn ms-2 float-end btn-success">
          Save
        </button>
        <button onClick={() => navigate(`/Kanbas/Courses/${courseId}/Assignments`)} className="btn btn-danger float-end">
          Cancel
        </button>
      </div>
    </div>
  );
}
function generateNextAssignmentId(assignments: { _id: string }[]): string {
  const maxId = assignments.reduce((max, assignment) => {
    const numericPart = parseInt(assignment._id.substring(1), 10);
    return numericPart > max ? numericPart : max;
  }, 0);

  const nextId = maxId + 1;
  console.log(`A${nextId}`);
  return `A${nextId}`;
}

export default AssignmentEditor;
