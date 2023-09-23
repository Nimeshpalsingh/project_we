import React, { useEffect, useState } from "react";

const CommonRadio = (props) => {
	const [checkedValue, setCheckedValue] = useState(1)

	useEffect(() => {
		if (props.value[props.name] == undefined) {
			setCheckedValue(1);
		} else {
			setCheckedValue(props.value[props.name])
		}
	}, [props])

	const radioClickHandler = (value) => {
		props.value[props.name] = value;
		setCheckedValue(value);
	}
	return (
		<div className="form-group">
			<label>{props.label}</label>
			<div className="form-control inline-radio">
				{
					props.radioData.map((item, index) => {
						return (
							<label className={props.controlClass ?? "custom-radio me-3"}>
								{item.name}
								<input type="radio" name={props.name} onClick={() => radioClickHandler(item.id)} checked={checkedValue == item.id} />
								<span className={props.ClassName ?? "checkmark"}></span>
							</label>
						);
					})
				}
			</div>
		</div>
	);
};

export default CommonRadio;
