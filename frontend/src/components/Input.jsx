/* eslint-disable react/prop-types */
export const InputBox = (props) => {
  return (
    <div>
      <div className="ml-16 font-medium">{props.label}</div>
      <input
        // ref={props.reference}
        placeholder={props.placeholder}
        type={props.type}
        onChange={props.onChange}
        className="ml-16 px-4 py-2 border border-gray-400 rounded my-2"
      />
    </div>
  );
};