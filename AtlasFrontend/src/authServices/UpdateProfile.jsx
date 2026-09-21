import React from "react";
import { UpdatePassword } from "./UpdatePassword";
import { UpdatePasswordForm } from "../forms/UpdatePasswordForm";
import { UpdateProfileForm } from "../forms/UpdateProfileForm";



const UpdateProfile = () => {
  return (
    <div className="min-h-screen bg-[#f4f8f6] flex items-center justify-center p-4">

      <div className="w-full max-w-5xl">

        {/* Main Profile Container */}
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

            {/* Decorative circles */}
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

            <div className="relative z-10">

              {/* Brand */}
              <div className="flex items-center gap-3">

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
                    Atlas Physiotherapy
                  </p>

                  <p className="text-emerald-300 text-[11px] mt-1 tracking-wide">
                    CLINIC MANAGEMENT SYSTEM
                  </p>
                </div>

              </div>


              {/* Profile Message */}
              <div className="mt-20">

                <div
                  className="w-12 h-12 rounded-xl
                             bg-emerald-900/70
                             border border-emerald-700/40
                             flex items-center justify-center mb-5"
                >
                  <svg
                    className="w-6 h-6 text-emerald-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0
                         018 0zM12 14a7 7 0
                         00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>

                <p
                  className="text-emerald-400 text-xs font-semibold
                             uppercase tracking-[0.18em] mb-4"
                >
                  Profile Settings
                </p>

                <h2
                  className="text-3xl xl:text-4xl
                             font-semibold text-white
                             leading-tight max-w-sm"
                >
                  Keep your
                  <span className="text-emerald-400">
                    {" "}information up to date.
                  </span>
                </h2>

                <p className="mt-5 text-sm leading-6 text-emerald-100/70 max-w-sm">
                  Update your account details so your clinic
                  team can always reach you with the right information.
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-xs font-medium text-white">
                    Profile information
                  </p>

                  <p className="text-[11px] text-emerald-200/60">
                    Keep your contact details accurate
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* =====================================================
              RIGHT PROFILE UPDATE SECTION
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


            {/* Page Heading */}
            <div className="mb-8">

              <p
                className="text-xs font-semibold uppercase
                           tracking-[0.16em] text-emerald-600 mb-3"
              >
                Profile Settings
              </p>

              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Update your information
              </h1>

              <p className="mt-2 text-sm text-gray-500 max-w-md">
                Keep your account details current so your clinic
                profile stays accurate.
              </p>

            </div>


            
            <UpdateProfileForm />


            {/* Back / Cancel */}
            <div className="mt-8 pt-6 border-t border-gray-100">

              <button
                type="button"
                className="w-full flex items-center justify-center
                           gap-2 text-sm font-medium
                           text-gray-500 hover:text-emerald-600
                           transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>

                Back to profile
              </button>

            </div>


            {/* Information Notice */}
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
                  d="M13 16h-1v-4h-1m1-4h.01
                     M12 20a8 8 0 100-16 8 8 0
                     000 16z"
                />
              </svg>

              <p className="text-[11px] leading-5 text-emerald-800/70">
                Make sure your email address and phone number
                are correct before saving your changes.
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

export {UpdateProfile};
