import React from 'react';
import { Triangle } from 'react-loader-spinner';

const Loader = () => {
  const loaderContainerStyle = {
   
  };

  return (
    <div style={loaderContainerStyle}>
      <Triangle
        height={80}
        width={80}
        color="rgb(239, 86, 86)"
        ariaLabel="triangle-loading"
        wrapperStyle={{ position: 'fixed',
        top: "0",
        left: "0",
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: "9999",}}
        visible={true}
      />
    </div>
  );
};

export default Loader;
