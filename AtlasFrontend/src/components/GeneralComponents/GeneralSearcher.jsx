import React from "react";
import {
Search,
Users,
CalendarDays,
UserRound,
Mail,
Phone,
Stethoscope,
ClipboardList,
Eye,
RotateCcw,
CircleCheck,
CircleAlert,
XCircle,
} from "lucide-react";

const PatientSearch = () => {
const demoPatients = [
{
id: 1,
name: "Ali Raza",
email: "[ali.raza@gmail.com](mailto:ali.raza@gmail.com)",
cellNo: "0300-1234567",
doctor: "Dr. Ahmed Khan",
session: "Physiotherapy",
date: "02 Oct 2026",
status: "Completed",
totalSessions: 8,
},
{
id: 2,
name: "Ayesha Malik",
email: "[ayesha.malik@gmail.com](mailto:ayesha.malik@gmail.com)",
cellNo: "0312-4567890",
doctor: "Dr. Muhammad Ali",
session: "Cupping",
date: "02 Oct 2026",
status: "Pending",
totalSessions: 5,
},
{
id: 3,
name: "Hamza Ahmed",
email: "[hamza.ahmed@gmail.com](mailto:hamza.ahmed@gmail.com)",
cellNo: "0333-9876543",
doctor: "Dr. Usman",
session: "Dry Needling",
date: "01 Oct 2026",
status: "Completed",
totalSessions: 11,
},
{
id: 4,
name: "Sara Khan",
email: "[sara.khan@gmail.com](mailto:sara.khan@gmail.com)",
cellNo: "0345-6543210",
doctor: "Dr. Hassan Ahmed",
session: "Physiotherapy",
date: "30 Sep 2026",
status: "Cancelled",
totalSessions: 3,
},
];

const getStatusStyle = (status) => {
if (status === "Completed") {
return "border-emerald-100 bg-emerald-50 text-emerald-700";
}

 
if (status === "Pending") {
  return "border-amber-100 bg-amber-50 text-amber-700";
}

return "border-red-100 bg-red-50 text-red-700";
 

};

const getStatusIcon = (status) => {
if (status === "Completed") return <CircleCheck size={13} />;
if (status === "Pending") return <CircleAlert size={13} />;
return <XCircle size={13} />;
};

return ( <div className="min-h-full bg-[#f5f8f7] p-4 sm:p-6 lg:p-8"> <div className="mx-auto max-w-7xl space-y-6">

 
    {/* ================= HEADER ================= */}
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Patient Search
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Find patient records using detailed search filters.
        </p>
      </div>

      {/* Total Patients */}
      <div className="flex w-full items-center gap-3 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm md:w-auto md:min-w-[190px]">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Users size={21} />
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500">
            Total Patients
          </p>

          <p className="mt-0.5 text-2xl font-bold text-gray-900">
            248
          </p>
        </div>
      </div>
    </div>

    {/* ================= SEARCH PANEL ================= */}
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">

      {/* Panel Header */}
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Search size={19} />
        </div>

        <div className="min-w-0">
          <h2 className="font-semibold text-gray-900">
            Search Filters
          </h2>

          <p className="mt-0.5 text-xs text-gray-500">
            Use one or multiple filters to find patient records.
          </p>
        </div>
      </div>

      {/* ================= FILTER GRID ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Starting Date */}
        <div className="min-w-0">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Starting Date
          </label>

          <div className="relative">
            <CalendarDays
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="date"
              className="w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm text-gray-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>

        {/* Ending Date */}
        <div className="min-w-0">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Ending Date
          </label>

          <div className="relative">
            <CalendarDays
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="date"
              className="w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm text-gray-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>

        {/* Session Type */}
        <div className="min-w-0">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Session Type
          </label>

          <div className="relative">
            <ClipboardList
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              defaultValue=""
              className="w-full min-w-0 appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm text-gray-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            >
              <option value="">All Sessions</option>
              <option>Physiotherapy</option>
              <option>Cupping</option>
              <option>Dry Needling</option>
              <option>Checkup</option>
            </select>
          </div>
        </div>

        {/* Doctor */}
        <div className="min-w-0">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Doctor
          </label>

          <div className="relative">
            <Stethoscope
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              defaultValue=""
              className="w-full min-w-0 appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm text-gray-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            >
              <option value="">All Doctors</option>
              <option>Dr. Ahmed Khan</option>
              <option>Dr. Muhammad Ali</option>
              <option>Dr. Usman</option>
              <option>Dr. Hassan Ahmed</option>
            </select>
          </div>
        </div>

        {/* Name */}
        <div className="min-w-0">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Patient Name
          </label>

          <div className="relative">
            <UserRound
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Patient name"
              className="w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>

        {/* Email */}
        <div className="min-w-0">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>

          <div className="relative">
            <Mail
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              placeholder="Patient email"
              className="w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>

        {/* Cell Number */}
        <div className="min-w-0">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Cell Number
          </label>

          <div className="relative">
            <Phone
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="03XX-XXXXXXX"
              className="w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>

        {/* Status */}
        <div className="min-w-0">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Status
          </label>

          <select
            defaultValue=""
            className="w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          >
            <option value="">All Status</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Search Actions */}
      <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
        <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 sm:w-auto">
          <RotateCcw size={17} />
          Reset
        </button>

        <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 sm:w-auto">
          <Search size={17} />
          Search Patients
        </button>
      </div>
    </div>

    {/* ================= RESULTS HEADER ================= */}
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Search Results
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Showing patient records matching your search.
        </p>
      </div>

      <span className="w-fit rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
        4 Results
      </span>
    </div>

    {/* ================= RESULTS ================= */}
    <div className="space-y-4">

      {demoPatients.map((patient) => (
        <div
          key={patient.id}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-emerald-100 hover:shadow-md sm:p-5"
        >

          {/* Main Result Layout */}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(220px,1.15fr)_minmax(0,2fr)_auto] xl:items-center">

            {/* -------- Patient -------- */}
            <div className="min-w-0">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <UserRound size={21} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="break-words font-semibold text-gray-900">
                      {patient.name}
                    </h3>

                    <span
                      className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                        patient.status
                      )}`}
                    >
                      {getStatusIcon(patient.status)}
                      {patient.status}
                    </span>
                  </div>

                  <div className="mt-2 space-y-1 text-sm text-gray-500">
                    <p className="flex min-w-0 items-center gap-1.5">
                      <Phone
                        size={14}
                        className="shrink-0"
                      />
                      <span className="break-all">
                        {patient.cellNo}
                      </span>
                    </p>

                    <p className="flex min-w-0 items-center gap-1.5">
                      <Mail
                        size={14}
                        className="shrink-0"
                      />
                      <span className="break-all">
                        {patient.email}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* -------- Patient Details -------- */}
            <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-4 sm:grid-cols-4 xl:border-l xl:border-t-0 xl:pl-5 xl:pt-0">

              <div className="min-w-0 rounded-xl bg-gray-50 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  Doctor
                </p>

                <p className="mt-1 break-words text-sm font-medium text-gray-700">
                  {patient.doctor}
                </p>
              </div>

              <div className="min-w-0 rounded-xl bg-gray-50 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  Session
                </p>

                <p className="mt-1 break-words text-sm font-medium text-gray-700">
                  {patient.session}
                </p>
              </div>

              <div className="min-w-0 rounded-xl bg-gray-50 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  Last Session
                </p>

                <p className="mt-1 text-sm font-medium text-gray-700">
                  {patient.date}
                </p>
              </div>

              <div className="min-w-0 rounded-xl bg-gray-50 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  Sessions
                </p>

                <p className="mt-1 text-sm font-semibold text-emerald-600">
                  {patient.totalSessions}
                </p>
              </div>
            </div>

            {/* -------- Action -------- */}
            <div className="border-t border-gray-100 pt-4 xl:border-0 xl:pt-0">
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 xl:w-auto">
                <Eye size={17} />
                View Patient
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>

  </div>
</div>
 

);
};

export {PatientSearch};
