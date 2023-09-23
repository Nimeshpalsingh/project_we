import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CommonInputBoxNew from '../components/formElements/CommonInputBoxNew'
import { SubmitButton } from '../components/formElements/SubmitButton';
import Swal from 'sweetalert2'

import * as Enum from '../common/Enums'
import Cookies from "universal-cookie";

import * as myloginAction from '../store/action/login';
import NavBar from '../components/formElements/NavBar';
import Variables from '../common/Variables';
import { loginValidation } from '../common/Globle';
function ChangePassword() {

    const loginData = useSelector((state) => state.login);
    // console.log(loginData.LoginData.Data.UserID
    // );
    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [formRefs, setFormRefs] = useState({});
    const [error, setError] = useState('');

    const [showButtonLoader, setShowButtonLoader] = useState(false)
    const [loginError, setLoginError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const cookies = new Cookies();


    const changePasswordClickHandler = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            changePassword();
        }, 50);
    }

    const changePassword = async () => {

        setError('');
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
        formValues['UserID'] = loginData.LoginData.Data.UserID;
        formValues['Passptr'] = loginData.LoginData.Data.DeviceID;
        setShowButtonLoader(true);
        const apiData = await myloginAction.changePassword(formValues);
        console.log(apiData)
        if (apiData.Status === "Error") {
            setError(apiData.Message)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: apiData.Message,
                width: 400,
                customClass: {
                    container: 'scale'
                }


            })


        }

        if (apiData.Status == "Success") {
            Swal.fire(
                'Password Change!',
                'Password Change successfully',
                'success',
                {
                    width: 400,
                    customClass: {
                        container: 'scale'
                    }
                }

            )
            navigate('/');
            dispatch({
                type: 'LOGIN',
                LoginData: []

            });

            setShowButtonLoader(false);
            setIsSubmitting(false);
            navigate('/');

        } else {
            setShowButtonLoader(false);
            setIsSubmitting(false);
            // setLoginError(apiData.Message);
            setError(apiData.Message)
        }

    }



    const keyDownHandler = (e, name) => {
        if (e.which === 13) {
            if (name === 'Username') {
                formRefs['Password'].focus();
            } else if (name === 'Password') {
                changePasswordClickHandler();
            }
        }
    }


    const cancelClickHandler = () => {
        navigate('/events');
    }


    return (
        <>
            <NavBar />
            <div className='container'>

                <div className='row'>
                    <div className='col-md-4 m-auto mt-5 '>
                        {/* <div style={{ textAlign: "center" }}>
                        <img className="rounded" src={`${Variables.BaseUrl}/assets/images/logo.png`} alt="Card image cap" style={{ width: "150px", height: "150px" }} />
                    </div> */}
                        {/* <p style={{ color: 'red' }} >{error}</p> */}
                        <div className='col-md-12' style={{ marginTop: '100px', }}>
                            <CommonInputBoxNew name="OldPassword" label={"Old Password"} value={formValues} error={formErrors}
                                submitting={isSubmitting} validationType={Enum.ValidationType.Required} placeholder="Old Password"
                                onKeyDown={keyDownHandler} type={'password'} inputStyle={{ height: '50px', borderBottom: "1px solid rgb(203 30 30)", fontSize: '15px' }} />

                            <CommonInputBoxNew name="NewPassword" label={"New Password"} value={formValues}
                                placeholder="New Password" validationType={Enum.ValidationType.Password} error={formErrors}
                                submitting={isSubmitting} onKeyDown={keyDownHandler} type={'password'} inputStyle={{ height: '50px', borderBottom: "1px solid rgb(203 30 30)", fontSize: '15px' }} />

                            <CommonInputBoxNew name="ConfirmPassword" label={"Confirm Password"} value={formValues} compareWith="NewPassword"
                                placeholder="Password" validationType={Enum.ValidationType.Password} error={formErrors}
                                submitting={isSubmitting} onKeyDown={keyDownHandler} type={'password'} inputStyle={{ height: '50px', borderBottom: "1px solid rgb(203 30 30)", fontSize: '15px' }} />

                            <div class="row justify-content-evenly">
                                <div class="col-6 text-center">
                                    <SubmitButton
                                        onClick={changePasswordClickHandler}
                                        type="button"
                                        controlClass="btn btn-primary mt-3"
                                        style={{ height: '40px', fontSize: '15px' }}
                                        name="ChangePassword"
                                        isLoading={showButtonLoader}
                                    />
                                </div>
                                <div class="col-6 text-center">
                                    <SubmitButton
                                        onClick={cancelClickHandler}
                                        type="button"
                                        controlClass="btn btn-primary mt-3"
                                        style={{ height: '40px', fontSize: '15px' }}
                                        name="Cancel"
                                        isLoading={showButtonLoader}
                                    />
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword