import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function StudentListRow(props) {
    const { _id, name, email, rollNo } = props.obj;

    const handleClick = () => {
        Axios.delete(`http://localhost:4000/studentRoute/delete-student/${_id}`)
            .then((res) => {
                if (res.status === 200) {
                    alert("Record deleted successfully");
                    // Use a more React way to handle refreshing, if possible
                    // You could consider managing the list of students in your parent component and updating it there
                    window.location.reload(); // This is a hard reload, consider alternatives
                } else {
                    // Use reject with a reason or a custom error
                    return Promise.reject(new Error("Failed to delete record"));
                }
            })
            .catch((err) => alert(err));
    }

    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{rollNo}</td>
            <td className="d-flex justify-content-center">
                <button className="btn btn-sm btn-success">
                    <Link className="text-decoration-none text-light" to={`/edit-student/${_id}`}>Edit</Link>
                </button>
                <button onClick={handleClick} className="btn btn-sm btn-danger mx-3">Delete</button>
            </td>
        </tr>
    )
}

export default StudentListRow;
