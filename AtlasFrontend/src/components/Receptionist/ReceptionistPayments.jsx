import React from 'react'
import { GeneralPayments } from '../GeneralComponents/GeneralPayments'

function ReceptionistPayments() {
  return (
    <div>
      <GeneralPayments
      isReceptionist={true}
      />
    </div>
  )
}

export default ReceptionistPayments