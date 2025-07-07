// const DatePicker = ({ value, onChange }) => {
//   return (
//     <input
//       type="date"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="border p-2 rounded"
//     />
//   );
// };

// export default DatePicker;
// // 

const DatePicker = ({ value, onChange }) => {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border-2 border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    />
  );
};

export default DatePicker;