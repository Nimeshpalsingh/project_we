import React, { useState } from "react";

const CommonSearchInput = (props) => {

	const [searchText, setSearchText] = useState(props.value ?? "");

	const keyDownHandler = (e) => {
		if (e.which == 13) {
			searchClickHandler();
		}
	}

	const searchClickHandler = () => {
		if (props.onSearch) {
			props.onSearch(searchText.trim());
		}
	}

	const textChangeHandler = e => {
		setSearchText(e.target.value);
	}

	return (
		<div className={props.controlClass ?? "w-100 form-group common-search-input"} data-aos="zoom-in" data-aos-duration="1000" >
			{
				props.label &&
				<label>{props.label}</label>
			}
			<div className="right-icon-input">
				<input
					type="text"
					disabled={props.disabled}
					readOnly={props.readonly}
					value={searchText}
					className={props.inputClass ?? "form-control"}
					placeholder={props.placeholder ?? "Type here to search…"}
					onChange={textChangeHandler}
					onKeyDown={keyDownHandler}
				/>
				<button onClick={searchClickHandler}>
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
						<ellipse cx="10.6015" cy="9.88501" rx="9.10146" ry="8.88476" stroke="#ADB5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M16.9316 16.5259L20.4999 20.0002" stroke="#ADB5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>
			</div>
			<div className={props.messageClass}>
				<p>{props.message}</p>
			</div>
		</div>
	);
};

export default CommonSearchInput;
