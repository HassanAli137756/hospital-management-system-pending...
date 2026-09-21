import React from 'react'

function SideBar(
{
    sidebarLinks=[]
}
) {
  return (
    <aside
          className="hidden md:flex
                     w-[250px] lg:w-[265px]
                     bg-white border-r border-gray-100
                     flex-col shrink-0"
        >

          {/* Sidebar Intro */}

          <div className="px-5 lg:px-6 pt-7 pb-5">

            <p
              className="text-[10px] font-semibold uppercase
                         tracking-[0.15em] text-emerald-600"
            >
              Clinic Portal
            </p>

            <h2 className="text-[17px] font-semibold text-gray-800 mt-1">
              Management
            </h2>

            <p className="text-[11px] text-gray-400 mt-1">
              Manage your clinic with ease
            </p>

          </div>


          {/* Desktop Navigation */}

          <nav className="px-3 lg:px-4 space-y-1">

            {sidebarLinks.map((link) => (

              <div
                key={link.name}
                className={`
                  group relative flex items-center gap-3
                  px-3.5 py-3 rounded-xl
                  text-[13px] font-medium cursor-pointer
                  transition-all duration-200

                  ${
                    link.active
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-500 hover:bg-gray-50 hover:text-emerald-700"
                  }
                `}
              >

                {link.active && (
                  <span
                    className="absolute left-0 top-1/2
                               -translate-y-1/2
                               w-[3px] h-6
                               rounded-r-full
                               bg-emerald-600"
                  />
                )}


                <span
                  className={
                    link.active
                      ? "text-emerald-600"
                      : "text-gray-400 group-hover:text-emerald-600"
                  }
                >
                  {link.icon}
                </span>


                <span>
                  {link.name}
                </span>

              </div>

            ))}

          </nav>


          {/* Desktop Profile */}

          <div className="mt-auto p-3 lg:p-4">

            <div className="border-t border-gray-100 pt-3">

              <div
                className="flex items-center gap-3
                           px-3 py-3 rounded-xl
                           hover:bg-gray-50
                           transition-colors cursor-pointer"
              >

                <div
                  className="w-9 h-9 rounded-full
                             bg-emerald-50 text-emerald-700
                             flex items-center justify-center
                             shrink-0"
                >

                  <svg
                    className="w-[17px] h-[17px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth={1.8}
                      d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0"
                    />
                  </svg>

                </div>


                <div className="min-w-0">

                  <p className="text-[13px] font-semibold text-gray-700 truncate">
                    My Profile
                  </p>

                  <p className="text-[11px] text-gray-400 truncate">
                    Account settings
                  </p>

                </div>

              </div>

            </div>

          </div>

        </aside>
  )
}

export default SideBar