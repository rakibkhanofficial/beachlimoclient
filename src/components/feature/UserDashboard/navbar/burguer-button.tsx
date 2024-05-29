import React from 'react'
import { useSidebarContext } from '../layout/layout-context'

export const BurguerButton = () => {
  const { collapsed, setCollapsed } = useSidebarContext()

  return (
    <div
      className={`absolute flex flex-col justify-around w-6 h-6 bg-transparent border-none cursor-pointer padding-0 z-[202] focus:outline-none ${
        collapsed ? 'open' : ''
      }`}
      onClick={setCollapsed}
    >
      <div className="w-6 h-px bg-default-900 rounded-xl transition-all relative origin-[1px]"></div>
      <div className="w-6 h-px bg-default-900 rounded-xl transition-all relative origin-[1px]"></div>
    </div>
  )
}
