import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; 

const Loader = () => {
  return (
    <div className="loader">
      <ClipLoader color={'black'} loading={true}  size={50} />
    </div>
  );
};

export default Loader;
