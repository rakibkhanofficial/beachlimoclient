import { createContext, useContext } from 'react'

interface SidebarContext {
  collapsed: boolean
  setCollapsed: () => void
}

export const SidebarContext = createContext<SidebarContext>({
  collapsed: false,
  setCollapsed: () => {
    console.log('setCollapsed is called')
  },
})

export const useSidebarContext = () => {
  return useContext(SidebarContext)
}
