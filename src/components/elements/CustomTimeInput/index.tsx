import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@nextui-org/react'

interface TimeInputProps {
  defaultTime?: string
  onChange?: (time: { hours24: string; hours12: string }) => void
}

const CustomTimeInput: React.FC<TimeInputProps> = ({ defaultTime, onChange }) => {
  const [hours, setHours] = useState(['', ''])
  const [minutes, setMinutes] = useState(['', ''])
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (defaultTime) {
      const [time, timePeriod] = defaultTime.split(' ')
      const [defaultHours, defaultMinutes] = time.split(':')
      let periodValue: 'AM' | 'PM' = timePeriod as 'AM' | 'PM'
      let hoursNum = parseInt(defaultHours, 10)

      if (hoursNum >= 12) {
        periodValue = 'PM'
        if (hoursNum > 12) hoursNum -= 12
      } else if (hoursNum === 0) {
        hoursNum = 12
        periodValue = 'AM'
      }

      const hourDigits = hoursNum.toString().padStart(2, '0').split('')
      setHours(hourDigits)
      setMinutes(defaultMinutes.split(''))
      setPeriod(periodValue)
    }
  }, [defaultTime])

  useEffect(() => {
    if (onChange) {
      const hours24 = convertTo24Hour(hours.join(''), minutes.join(''), period)
      onChange({
        hours24,
        hours12: `${hours.join('')}:${minutes.join('')} ${period}`,
      })
    }
  }, [hours, minutes, period, onChange])

  const convertTo24Hour = (h: string, m: string, p: string): string => {
    let hours = parseInt(h, 10)
    if (p === 'PM' && hours !== 12) {
      hours += 12
    } else if (p === 'AM' && hours === 12) {
      hours = 0
    }
    return `${hours.toString().padStart(2, '0')}:${m}`
  }

  const handleInputChange = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    maxValue: number,
  ) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      setter((prev) => {
        const newValues = [...prev]
        newValues[index] = value
        const fullValue = parseInt(newValues.join(''), 10)
        if (fullValue > maxValue) {
          setError(`Value cannot be greater than ${maxValue}`)
        } else {
          setError(null)
        }
        return newValues
      })
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    prevInput: HTMLInputElement | null,
  ) => {
    if (e.key === 'Backspace' && index === 1 && (e.target as HTMLInputElement).value === '') {
      e.preventDefault()
      setter((prev) => ['', prev[0]])
      prevInput?.focus()
    }
  }

  const togglePeriod = () => {
    setPeriod((prev) => (prev === 'AM' ? 'PM' : 'AM'))
  }

  return (
    <div className="flex flex-col items-center gap-2 p-2 bg-white rounded-md shadow-sm border border-gray-200">
      <div className="flex items-center gap-1">
        {hours.map((hour, index) => (
          <Input
            key={`hour-${index}`}
            value={hour}
            onChange={(e) => handleInputChange(index, e.target.value, setHours, 12)}
            onKeyDown={(e) =>
              handleKeyDown(
                e,
                index,
                setHours,
                index === 1 ? (document.getElementById('hour-0') as HTMLInputElement) : null,
              )
            }
            className="w-[2.2rem] h-8 text-center text-sm font-medium bg-gray-50 rounded focus:ring-1 focus:ring-blue-400"
            aria-label={`Hour Digit ${index + 1}`}
            maxLength={1}
            type="text"
            inputMode="numeric"
            id={`hour-${index}`}
          />
        ))}
        <span className="text-lg font-medium text-gray-600">:</span>
        {minutes.map((minute, index) => (
          <Input
            key={`minute-${index}`}
            value={minute}
            onChange={(e) => handleInputChange(index, e.target.value, setMinutes, 59)}
            onKeyDown={(e) =>
              handleKeyDown(
                e,
                index,
                setMinutes,
                index === 1 ? (document.getElementById('minute-0') as HTMLInputElement) : null,
              )
            }
            className="w-[2.2rem] h-8 text-center text-sm font-medium bg-gray-50 rounded focus:ring-1 focus:ring-blue-400"
            aria-label={`Minute Digit ${index + 1}`}
            maxLength={1}
            type="text"
            inputMode="numeric"
            id={`minute-${index}`}
          />
        ))}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={togglePeriod}
          className="ml-1 px-2 py-1 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition duration-150"
        >
          {period}
        </motion.button>
      </div>
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  )
}

export default CustomTimeInput
