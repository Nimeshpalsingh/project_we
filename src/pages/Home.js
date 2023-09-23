import React, { useEffect, useRef, useState } from 'react'
import * as Enum from '../common/Enums'
import CommonInputBoxNew from '../components/formElements/CommonInputBoxNew'
import { SubmitButton } from '../components/formElements/SubmitButton'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

import * as htmlToImage from 'html-to-image';
import { copyImageToClipboard } from 'copy-image-clipboard'
import Variables from '../common/Variables'


function Home() {
    const [show, setShow] = useState(false);
    const [imageShow, setImageShow] = useState(false);


    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [formRefs, setFormRefs] = useState({});
    const [searchQuery, setSearchQuery] = useState(''); // Step 1: Create a state variable for search query
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleImageClose = () => setImageShow(false);

    const [showUpdateBtn, setShowUpdateBtn] = useState(false)

    const [showButtonLoader, setShowButtonLoader] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [addData, setAddData] = useState([]);
    const [indexToEdit, setIndexToEdit] = useState(-1)

    const [sortColumn, setSortColumn] = useState(''); // State to track sorting column
    const [sortOrder, setSortOrder] = useState('asc'); // State to track sorting order
    const targetRef = useRef(null);
    // Function to load data from localStorage
    const loadStoredData = () => {
        const storedData = JSON.parse(localStorage.getItem('data'));
        if (storedData) {
            setAddData(storedData);
        }
    };

    useEffect(() => {
        loadStoredData();
    }, [show]);


    const filteredData = addData.filter((item) => {
        return (
            item.Username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.mobile.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });
    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const sortedData = filteredData.slice().sort((a, b) => {
        const aValue = a[sortColumn]
        const bValue = b[sortColumn]

        if (aValue < bValue) {
            return sortOrder === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
    });


    const submitClickHandler = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            submit();
        }, 50);
    }

    const submit = async () => {
        let formValidated = true;

        for (let fe in formErrors) {
            if (formErrors[fe] != '') {
                console.log(fe + ' - ' + formErrors[fe]);
                formValidated = false;
                break;
            }
        }

        if (!formValidated) {
            setIsSubmitting(false);
            return;
        }

        setShowButtonLoader(true);

        if (showUpdateBtn) {
            const updatedData = [...addData];
            updatedData[indexToEdit] = formValues;
            localStorage.setItem('data', JSON.stringify(updatedData));
        } else {
            const updatedData = [...addData, formValues];
            localStorage.setItem('data', JSON.stringify(updatedData));
            const storedData = JSON.parse(localStorage.getItem('data'));
            setAddData(storedData);
            setIsSubmitting(false);
        }

        setTimeout(() => {
            setShowButtonLoader(false);
            setShow(false);
        }, 1000);

    }

    const keyDownHandler = (e, name) => {
        if (e.which === 13) {
            if (name === 'Username') {
                formRefs['Password'].focus();
            } else if (name === 'Password') {
                submitClickHandler();
            }
        }
    }

    const deleteClickHandlar = (indexToDelete) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedData = addData.filter((item, index) => index !== indexToDelete);
                // Update state and localStorage
                localStorage.setItem('data', JSON.stringify(updatedData));
                setAddData(updatedData)

            }
        })

    }


    const editClickHandlar = (indexToEdit) => {
        formErrors['Username'] = '';
        console.log(indexToEdit);
        setShow(true)
        const dataToEdit = addData[indexToEdit];
        formValues['Username'] = dataToEdit.Username;
        formValues['mobile'] = dataToEdit.mobile;
        formValues['email'] = dataToEdit.email;
        formValues['Password'] = dataToEdit.Password;
        setShowUpdateBtn(true)
        setIndexToEdit(indexToEdit);

    }


    const onClickAddBtn = () => {
        formValues['Username'] = "";
        formValues['mobile'] = "";
        formValues['email'] = "";
        formValues['Password'] = "";
        setShow(true)
        setShowUpdateBtn(false)
    }

    const copyImageBtn = async () => {
        var node = document.getElementById('table');
        htmlToImage.toJpeg(node)
            .then(function (dataUrl) {
                axios.post(Variables.LocalApiBaseUrl + 'base64_to_image', {
                    image: dataUrl,
                })
                    .then(function (response) {
                        console.log(response)

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            });


        copyImageToClipboard(
            'http://localhost:5000/images/image.jpg',
        )
            .then(() => {
                alert('Image Copied to clipBoard')
            })
            .catch((e) => {
                console.log('Error: ', e.message)
            })

        setImageShow(true)
    };


    return (
        <div >
            <Button variant="primary" onClick={onClickAddBtn}>
                Add
            </Button>
            <Button variant="primary" onClick={copyImageBtn}>
                Copy
            </Button>

            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <CommonInputBoxNew name="Username" label={"Username"} value={formValues} error={formErrors}
                            submitting={isSubmitting} validationType={Enum.ValidationType.Required} placeholder="User name"
                            onKeyDown={keyDownHandler} inputStyle={{ height: '50px', borderBottom: "1px solid rgb(203 30 30)", fontSize: '15px' }} />
                        <CommonInputBoxNew name="mobile" label={"mobile"} value={formValues} error={formErrors}
                            submitting={isSubmitting} validationType={Enum.ValidationType.Required} placeholder="Enter Mobile"
                            onKeyDown={keyDownHandler} inputStyle={{ height: '50px', borderBottom: "1px solid rgb(203 30 30)", fontSize: '15px' }} />
                        <CommonInputBoxNew name="email" label={"Email"} value={formValues} error={formErrors}
                            submitting={isSubmitting} validationType={Enum.ValidationType.Required} placeholder="Enter Email"
                            onKeyDown={keyDownHandler} inputStyle={{ height: '50px', borderBottom: "1px solid rgb(203 30 30)", fontSize: '15px' }} />

                        <CommonInputBoxNew name="Password" type={'password'} label={"Password"} value={formValues}
                            placeholder="Password" validationType={Enum.ValidationType.Required} error={formErrors}
                            submitting={isSubmitting} onKeyDown={keyDownHandler} inputStyle={{ height: '50px', borderBottom: "1px solid rgb(203 30 30)", fontSize: '15px' }} />

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <SubmitButton onClick={submitClickHandler} type="button" controlClass={showUpdateBtn === false ? "btn btn-primary" : "btn btn-warning"} style={{ width: '100px', fontSize: '15px' }}
                        name={showUpdateBtn === false ? "Save" : "Update"} isLoading={showButtonLoader} /> :

                </Modal.Footer>

            </Modal>

            <Modal
                show={imageShow}
                onHide={handleImageClose}
                backdrop="static"
                keyboard={false}
            >

                <Modal.Body>
                    <img
                        src="http://localhost:5000/images/image.jpg"
                        alt="Description of the image"
                        style={{ width: '100px', height: '100px' }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleImageClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            <table className="table" id='table' ref={targetRef}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col" onClick={() => handleSort('Username')}>UserName  {sortColumn === 'Username' && sortOrder === 'asc' && '▲'}{sortColumn === 'Username' && sortOrder === 'desc' && '▼'}</th>
                        <th scope="col" onClick={() => handleSort('email')}>Email {sortColumn === 'email' && sortOrder === 'asc' && '▲'}{sortColumn === 'email' && sortOrder === 'desc' && '▼'}</th>
                        <th scope="col" onClick={() => handleSort('mobile')}>Mobile {sortColumn === 'mobile' && sortOrder === 'asc' && '▲'}{sortColumn === 'mobile' && sortOrder === 'desc' && '▼'}</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{item.Username}</td>
                            <td>{item.email}</td>
                            <td>{item.mobile}</td>
                            <td onClick={() => deleteClickHandlar(index)}>Delete</td>
                            <td onClick={() => editClickHandlar(index)}>Edit</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div >
    )
}

export default Home