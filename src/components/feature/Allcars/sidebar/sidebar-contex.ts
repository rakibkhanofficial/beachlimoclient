import { createContext, useContext } from 'react'

interface SidebarContext {
  collapsed: boolean
  setCollapsed: () => void
}

export const AllproductSidebarContext = createContext<SidebarContext>({
  collapsed: false,
  setCollapsed: () => {
    console.log('setCollapsed is called')
  },
})

export const useAllProductSidebarContext = () => {
  return useContext(AllproductSidebarContext)
}
