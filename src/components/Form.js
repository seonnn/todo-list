import React from "react";

function Form({ value, setValue, handleSubmit }) {
  console.log("Form is Rendering");
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex pt-2">
      <input
        type="text"
        name="value"
        className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
        style={{ flex: "10", padding: "5px" }}
        placeholder="할 일을 입력해주세요."
        value={value}
        onChange={handleChange}
      />
      <input
        type="submit"
        value="입력"
        className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400"
      />
    </form>
  );
}

export default Form;
