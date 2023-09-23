import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; // You can install 'react-spinners' package

const Loader = () => {
  return (
    <div className="loader">
      <ClipLoader color={'yellow'} loading={true}  size={50} />
    </div>
  );
};

export default Loader;
