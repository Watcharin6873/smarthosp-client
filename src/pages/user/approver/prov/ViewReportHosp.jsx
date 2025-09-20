import React from 'react'
import FormViewReportHosp from '../../../../components/user/approver/FormViewReportHosp'

const ViewReportHosp = ({hospital_code}) => {
  return (
    <div>
      <h1>{hospital_code}</h1>
      <FormViewReportHosp hospcode={hospital_code} />
    </div>
  )
}

export default ViewReportHosp
