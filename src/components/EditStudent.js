import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import StudentForm from "./StudentForm";

function EditStudent() {
    const { id } = useParams();
    const [data, setData] = useState({ name: "", email: "", rollNo: "" });
    const [newData, setNewData] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:4000/studentRoute/update-student/${id}`)
            .then((res) => {
                if (res.status === 200 && res.data && res.data.name && res.data.email && res.data.rollNo) {
                    const { name, email, rollNo } = res.data;
                    setData({ name, email, rollNo });
                } else {
                    console.error("Failed to fetch student data");
                }
            })
            .catch((err) => console.error(err));
    }, [id]);

    const getState = (childData) => {
        setNewData(childData);
    }

    const handleSubmit = () => {
        const dataToUpdate = { name: newData[0], email: newData[1], rollNo: newData[2] };
        Axios.put(`http://localhost:4000/studentRoute/update-student/${id}`, dataToUpdate)
            .then((res) => {
                if (res.status === 200) {
                    alert("Record updated successfully");
                } else {
                    console.error("Failed to update record");
                }
            })
            .catch((err) => console.error(err));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <StudentForm
                    getState={getState}
                    nameValue={data.name}
                    emailValue={data.email}
                    rollNoValue={data.rollNo}
                />
            </form>
        </div>
    )
}

export default EditStudent;
