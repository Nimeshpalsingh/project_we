import React, { useEffect, useState } from "react";
import * as Validation from '../../common/ValidatorFunction';
import * as Enum from '../../common/Enums'

const CommonSelect = (props) => {

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
			if (value == '') {
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
				<label>{props.label}</label>
			}

			<select
				className={props.inputClass ?? "form-control form-select"}
				disabled={props.disabled}
				onChange={textChangeHandler} name={props.name}
				style={{ border: props.error[props.name] ? 'solid 1px red' : 'solid 1px white' }}
			>
				<option style={{ backgroundColor: '#581b4e' }} >Select User Type  </option>
				{props.pickerData.map((items, index) => {
					return (
						<option key={index} style={{ backgroundColor: '#581b4e' }} selected={items.id == inputValue} value={items.id}>{items.name}</option>)
				})}
			</select>

			<div className={props.messageClass}>
				<p> {error == false ? null : props.error[props.name]}</p>
			</div>
		</div>
	);
};

export default CommonSelect;
