import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useLocation } from "react-router-dom";
import { AppState } from "../../../Store/context";

export const navigation = [
  { name: "Home", href: "/home", current: true },
  { name: "Our Tours", href: "our-tours", current: false },
  { name: "Regions", href: "cameroon-regions", current: false },
  { name: "Culture", href: "culture-language-religion", current: false },
  { name: "Visa / Safety", href: "visa-health-safety", current: false },
  { name: "Information", href: "general-information", current: false },
  { name: "About", href: "about-us", current: false },
  { name: "Booking Form", href: "booking-form", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const { user, signOutHandler } = AppState();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOutHandler();
    } catch (error) {
      throw new Error("Error signing out, please try agin");
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <NavLink to="/">
                    <span className="text-lg font-medium text-white">
                      Eco-Tourism
                    </span>
                  </NavLink>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => {
                      const isCurrent = location.pathname === item.href;
                      return (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            isCurrent
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={isCurrent ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {user ? (
                        <UserIcon className="h-8 w-8 text-white" />
                      ) : (
                        <NavLink
                          to="sign-in"
                          className=" bg-gray-800 ml-4 rounded-md block px-4 py-2 text-lg font-medium text-white"
                        >
                          Log In
                        </NavLink>
                      )}
                    </MenuButton>
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ focus }) => (
                          <NavLink
                            to="booked-tours"
                            className={classNames(
                              focus ? "bg-gray-100" : "",
                              "block px-4 py-2 text-lg font-medium text-gray-800"
                            )}
                          >
                            Booked Tours
                          </NavLink>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            onClick={handleSignOut}
                            type="button"
                            className=" bg-gray-800 ml-4 rounded-md block px-4 py-2 text-lg font-medium text-white"
                          >
                            Sign out
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
