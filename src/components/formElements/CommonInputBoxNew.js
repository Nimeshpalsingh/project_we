import React, { useState, useEffect } from "react";

import * as Validation from '../../common/ValidatorFunction';
import * as Enum from '../../common/Enums';


const CommonInputBoxNew = (props) => {

	const [inputType, setInputType] = useState(props.type);
	const [inputValue, setInputValue] = useState('');
	const [inputRef, setInputRef] = useState();

	const [error, setError] = useState(false);

	const setControlRef = ref => {
		setInputRef(ref);
		if (props.refs) {
			props.refs[props.name] = ref;
		}
	}

	useEffect(() => {
		if (props.value != undefined && props.value[props.name] != undefined) {
			setInputValue(props.value[props.name]);
		}

		if (props.submitting) {
			validateInput(inputValue);
		}
	}, [props])


	const textChangeHandler = (e) => {
		if (props.maxLength != undefined && e.target.value.length > props.maxLength) {
			return true;
		}
		validateInput(e.target.value);
		if (props.onTextChanged) {
			props.onTextChanged(e.target.value);
		}
	}

	const passwordhandler = () => {
		setInputType(inputType == "password" ? "text" : "password");
	}

	const validateInput = (value) => {
		setInputValue(value)

		props.value[props.name] = value;
		if (props.validationType == Enum.ValidationType.Email) {
			if (value != '' && !Validation.IsEmailValid(value)) {
				props.error[props.name] = 'Required / Invalid';
				setError(true)
			} else {
				props.error[props.name] = '';
				setError(false)
			}
		}
		else if (props.validationType == Enum.ValidationType.EmailRequired) {
			if (!Validation.IsEmailValid(value)) {
				props.error[props.name] = 'Required / Invalid';
				setError(true)
			} else {
				props.error[props.name] = '';
				setError(false)
			}
		}

		else if (props.validationType == Enum.ValidationType.Password) {
			if (!Validation.IsPasswordValid(value)) {
				props.error[props.name] = 'Required / Invalid';
				setError(true)
			} else {
				props.error[props.name] = '';
				setError(false)
			}
		}
		else if (props.validationType == Enum.ValidationType.MobileRequired) {
			if (!Validation.IsPhoneValid(value)) {
				props.error[props.name] = 'Required / Invalid';
				setError(true)
			} else {
				props.error[props.name] = '';
				setError(false)
			}
		}
		else if (props.validationType == Enum.ValidationType.Mobile) {
			if (value != '' && Validation.IsPhoneValid(value) == false) {
				props.error[props.name] = 'Required / Invalid';
				setError(true)
			} else {
				props.error[props.name] = '';
				setError(false)
			}
		}
		else if (props.validationType == Enum.ValidationType.Required) {
			if (Validation.IsFullNameValid(value) == false) {
				props.error[props.name] = 'Required / Invalid';
				setError(true)
			} else {
				props.error[props.name] = '';
				setError(false)
			}
		}

		if (props.compareWith) {	
			if (props.compareOperator == undefined || props.compareOperator === '=') {
				if (value != props.value[props.compareWith]) {
					props.error[props.name] = 'Not Matching';
					setError(true);
				} else {
					props.error[props.name] = '';
					setError(false);
				}
			}
		}

	}

	return (
		<div className={props.controlClass ?? "form-group"} >
			{
				props.label &&
				<div className="d-flex justify-content-between"  style={{ color: 'white' }}>
					<label style={{fontSize: '15px' , color: 'white'}}>{props.label}</label>
					{
						error === true &&
						<div style={{ color: 'red' , fontSize: '12px' }}>
							<p>{props.error[props.name]}</p>
						</div>
					}
				</div>
			}
			<div className={(props.inputContainerClass ?? " ") + (props.name.toLowerCase().indexOf('password', 0) > -1 ? "right-icon-input" : "")}>
				<input
					{...props}
					ref={ref => setControlRef(ref)}
					name={props.name}
					type={inputType}
					className={props.inputClass ?? "form-control"}
					disabled={props.disabled}
					onChange={textChangeHandler}
					value={inputValue}
					placeholder={props.placeholder}
					autoComplete={props.autoComplete ?? "new-" + props.name}
					style={{ border: props.error[props.name] ? 'solid 1px red' : 'solid 1px white' , ...props.inputStyle } }
				/>
				{
					props.name.toLowerCase().indexOf('password', 0) > -1 &&
					<span className="cursor-pointer mt5 mr5">
						<i className={props.iconClassName ? props.iconClassName :
							(props.name != undefined && props.name.toLowerCase().indexOf('password', 0) > -1 ? (inputType == "password" ? "fas fa-eye" : "fas fa-eye-slash") : "")}
							onClick={passwordhandler}></i>
					</span>
				}
			</div>
		</div>
	);
};

export default CommonInputBoxNew;
