import React, { useEffect, useState } from "react";

import * as Validation from '../../common/ValidatorFunction';
import * as Enum from '../../common/Enums'

const CommonTextArea = (props) => {

	const [inputValue, setInputValue] = useState('')
	const [error, setError] = useState(false)

	useEffect(() => {
		if (props.value != undefined && props.value[props.name] != undefined) {
			setInputValue(props.value[props.name]);
		}
		if (props.submitting) {
			validateInput(inputValue);
		}

	}, [props])

	const textChangeHandler = (e) => {
		validateInput(e.target.value);
		props.value[props.name] = e.target.value
	}

	const validateInput = (value) => {
		setInputValue(value);
		console.log(value)
		if (props.validationType == Enum.ValidationType.Required) {
			if (Validation.IsFullNameValid(value) == false) {
				props.error[props.name] = `Enter Valid  ${props.name}`;
				setError(true)
			} else {
				props.error[props.name] = '';
				setError(false)
			}
		}
	}

	return (
		<div className={props.controlClass ?? "form-group"} >
			{
				props.label &&
				<div className="d-flex justify-content-between">
					<label>{props.label}</label>
					<div className="message error">
						<p>{error == false ? null : 'Required / Invalid'}</p>
					</div>
				</div>
			}
			<textarea
				className={props.inputClass ?? "form-control"}
				// disabled={props.disabled}
				name={props.Name}
				onChange={textChangeHandler}
				value={inputValue}
				placeholder={props.placeholder}
				// readOnly={props.readonly}
				// rows={props.rows}
				style={{ border: props.error[props.name] ? 'solid 1px red' : 'solid 1px white' }}
			/>
		</div>
	);
};

export default CommonTextArea;
