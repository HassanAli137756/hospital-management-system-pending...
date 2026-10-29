import React from "react";
import { WifiOff, RefreshCw, ArrowLeft, Activity } from "lucide-react";

const InternetError = ({
  title = "You're Offline",
  message = "We couldn't connect to the clinic server. Please check your internet connection and try again.",
  onRetry,
  onGoBack,
}) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f8f7] px-4 py-10 sm:px-6">
      <div className="w-full max-w-lg">

        {/* Brand */}
        <div className="mb-8 flex items-center justify-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
            <Activity size={22} />
          </div>

          <span className="text-lg font-bold tracking-tight text-gray-900">
            Clinic<span className="text-emerald-600">Care</span>
          </span>
        </div>

        {/* Error Card */}
        <section className="rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-sm sm:p-10">

          {/* Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-600 sm:h-24 sm:w-24">
            <WifiOff size={38} strokeWidth={1.6} />
          </div>

          {/* Heading */}
          <div className="mt-7">
            <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              CONNECTION ERROR
            </span>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {title}
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500 sm:text-base">
              {message}
            </p>
          </div>

          {/* Notice */}
          <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4 text-left">
            <p className="text-sm font-semibold text-gray-800">
              What you can do
            </p>

            <ul className="mt-2 space-y-2 text-sm text-gray-500">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                Check your Wi-Fi or mobile internet connection.
              </li>

              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                Make sure the clinic server is running.
              </li>

              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                Try connecting again in a moment.
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => {
                if (onRetry) {
                  onRetry();
                } else {
                  window.location.reload();
                }
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:w-auto"
            >
              <RefreshCw size={16} />
              Try Again
            </button>

            {onGoBack && (
              <button
                type="button"
                onClick={onGoBack}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:w-auto"
              >
                <ArrowLeft size={16} />
                Go Back
              </button>
            )}
          </div>
        </section>

        {/* Footer */}
        <p className="mt-6 text-center text-xs leading-5 text-gray-400">
          Your clinic dashboard will be available once the connection is restored.
        </p>
      </div>
    </main>
  );
};

export {InternetError};