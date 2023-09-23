import React, { useState, useEffect } from "react";
import * as Validation from '../../common/ValidatorFunction';
import * as Enum from '../../common/Enums'
const CommonInputBox = (props) => {

  const [inputType, setInputType] = useState(props.type);
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState(false)


  useEffect(() => {
    if (props.value != undefined && props.value[props.name] != undefined) {
      setInputValue(props.value[props.name]);     
    }

    if(props.submitting) {
      validateInput(inputValue);
    }
      
  }, [props])


  const textChangeHandler = (e) => {    
    validateInput(e.target.value);
    console.log(props.type)
  }

  const validateInput = (value) => {
    setInputValue(value)
    props.value[props.name] = value;
    if (props.type == 'Email') {
      if (!Validation.IsEmailValid(value)) {
        props.message[props.name] = `Enter Valid  ${props.name}`;
        setError(true)
      } else {
        props.message[props.name] = '';
        setError(false)
      }
    }
    else if (props.type == 'Password') {  
      if (!Validation.IsPasswordValid(value)) {
        props.message[props.name] = `Enter Valid  ${props.name}`;
        setError(true)
      } else {
        props.message[props.name] = '';
        setError(false)
      }
    }
    else if (props.type == 'Mobile') {
      console.log('dfgfg')
      if (Validation.IsPhoneValid(value) == false) {
        props.message[props.name] = `Enter Valid  ${props.name}`;
        setError(true)
      } else {
        props.message[props.name] = '';
        setError(false)
      }
    }
    else if (props.type == 'FullName') {
      if (Validation.IsFullNameValid(value) == false) {
        props.message[props.name] = `Enter Valid  ${props.name}`;
        setError(true)
      } else {
        props.message[props.name] = '';
        setError(false)
      }
    }
    else if (props.type == 'FullName') {
      if (Validation.IsEmailValid(value) == false) {
        props.message[props.name] = `Enter Valid  ${props.name}`;
        setError(true)
      } else {
        props.message[props.name] = '';
        setError(false)
      }
    }
  }


  const passwordhandler = () => {
    setInputType(inputType == "password" ? "text" : "password");
  }
  return (
    <div
      className={props.controlClass ?? "form-group"}
      data-aos="zoom-in"
      data-aos-duration="1000"
    >
      {
        props.label &&
        <label>{props.label}</label>
      }
      <div className={props.iconinputclassname}>
        <input
          {...props}
          name={props.name}
          className={props.inputClass ?? "form-control"}
          type={inputType}
          //defaultValue={props.initialvalue}
          disabled={props.disabled}
          onChange={textChangeHandler}
          value={inputValue}
          placeholder={props.placeholder}
          readOnly={props.readonly}

          // style={{border: props.message ? 'solid 1px red' : 'solid 1px black'}}
        />
        <span>
          <i className={props.iconclassname} onClick={passwordhandler}></i>
        </span>
      </div>
      <div className={props.messageClass}>
        <p> {error == false ? null : props.message[props.name]}</p>
      </div>
    </div>
  );
};

export default CommonInputBox;
