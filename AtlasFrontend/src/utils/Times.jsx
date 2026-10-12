import React from "react";
import { Check, Clock3, LockKeyhole } from "lucide-react";
import { ErrorMessage } from "./ErrorMessage";

const TimeSelection = ({
errors,
times = {},
register,
name,
selectedDay,
}) => {
const days = [
"monday",
"tuesday",
"wednesday",
"thursday",
"friday",
"saturday",
];

console.log("Selected Days in Times.jsx: ", selectedDay);
console.log("times in Times.jsx: ", times);


const visibleDays = selectedDay
? days.filter((day) => day === selectedDay)
: days;

console.log("times in Times.jsx: ", times);
console.log("selected day in Times.jsx: ", selectedDay);


return ( <div className="grid grid-cols-1 gap-5">
{visibleDays.map((day) => {
const dayTimes = times?.[day] || [];

    const availableTimes = dayTimes.filter(
      (item) => item.availability && item.status
    );

    const unavailableTimes = dayTimes.filter(
      (item) => !item.availability || !item.status
    );

    return (
      <section
        key={day}
        className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white"
      >
        {/* ================= DAY HEADER ================= */}
        <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/70 px-4 py-3 sm:px-5">
          <Clock3
            size={17}
            className="shrink-0 text-emerald-600"
          />

          <h3 className="text-sm font-semibold capitalize text-gray-800 sm:text-base">
            {day}
          </h3>
        </div>

        <div className="p-4 sm:p-5">

          {/* ================= AVAILABLE ================= */}
          {availableTimes.length > 0 && (
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                Available Time
              </p>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {availableTimes.map((item) => (
                  <label
                    key={`${day}-${item.time}`}
                    className="group relative cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={`${item.time}`}
                      {...register(name, {
                        required: "Please select an appointment time",
                      })}
                      className="peer sr-only"
                    />

                    <div className="flex min-w-0 items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-3 text-gray-700 transition group-hover:border-emerald-300 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500/20">
                      <span className="truncate text-sm font-medium">
                        {item.time}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* ================= UNAVAILABLE ================= */}
          {unavailableTimes.length > 0 && (
            <div className={availableTimes.length > 0 ? "mt-6" : ""}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Already Booked
              </p>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {unavailableTimes.map((item) => (
                  <div
                    key={`${day}-${item.time}-unavailable`}
                    className="flex min-w-0 items-center justify-between gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-3 text-gray-400"
                  >
                    <span className="truncate text-sm font-medium line-through">
                      {item.time}
                    </span>

                    <LockKeyhole
                      size={14}
                      className="shrink-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= NO SLOTS ================= */}
          {dayTimes.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center">
              <p className="text-sm text-gray-400">
                No time slots available for this day.
              </p>
            </div>
          )}
        </div>

      {
        errors?.[name] &&
        (
          <ErrorMessage
            message={errors?.[name]?.message}
          />
        )
      }
    </section>
  );
})}
</div>

);
};

export default TimeSelection;
