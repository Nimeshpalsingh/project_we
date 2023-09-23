import React from 'react'
import { FaSpinner } from 'react-icons/fa';
export const SubmitButton = (props) => {
    return (
        <button disabled={props.isLoading || props.disabled} onClick={props.onClick}className={props.controlClass} style={props.style}
            type={props.type} data-aos="zoom-in" data-aos-duration="1000"
        >{props.isLoading == true ?
            <FaSpinner icon="spinner" className="spinner" />
            :
            <>{props.name}</>
            }

        </button>
    )
}


