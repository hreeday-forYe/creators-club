import React from 'react';
import ReactLoading from 'react-loading';
const Loader = () => {
  return (
    <div className="flex items-center justify-center top-6">
      <ReactLoading
        type={'bars'}
        color={'#222341'}
        height={'20%'}
        width={'20%'}
      />
    </div>
  );
};

export default Loader;
