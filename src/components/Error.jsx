/* eslint-disable react/prop-types */
const Error = ({ children }) => {
  return (
    <div className=" text-center text-white bg-red-600 uppercase my-4 font-bold p-3">
      {children}
    </div>
  );
};

export default Error;
