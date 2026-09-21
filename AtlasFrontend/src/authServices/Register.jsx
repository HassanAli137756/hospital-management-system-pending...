import React, { useState } from "react";
import { RegisterForm } from "../forms/RegisterForm";



const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAvatarPreview(URL.createObjectURL(file));
  };


  console.log("URL", avatarPreview);
  

  return (
    <div className="min-h-screen bg-[#f3f8f6] flex items-center justify-center px-4 py-10 rounded-2xl">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100">

        <div className="grid md:grid-cols-2">

          {/* Left - Branding / Information */}
          <div className="hidden md:flex bg-emerald-950 text-white p-10 flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                  <span className="text-2xl">✚</span>
                </div>

                <div>
                  <h1 className="text-xl font-bold tracking-wide">
                    Atlas Physiotherapy
                  </h1>
                  <p className="text-emerald-200 text-xs">
                    Clinic Management System
                  </p>
                </div>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                Manage your clinic,
                <span className="block text-emerald-200">
                  care for your patients.
                </span>
              </h2>

              <p className="mt-5 text-emerald-100 leading-relaxed max-w-md">
                Create your account to access a smarter and more organized
                clinic management experience.
              </p>
            </div>

            <div className="border-t border-emerald-700 pt-6">
              <p className="text-sm text-emerald-200">
                Secure • Professional • Patient-focused
              </p>
            </div>
          </div>

          {/* Right - Register Form */}
          <div className="p-7 sm:p-10 lg:p-12">

            {/* Mobile Branding */}
            <div className="md:hidden flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
                <span className="text-xl">✚</span>
              </div>

              <div>
                <h1 className="text-xl font-bold text-emerald-900">
                  Atlas Physiotherapy
                </h1>
                <p className="text-xs text-gray-500">
                  Clinic Management System
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Create account
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Register to get started with the clinic system.
              </p>
            </div>

            
            <RegisterForm />

            <div className="flex items-center gap-4 my-7">
              <div className="h-px bg-gray-200 flex-1" />
              <span className="text-xs text-gray-400">
                OR
              </span>
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <button
                type="button"
                className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Register };