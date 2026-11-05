import React from "react";
import { SelectInput } from "./utils/CustomSelectInput";

export function App()
{
  const doctorOptions =[
      {
        value: "6ac73947607d84a160862d26",
        label: "Muhammad Mehran Akram"
      },
      {
        value: "6ac73b21607d84a160862d28",
        label: "Rabia Sabir"
      }
    ]
  return(
  <div>
    <SelectInput
    onChange={(doc) => console.log("given Doctor", doc)}
    label={"Select Doctor"}
    name={"doctor"}
    defaultValue="6ac73b21607d84a160862d28"
    options={doctorOptions}
    />
  </div>
  )
}