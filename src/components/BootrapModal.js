import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Variables from "../common/Variables"
import * as Enum from '../common/Enums'
import Modal from 'react-bootstrap/Modal';
import CommonInputBoxNew from './formElements/CommonInputBoxNew';
import { SubmitButton } from './formElements/SubmitButton';

function BootstrapModal() {
    const [show, setShow] = useState(false);

    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [formRefs, setFormRefs] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showButtonLoader, setShowButtonLoader] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [addData, setAddData] = useState([]);

    // Function to load data from localStorage
    const loadStoredData = () => {
        const storedData = JSON.parse(localStorage.getItem('data'));
        if (storedData) {
            setAddData(storedData);
        }
    };

    useEffect(() => {
        loadStoredData();
    }, []);



    const loginClickHandler = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            login();
        }, 50);
    }

    const login = async () => {
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
        // console.log(JSON.parse(formValues));
        const updatedData = [...addData, formValues];

        // Update state and localStorage
        localStorage.setItem('data', JSON.stringify(updatedData));
        const storedData = JSON.parse(localStorage.getItem('data'));
        setAddData(storedData);
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
                loginClickHandler();
            }
        }
    }



    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add
            </Button>

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

                    <SubmitButton onClick={loginClickHandler} type="button" controlClass={"btn btn-primary "} style={{ width: '100px', fontSize: '15px' }}
                        name="Sign In" isLoading={showButtonLoader} />
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BootstrapModal;