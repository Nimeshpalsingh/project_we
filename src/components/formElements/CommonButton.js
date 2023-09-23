import React from "react";

const CommonButton = (props) => {
  return (
    <>
    <button
      onClick={props.onClick}
      className={props.controlClass}
      type={props.type}
      data-aos="zoom-in"
      data-aos-duration="1000"
    >
        {/* <i class={props.leftIconClass}></i> */}
        {props.name}
    </button>
    </>
  );
};

export default CommonButton;
