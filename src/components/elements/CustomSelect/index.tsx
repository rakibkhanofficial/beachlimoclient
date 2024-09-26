import React, { useState, useEffect, useRef, ReactNode, useMemo } from "react";
import { FaChevronDown, FaTimes, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface SelectOption {
  value: string | number | boolean;
  children: ReactNode;
}

interface SelectProps {
  children: ReactNode;
  value?: string | number | boolean | null;
  onChange: (value: string | number | boolean) => void;
  placeholder?: string;
  showSearch?: boolean;
  allowClear?: boolean;
  isLoading?: boolean;
}

const CustomSelect: React.FC<SelectProps> & {
  Option: React.FC<SelectOption>;
} = ({
  children,
  value,
  onChange,
  placeholder = "Select an option",
  showSearch = false,
  allowClear = false,
  isLoading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = useMemo(
    () =>
      React.Children.toArray(children).filter(
        React.isValidElement,
      ) as React.ReactElement<SelectOption>[],
    [children],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const filtered = options.filter((option) => {
      const children = option.props.children;
      return (
        typeof children === "string" &&
        children.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredOptions(filtered.map((option) => option.props));
  }, [options, search]);

  const handleOptionClick = (optionValue: string | number | boolean) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  const selectedOption = options.find((option) => option.props.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm transition-all duration-200 dark:bg-zinc-800 ${
          isOpen
            ? "border-transparent ring-1 ring-blue-500"
            : "hover:border-gray-400"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="w-full truncate text-gray-700 dark:text-gray-300">
          {selectedOption && selectedOption.props.children
            ? selectedOption.props.children
            : placeholder}
        </span>
        <div className="flex items-center">
          {isLoading && (
            <FaSpinner className="mr-2 h-3 w-3 animate-spin text-gray-400" />
          )}
          {allowClear && selectedOption && (
            <motion.button
              className="mr-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={clearSelection}
              whileHover={{ scale: 0.9 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes className="h-3 w-3" />
            </motion.button>
          )}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaChevronDown className="h-3 w-3 text-gray-400" />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-zinc-800"
          >
            {showSearch && (
              <div className="border-b border-gray-200 px-4 py-2  dark:border-gray-700">
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-transparent  focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-200"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            )}
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    className="cursor-pointer px-4 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-slate-200 dark:text-gray-200 dark:hover:bg-gray-700"
                    onClick={() => handleOptionClick(option.value)}
                  >
                    {option.children}
                  </motion.div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No options found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Option: React.FC<SelectOption> = ({ value, children }) => (
  <span>{children}</span>
);

CustomSelect.Option = Option;

export default CustomSelect;

// example of its use Case

// import React, { useState } from 'react';
// import CustomSelect from './CustomSelect';

// function App() {
//   const [value, setValue] = useState<string | number | boolean | null>(null);

//   return (
//     <CustomSelect
//       value={value}
//       onChange={(newValue) => setValue(newValue)}
//       placeholder="Select an option"
//       showSearch={true}
//       allowClear={true}
//       isLoading={false}
//     >
//       <CustomSelect.Option value="string_value">String Option</CustomSelect.Option>
//       <CustomSelect.Option value={42}>Number Option</CustomSelect.Option>
//       <CustomSelect.Option value={true}>Boolean Option</CustomSelect.Option>
//     </CustomSelect>
//   );
// }

// export default App;
