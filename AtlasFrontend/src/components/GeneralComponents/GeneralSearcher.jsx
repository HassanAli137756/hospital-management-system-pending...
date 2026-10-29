import React from "react";
import { Search, RotateCcw, SlidersHorizontal } from "lucide-react";
import { SelectInput } from "../../utils/CustomSelectInput";
import { TextInput } from "../../utils/TextInput";

const Searcher = (
  {
  register,
  errors = {},
  onSearch,
  onReset,

  showPatientName = true,
  showEmail = true,
  showSelectDoctor = true,
  showCellNo = true,
  showTreatmentStatus = true,
  showPaymentStatus = true,

  sessionOptions = [],
  doctorOptions = [],
  treatmentStatusOptions = [],
  paymentStatusOptions = [],

  className = "",
}) => {
  return (
    <section
      className={`w-full min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-gray-100 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <SlidersHorizontal size={21} />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-bold tracking-tight text-gray-900">
              Advanced Search
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Apply filters to find the records you need.
            </p>
          </div>
        </div>

        <span className="w-fit rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500">
          Search Filters
        </span>
      </div>

      {/* Search Fields */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch?.(e);
        }}
        className="space-y-5 p-4 sm:p-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

          {/* Patient Name */}
          {showPatientName && (
            <div className="min-w-0">
              
              <TextInput
              errors={errors}
              name={"fullName"}
              register={register}
              lable="Patient Name"
              placeholder="Enter patient name"

              />
              
            </div>
          )}

          {/* Email */}
          {showEmail && (
            <div className="min-w-0">
              <TextInput
              type="email"
              errors={errors}
              name={"email"}
              register={register}
              lable="Email"
              placeholder="Enter patient email"

              />
            </div>
          )}

          {/* Starting Time / Date */}
          <div className="min-w-0">
            <label
              htmlFor="startingTime"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Starting Date
            </label>

            <input
              id="startingTime"
              type="date"
              {...register?.("startingTime", {
                required: "Starting date is required",
              })}
              className="w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            />

            {errors.startingTime && (
              <p className="mt-1 text-xs text-red-500">
                {errors.startingTime.message}
              </p>
            )}
          </div>

          {/* Ending Time / Date */}
          <div className="min-w-0">
            <label
              htmlFor="endingTime"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Ending Date
            </label>

            <input
              id="endingTime"
              type="date"
              {...register?.("endingTime")}
              className="w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            />

            {errors.endingTime && (
              <p className="mt-1 text-xs text-red-500">
                {errors.endingTime.message}
              </p>
            )}
          </div>

          {/* Session Type */}
          <div className="min-w-0">
            <SelectInput
              label="Session Type"
              name="forSession"
              register={register}
              error={errors.forSession}
              placeholder="Select session type"
              options={sessionOptions}
            />
          </div>

          {/* Doctor */}
          {showSelectDoctor && (
            <div className="min-w-0">
              <SelectInput
                label="Doctor"
                name="doctor"
                register={register}
                error={errors.doctor}
                placeholder="Select doctor"
                options={doctorOptions}
              />
            </div>
          )}

          {/* Cell Number */}
          {showCellNo && (
            <div className="min-w-0">
              <TextInput
              type="email"
              errors={errors}
              name={"cellNo"}
              register={register}
              lable="Cell Number"
              placeholder="Enter patient phone number"
              />
            </div>
          )}

          {/* Treatment Status */}
          {showTreatmentStatus && (
            <div className="min-w-0">
              <SelectInput
                label="Treatment Status"
                name="treatmentStatus"
                register={register}
                error={errors.treatmentStatus}
                placeholder="Select treatment status"
                options={treatmentStatusOptions}
              />
            </div>
          )}

          {/* Payment Status */}
          {showPaymentStatus && (
            <div className="min-w-0">
              <SelectInput
                label="Payment Status"
                name="paymentStatus"
                register={register}
                error={errors.paymentStatus}
                placeholder="Select payment status"
                options={paymentStatusOptions}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 sm:w-auto"
          >
            <RotateCcw size={16} />
            Reset Filters
          </button>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:w-auto"
          >
            <Search size={17} />
            Search Records
          </button>
        </div>
      </form>
    </section>
  );
};

export {Searcher};