import { useState } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'
import { AddCard, Countertops } from '@mui/icons-material'
import Carrito from './Carrito.jsx'



const user = {
  name: 'Registrarse',

}

const navigation = [
  { name: 'Productos', href: '#Productos', current: true },
 
  { name: 'Contacto', href: '#Contacto', current: false },
  { name: 'Ayuda', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [active, setActive] = useState(false);
  return (
    <>

      <div className=" ">
        <Disclosure as="nav" className="bg-white">
          <div className="mx-10 max-w-7xl px-10 sm:px-6 lg:px-20">
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center">
                <div className="flex">
                  <img
                    alt="Techno"
                    src="src\assets\encendidoAzul.com.png"
                    className="h-10 w-10"
                  />
                </div>
                
                <div className="hidden md:block">
                  <div className=" ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? ' text-gray-700 hover:underline hover:text-gray-900 ' : 'text-gray-700 hover:text-underline hover:text-gray-900 hover:underline',
                          'px-3 py-2 text-xl font-large',
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                </div>
                
             
                    <div className='flex'>
                <div className='hidden md:block '>

                  {/* Menu de Perfil Usuario */}
                  <Menu as="div" className=" ">
                    <div>
                    <MenuButton
                    type="button"
                     className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" 
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Usuario</span>
                    <UserIcon aria-hidden="true" className="h-6 w-6" />
                  </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <a
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                          >
                            {item.name}
                          </a>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              

              {/* Logo Carrito */}
              
                <div className=" container-icon ml-2 flex items-center md:ml-2 ">
                
                  <button
                    type="button"
                     className=" container-cart-icon  rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" 
                  onClick={() => setActive(!active)}>
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Carrito</span>
                    <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
                    
                  </button>
                  <div
					className={`container-cart-products ${
						active ? '' : 'hidden-cart'
					}`}>
          {<Carrito/>}
				

          </div>
       
        </div> 
        </div> 
        
              
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
        <div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
           
          </DisclosurePanel>
        </Disclosure>

  
      </div>

    </>
  )
}


