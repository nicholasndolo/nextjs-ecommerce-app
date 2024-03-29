


export default function SelectComponent({ label, value, onChange, options = []}){
  return (
    <div className="relative">
     <p className="absolute py-0 px-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white">{label}</p>
     <select
      value={value}
      onChange={onChange}
      className="border placeholder-gray-400 focus:outline-none focus:border-green-500 w-full p-4 mx-0 mt-0 text-base block bg-white border-gray-300 rounded-md"
       >
        {options && options.length? ( 
          options.map((optionItem) => (
            <option
              id={optionItem.id}
              value={optionItem.id}
              key={optionItem.id}
            >
              {optionItem.label}
            </option>
          ))
        ) : ( 
          <option id="" value={""}>
            Select
          </option>
        )}
     </select>
  </div>
  )
}