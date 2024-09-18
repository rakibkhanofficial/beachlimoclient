import React from 'react'
import { useAllProductSidebarContext } from '../Allcars/sidebar/sidebar-contex'

export const RooNavbarBurguerButton = () => {
  const { collapsed, setCollapsed } = useAllProductSidebarContext()

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
