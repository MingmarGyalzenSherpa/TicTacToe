/* eslint-disable react/prop-types */
export default function InputField({ handleInput }) {
  return (
    <input
      onChange={(e) => handleInput(e.target.value)}
      className="name-input"
      type="text"
      placeholder="Enter your name"
    />
  );
}
