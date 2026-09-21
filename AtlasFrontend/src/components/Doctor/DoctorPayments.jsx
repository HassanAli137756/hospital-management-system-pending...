import React from 'react'
import { GeneralPayments } from '../GeneralComponents/GeneralPayments'

function DoctorPayments() {
  return (
    <div>
        <GeneralPayments
        isReceptionist={false}
        />
    </div>
  )
}

export default DoctorPayments