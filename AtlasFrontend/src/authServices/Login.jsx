
/* ****************** OKAY ****************** */


import React from 'react'
import { RegisterForm } from '../forms/RegisterForm';
import { LoginForm } from '../forms/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-[#f4f8f6] flex items-center justify-center p-4">

      <div className="w-full max-w-5xl">

        {/* Main Authentication Container */}
        <div
          className="bg-white rounded-3xl overflow-hidden
                     border border-emerald-100/70
                     shadow-[0_20px_60px_-25px_rgba(6,78,59,0.20)]
                     grid lg:grid-cols-[1fr_1.05fr]"
        >

          {/* =====================================================
              LEFT BRANDING PANEL
              ===================================================== */}
          <div
            className="hidden lg:flex relative overflow-hidden
                       bg-emerald-950 p-10 xl:p-12
                       flex-col justify-between"
          >

            {/* Decorative medical pattern */}
            <div
              className="absolute -top-24 -right-24
                         w-72 h-72 rounded-full
                         border-40 border-emerald-800/30"
            />

            <div
              className="absolute -bottom-32 -left-32
                         w-80 h-80 rounded-full
                         border-45 border-emerald-800/20"
            />

            {/* Brand */}
            <div className="relative z-10">

              <div className="flex items-center gap-3">

                {/* Brand Mark */}
                <div
                  className="w-11 h-11 rounded-xl
                             bg-emerald-500
                             flex items-center justify-center
                             shadow-lg shadow-emerald-950/30"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-white font-semibold text-lg leading-none">
                    CareFlow
                  </p>

                  <p className="text-emerald-300 text-[11px] mt-1 tracking-wide">
                    CLINIC MANAGEMENT SYSTEM
                  </p>
                </div>

              </div>


              {/* Main Brand Message */}
              <div className="mt-20">

                <p
                  className="text-emerald-400 text-xs font-semibold
                             uppercase tracking-[0.18em] mb-4"
                >
                  Your Clinic. One System.
                </p>

                <h2
                  className="text-3xl xl:text-4xl
                             font-semibold text-white
                             leading-tight max-w-sm"
                >
                  Everything your clinic needs,
                  <span className="text-emerald-400">
                    {" "}in one place.
                  </span>
                </h2>

                <p className="mt-5 text-sm leading-6 text-emerald-100/70 max-w-sm">
                  Manage appointments, patients, sessions and
                  clinic operations through one simple workspace.
                </p>

              </div>

            </div>


            {/* Bottom Info */}
            <div className="relative z-10">

              <div className="flex items-center gap-3">

                <div
                  className="w-9 h-9 rounded-lg
                             bg-white/10
                             flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 text-emerald-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-xs font-medium text-white">
                    Secure access
                  </p>

                  <p className="text-[11px] text-emerald-200/60">
                    Your clinic data stays protected
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* =====================================================
              RIGHT LOGIN SECTION
              ===================================================== */}
          <div className="p-6 sm:p-10 lg:p-12">

            {/* Mobile Branding */}
            <div className="lg:hidden flex items-center gap-3 mb-10">

              <div
                className="w-10 h-10 rounded-xl
                           bg-emerald-600
                           flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  CareFlow
                </p>

                <p className="text-[10px] tracking-wide text-emerald-600">
                  CLINIC MANAGEMENT SYSTEM
                </p>
              </div>

            </div>


            {/* Login Heading */}
            <div className="mb-8">

              <p
                className="text-xs font-semibold uppercase
                           tracking-[0.16em] text-emerald-600 mb-3"
              >
                Secure Sign In
              </p>

              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Welcome back
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Sign in to continue managing your clinic.
              </p>

            </div>


            <LoginForm />


            {/* Registration */}
            <div className="mt-8 pt-6 border-t border-gray-100">

              <p className="text-center text-sm text-gray-500">
                Don't have a clinic account?{" "}

                <button
                  type="button"
                  className="font-semibold text-emerald-600
                             hover:text-emerald-700 transition-colors"
                >
                  Create an account
                </button>
              </p>

            </div>


            {/* Security Notice */}
            <div
              className="mt-6 flex items-start gap-3
                         rounded-xl bg-emerald-50/70
                         border border-emerald-100
                         px-4 py-3"
            >

              <svg
                className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>

              <p className="text-[11px] leading-5 text-emerald-800/70">
                Your account information is handled securely
                and is only accessible to authorized clinic staff.
              </p>

            </div>

          </div>

        </div>


        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-5">
          © {new Date().getFullYear()} Atlas Physiotherapy· Clinic Management System
        </p>

      </div>

    </div>
  );
};

export {Login};
