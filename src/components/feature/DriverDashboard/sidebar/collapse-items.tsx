import React from 'react'
import { MdExpandMore } from 'react-icons/md'
import { Accordion, AccordionItem } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebarContext } from '../layout/layout-context'

interface Props {
  icon: React.ReactNode
  title: string
  items: { title: string; href: string }[]
  isActive: boolean
}

export const CollapseItems = ({ icon, items, title, isActive }: Props) => {
  const pathname = usePathname()
  const { setCollapsed } = useSidebarContext()

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed()
    }
  }

  return (
    <div className="flex gap-4 h-full transition-all items-center cursor-pointer">
      <Accordion className="px-0">
        <AccordionItem
          indicator={<MdExpandMore />}
          classNames={{
            indicator: `data-[open=true]:-rotate-180 ${isActive ? 'text-white' : 'text-default-900'}`,
            trigger: `py-0 min-h-[44px] ${
              isActive ? 'bg-[#a10a95]' : 'hover:bg-default-100'
            } rounded-xl active:scale-[0.98] transition-transform pr-3.5`,
            title: `px-0 flex gap-2 ${
              isActive ? 'text-white' : ' text-default-900'
            } h-full items-center text-sm cursor-pointer`,
          }}
          aria-label="Accordion 1"
          title={
            <div
              className={`flex gap-1 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl text-sm cursor-pointer transition-all active:scale-[0.98]'`}
            >
              {icon}
              <span>{title}</span>
            </div>
          }
        >
          <div className="pl-4">
            {items.map((item, index) => (
              <div key={index} className="flex border-l items-center border-slate-400 ">
                <div className="h-[1px] w-4 bg-slate-400"></div>
                <Link
                  href={item.href}
                  key={index}
                  onClick={handleClick}
                  className={`w-full ${
                    pathname === item.href ? 'text-[#862a92]' : 'text-default-500 hover:text-default-900'
                  } flex w-full `}
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
