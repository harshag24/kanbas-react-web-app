import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaPlus, FaChevronDown, FaTrash, FaEdit } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
} from "./reducer";
import { KanbasState } from "../../store";


function ModuleList() {
  const { courseId } = useParams();
  const moduleList = useSelector((state: KanbasState) =>
    state.modulesReducer.modules);
  const module = useSelector((state: KanbasState) =>
    state.modulesReducer.module);
  const dispatch = useDispatch();
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [showInputFields, setShowInputFields] = useState(false); 

  return (
    <>
      <div className="row top-bar">
        <div className="button-container d-flex justify-content-end">
          <button className="btn btn-norm">Collapse All</button>
          <button className="btn btn-norm">View Progress</button>
          <button className="btn btn-norm">
            <FaCheckCircle style={{ color: "green" }} /> Publish All <FaChevronDown />
          </button>
          <button className="btn btn-danger" onClick={() => setShowInputFields(true)}>
            <FaPlus /> Module
          </button>
        </div>
      </div>
      <hr />
      <ul className="list-group wd-modules">
      {showInputFields && (
          <li className="list-group-item d-flex justify-content-between">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={module.name || ''}
                placeholder="Module Name"
                onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))}
              />
              <textarea
                className="form-control"
                value={module.description || ''}
                placeholder="Module Description"
                onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))}
                style={{ marginLeft: '10px' }}
              />
            </div>
            <span className="float-end">
              <button
                className="btn"
                style={{ backgroundColor: "green", color: 'white' }}
                onClick={async () => {
                  await dispatch(addModule({ ...module, course: courseId }));
                  dispatch(setModule({ name: '', description: '' }));
                  setShowInputFields(false); 
                  alert('Module Added');
                }}
              >
                <FaPlus />
              </button>
              <button
                className="btn"
                style={{ backgroundColor: "blue", color: 'white' }}
                onClick={async () => {
                  await dispatch(updateModule(module));
                  dispatch(setModule({ name: '', description: '' }));
                  setShowInputFields(false); 
                  alert('Module updated');
                }}
              >
                <FaEdit />
              </button>
            </span>
          </li>
        )}
        {moduleList.filter((module) => module.course === courseId).map((module, index) => (
          <li key={index} className="list-group-item">
            <div onClick={() => setSelectedModuleId(selectedModuleId !== module._id ? module._id : null)}>
              <FaEllipsisV className="me-2" />
              {module.name}
              <span className="float-end">
                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" />
                <button style={{ color: 'red' }} className="ms-2" onClick={() => dispatch(deleteModule(module._id))} > <FaTrash /> </button>
                <button style={{ color: 'green' }} className="ms-2" onClick={() => {dispatch(setModule(module)); setShowInputFields(true);}}><FaEdit /></button>
                <FaEllipsisV className="ms-2" />
              </span>
            </div>
            {selectedModuleId === module._id && (
              <ul className="list-group">
                {moduleList.filter((module) => module.course === courseId).map((lesson, lessonIndex) => (
                  <li className="list-group-item" key={lessonIndex}>
                    <FaEllipsisV className="me-2" />
                    {lesson.name}
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
export default ModuleList;