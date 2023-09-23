import React, { useEffect, useState } from "react";

const CommonCheckbox = (props) => {

	const [checkedValue, setCheckedValue] = useState(false)

	useEffect(() => {
		if (props.value[props.name] == undefined) {
			props.value[props.name] = false
			setCheckedValue(false);
		} else {
			setCheckedValue(props.value[props.name]);
		}
	}, [props])

	const checkClickHandler = (e) => {
		e.preventDefault();
		props.value[props.name] = !checkedValue
		setCheckedValue(!checkedValue);
	}

	const anchorClickHandler = (e) => {
		if (e.which != undefined && e.which == 32) {
			checkClickHandler(e);
		}
	}

	return (
		<div className="form-group">
			<label>{props.label}</label>
			<a className="inline-block h25" href="" onClick={checkClickHandler} onKeyDown={anchorClickHandler}>
				<label className="text-switch">
					<input type="checkbox"
						value={checkedValue}
						name={props.name}
						checked={checkedValue}
						defaultChecked={checkedValue}
						onClick={checkClickHandler}
					/>
					<div className="slider"></div>
				</label>
			</a>
		</div>
	);
};

export default CommonCheckbox;

