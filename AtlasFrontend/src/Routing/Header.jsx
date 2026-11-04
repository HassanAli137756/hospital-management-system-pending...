import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Activity,
  ChevronDown,
  LogOut,
  UserRound,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Logout } from "../authServices/Logout";

const Header = ({
  
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [navLinks, setNavLinks] = useState([])
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
      ? "bg-emerald-50 text-emerald-700"
      : "text-gray-600 hover:bg-gray-50 hover:text-emerald-700"
    }`;

  const userInfo = useSelector(
    state => state.userReducer.userInfo
  )

  
  
  
  useEffect(() => {
    
    const role = userInfo?.userData?.role

    if (userInfo?.userData && userInfo?.isAuthorized) 
    {
      if (role == "patient") {
        setNavLinks(
          [
            { label: "Home", to: "/patient-home" },
            { label: "Appointments", to: "/patient-appointment" },
            { label: "Payments", to: "/patient-payments" },
            { label: "History", to: "/patient-history" },
          ]
        )
        navigate("/patient-home")
        
      }
      else if (role == "doctor") {
        setNavLinks(
          [
            { label: "Home", to: "/doctor-home" },
            { label: "Appointments", to: "/doctor-appointment" },
            { label: "Payments", to: "/doctor-payment" },
          ]
        )
        navigate("/doctor-home")
      }
      else if (role == "receptionist") {
        setNavLinks(
          [
            { label: "Home", to: "/receptionist-home" },
            { label: "Appointments", to: "/receptionist-appointment" },
            { label: "Payments", to: "/receptionist-payment" },
          ]
        )
        navigate("/receptionist-home")

      }

      setNavLinks(prev => ([...prev, { label: "Searcher", to: "/appointment-searcher" }]))

    }
    else if(!userInfo?.userData?._id && !userInfo?.isAuthorized)
    {
      setNavLinks(
          [
            { label: "Login", to: "/login" },
            { label: "Register", to: "/register" },
          ]
        )
        
        if(!userInfo?.isLoadingUser && !userInfo?.userData?._id && !userInfo?.isAuthorized)
        {
          navigate("/login")
        }
        
    }



  }, [userInfo])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-[68px] w-full max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex min-w-0 shrink-0 items-center gap-2.5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
            <Activity size={23} strokeWidth={2.2} />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-base font-bold tracking-tight text-gray-900 sm:text-lg">
              Atlas Physiotherapy
            </h1>
            <p className="hidden text-[10px] font-medium tracking-wider text-emerald-700 min-[380px]:block">
              CLINIC MANAGEMENT
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={linkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop User Actions */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          {userInfo?.userData?._id ?
            (
              <Logout />
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                Login
              </Link>
            )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 lg:hidden"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 pt-3 shadow-lg sm:px-6 lg:hidden">
          <nav className="mx-auto flex w-full max-w-3xl flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}

            <div className="mt-3 border-t border-gray-100 pt-3">
              {userInfo?.userData?._id ?
                (
                  <Logout />
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                  >
                    Login
                  </Link>
                )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export { Header };



