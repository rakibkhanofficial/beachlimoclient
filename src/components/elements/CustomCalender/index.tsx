import React, { useState, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalenderformatDate } from "./formateDate";

interface CalendarProps {
  defaultValue?: string;
  maxValue?: Date;
  onChange?: (date: Date, formattedDate: string) => void;
  disablePastDates?: boolean;
  label?: string;
}

const CustomCalendar: React.FC<CalendarProps> = ({
  defaultValue = CalenderformatDate(new Date(), "YYYY-MM-DD"),
  maxValue = new Date(2100, 11, 31),
  onChange,
  disablePastDates = false,
  label,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date(defaultValue));
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"date" | "month" | "year">("date");
  const calendarRef = useRef<HTMLDivElement>(null);

  const today = useMemo(() => new Date(), []);

  const formatDate = useCallback((date: Date, format = "default"): string => {
    if (format === "YYYY-MM-DD") {
      return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    }
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }, []);

  const handleDateChange = (newDate: Date) => {
    if (newDate <= maxValue && (!disablePastDates || newDate >= today)) {
      setCurrentDate(newDate);
      onChange?.(newDate, formatDate(newDate, "YYYY-MM-DD"));
      setIsOpen(false);
    }
  };

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const renderDateView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    return (
      <div className="grid grid-cols-7 gap-1 text-base text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-center w-[50%] font-semibold">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const date = new Date(year, month, day);
          const isDisabled =
            date > maxValue || (disablePastDates && date < today);
          const isToday = date.toDateString() === today.toDateString();
          const isSelected = date.toDateString() === currentDate.toDateString();

          return (
            <motion.button
              key={day}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDateChange(date)}
              disabled={isDisabled}
              className={`rounded-full w-[50%] text-sm p-[0.2rem] ${
                isDisabled
                  ? "text-gray-400"
                  : isSelected
                  ? "bg-blue-500 text-white"
                  : isToday
                  ? "border-2 border-blue-500 text-blue-500"
                  : "hover:bg-blue-100 hover:text-black"
              }`}
            >
              {day}
            </motion.button>
          );
        })}
      </div>
    );
  };

  const renderMonthView = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return (
      <div className="grid grid-cols-3 gap-1 text-sm">
        {months.map((month, index) => (
          <motion.button
            key={month}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCurrentDate(new Date(currentDate.setMonth(index)));
              setView("date");
            }}
            className="rounded-full p-1 hover:bg-blue-100"
          >
            {month}
          </motion.button>
        ))}
      </div>
    );
  };

  const renderYearView = () => {
    const currentYear = currentDate.getFullYear();
    const years = Array.from({ length: 12 }, (_, i) => currentYear - 5 + i);

    return (
      <div className="grid grid-cols-3 gap-1 text-sm">
        {years.map((year) => (
          <motion.button
            key={year}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCurrentDate(new Date(currentDate.setFullYear(year)));
              setView("month");
            }}
            className="rounded-full p-1 hover:bg-blue-100"
          >
            {year}
          </motion.button>
        ))}
      </div>
    );
  };

  const changeYear = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() + delta);
    setCurrentDate(newDate);
  };

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const resetToToday = () => {
    setCurrentDate(new Date());
    setView("date");
  };

  return (
    <div className="relative">
      {label && (
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          title="date"
          type="text"
          readOnly
          value={formatDate(currentDate)}
          className="w-full bg-gray-100 dark:bg-zinc-800 border text-black dark:text-gray-100 border-gray-100 dark:border-zinc-900 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          onClick={() => setIsOpen(!isOpen)}
        />
        <button
          title="open"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute inset-y-0 right-0 px-3 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={calendarRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 mt-1 bg-white dark:bg-zinc-800 border text-black dark:text-white dark:border-zinc-800 border-gray-300 rounded-lg shadow-lg min-w-[200px] w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => changeYear(-1)}
                className="px-1 py-1 rounded hover:bg-gray-100 text-black dark:text-white dark:hover:bg-zinc-700"
              >
                &lt;&lt;
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => changeMonth(-1)}
                className="px-1 py-1 rounded hover:bg-gray-100 text-black dark:text-white dark:hover:bg-zinc-700"
              >
                &lt;
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView(view === "date" ? "month" : "year")}
                className="px-1 py-1 rounded hover:bg-gray-100 text-black dark:text-white dark:hover:bg-zinc-700"
              >
                {view === "date"
                  ? `${currentDate.toLocaleString("default", {
                      month: "long",
                    })} ${currentDate.getFullYear()}`
                  : view === "month"
                  ? currentDate.getFullYear()
                  : `${currentDate.getFullYear() - 5} - ${
                      currentDate.getFullYear() + 6
                    }`}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => changeMonth(1)}
                className="px-1 py-1 rounded hover:bg-gray-100 text-black dark:text-white dark:hover:bg-zinc-700"
              >
                &gt;
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => changeYear(1)}
                className="px-1 py-1 rounded hover:bg-gray-100 hover:text-white dark:hover:text-white text-black dark:text-white dark:hover:bg-zinc-700"
              >
                &gt;&gt;
              </motion.button>
            </div>
            <div className="bg-gray-100 dark:bg-zinc-800 p-1 text-center text-black dark:text-white rounded-lg overflow-x-auto">
              {view === "date" && renderDateView()}
              {view === "month" && renderMonthView()}
              {view === "year" && renderYearView()}
            </div>
            <div className="mt-4 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetToToday}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-blue-600 text-sm"
              >
                Today
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCalendar;

// out of this Custom Calender componeent

// export const DemoComponenet = () => {
//   const [selecteddate, setSelecteddate] = useState<string | undefined>(
//     new Date().toISOString().split("T")[0]
//   );
//   const handleDateChange = (date: Date, formattedDate: string) => {
//     setSelecteddate(formattedDate);
//   };
//   return (
//     <div className="w-full">
//       <CustomCalendar
//         maxValue={new Date(2025, 11, 31)}
//         onChange={handleDateChange}
//         disablePastDates={false}
//       />
//     </div>
//   );
// };
