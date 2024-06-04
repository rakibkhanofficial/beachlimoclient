import React, { useState, useEffect, useRef, ReactNode, useMemo } from 'react';

interface SelectOption {
  value: string | number;
  children: ReactNode;
}

interface SelectProps {
  children: ReactNode;
  value?: string | number | null;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  showSearch?: boolean;
  allowClear?: boolean;
}

const CustomSelect: React.FC<SelectProps> & { Option: React.FC<SelectOption> } = ({
  children,
  value,
  onChange,
  placeholder = 'Select an option',
  showSearch = false,
  allowClear = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = useMemo(
    () =>
      React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<SelectOption>[],
    [children]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const filtered = options.filter((option) => {
      const children = option.props.children;
      return typeof children === 'string' && children.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredOptions(filtered.map((option) => option.props));
  }, [options, search]);

  const handleOptionClick = (optionValue: string | number) => {
    const event = {
      target: {
        value: optionValue.toString(),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange(event);
    setIsOpen(false);
  };

  const clearSelection = () => {
    const event = {
      target: {
        value: '',
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange(event);
  };

  const selectedOption = options.find((option) => option.props.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center justify-between px-4 py-2 bg-white border rounded cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-700 w-full">
          {selectedOption && selectedOption.props.children
            ? selectedOption.props.children
            : placeholder}
        </span>
        {allowClear && selectedOption && (
          <button
            className="ml-2 text-gray-500 hover:text-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              clearSelection();
            }}
          >
            &times;
          </button>
        )}
        <svg
          className={`w-4 h-4 fill-current transition-transform transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M5 8l5 5 5-5H5z" />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
          {showSearch && (
            <div className="px-4 py-2">
              <input
                type="text"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.children}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-700">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Option: React.FC<SelectOption> = ({ value, children }) => (
  <span>{children}</span>
);

CustomSelect.Option = Option;

export default CustomSelect;
