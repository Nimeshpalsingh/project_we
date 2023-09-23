import React, { useState, useEffect } from 'react';

function Test() {
    // Initialize state variables
    const [addData, setAddData] = useState([]);

    // Function to load data from localStorage
    const loadStoredData = () => {
        const storedData = JSON.parse(localStorage.getItem('data'));
        if (storedData) {
            setAddData(storedData);
        }
    };

    // Function to add new data
    const addNewData = () => {
        const newData = {
            Username: 'newUsername',
            mobile: 'newMobile',
            email: 'newEmail@new.com',
            Password: 'newPassword',
        };

        const updatedData = [...addData, newData];

        // Update state and localStorage
        localStorage.setItem('data', JSON.stringify(updatedData));
        setAddData(updatedData);
    };

    // Load data from localStorage when the component mounts
    useEffect(() => {
        loadStoredData();
    }, []);


    const deleteClickHandlar = (indexToDelete) => {
        const updatedData = addData.filter((item, index) => index !== indexToDelete);
        // Update state and localStorage
        localStorage.setItem('data', JSON.stringify(updatedData));
        setAddData(updatedData);

    }
    const editClickHandlar = (indexToEdit) => {

      

    }


    return (
        <div>
            <button onClick={addNewData}>Add New Data</button>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {addData.map((item, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{item.Username}</td>
                            <td>{item.email}</td>
                            <td>{item.mobile}</td>
                            <td onClick={() => deleteClickHandlar(index)}>Delete</td>
                            <td onClick={editClickHandlar}>Edit</td>
                        </tr>
                    ))}



                </tbody>
            </table>

        </div>
    );
}

export default Test;
