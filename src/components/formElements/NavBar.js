import moment from 'moment';
import React, { useEffect } from 'react'
import { FaLock, FaSignOutAlt, FaUndo } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import Variables from '../../common/Variables';
function NavBar() {

    const navigate = useNavigate()
    let dispatch = useDispatch();
    const loginData = useSelector((state) => state.login);
    console.log(loginData.LoginData.length);


    useEffect(() => {
        if (loginData.LoginData.length === 0) {
            debugger;
            window.location.href = Variables.BaseUrl;
        }
    }, [])


    const logoutClickHandler = () => {
        // const response = confirm("Are you sure you want to logout?");

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout ',
            width: 400,
            customClass: {
                container: 'scale'
            }
        }).then((result) => {
            if (result.isConfirmed) {       
                navigate('/');
                dispatch({
                    type: 'LOGIN',
                    LoginData: []

                });
            }
        })

    }

    const refreshClickHandler = () => {
        window.location.reload();
    }



    const changePasswordClickHandler = () => {

        navigate('/changepassword');
    }



    return (
        <nav className="navbar navbar-light bg-warning ">
            <div className='col-6  float-left ' >
                <p style={{ textAlign: "left", fontSize: '14px', marginLeft: '12px' }} > Welcome {loginData?.LoginData?.Data?.UserName} <br /> <p className='text-danger'> Expiry Date : {moment(loginData?.LoginData?.Data?.ExpiryDate).format('DD MMM YYYY')}</p>  </p>
            </div>
            <div className='col-6  float-right d-flex justify-content-end  ' >
                <FaLock onClick={() => { changePasswordClickHandler() }} size={20} color='black' style={{ width: '50px' }} />
                <FaUndo onClick={() => { refreshClickHandler() }} size={20} color='blue' style={{ width: '50px' }} />
                <FaSignOutAlt onClick={() => { logoutClickHandler() }} size={20} color='red' style={{ width: '60px' }} />
            </div>
        </nav >
    )
}

export default NavBar