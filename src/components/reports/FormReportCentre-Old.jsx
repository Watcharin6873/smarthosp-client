import React, { useEffect, useState } from 'react'
import useGlobalStore from '../../store/global-store'
import { MonitorCheck } from 'lucide-react'
import { getReportForPivot } from '../../api/Report'
import * as XLSX from 'xlsx'
import { useTable } from 'react-table'
// import fileExcel from '/home/bdhdev1/smarthospital_quest/smarthosp_quest/src/assets/excel_exports/Report_all.xlsx'


const FormReportCentre = () => {

  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)

  const [isLoading, setIsLoading] = useState(false)
  const [reportData, setReportData] = useState([])
  const [pivotState, setPivotState] = useState({})
  const [columns, setColumns] = useState([]);


  useEffect(() => {
    fetch(`https://bdh-service.moph.go.th/api/smarthosp/cyber-image/Report_all.xlsx`)
      .then(res => res.arrayBuffer())
      .then(Buffer => {
        const workbook = XLSX.read(Buffer, { type: "array" })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 })
        setReportData(jsonData)
      })
      .catch(err => console.log("Error loading Excel file: ", err))
  }, [])


  return (
    <div>

      <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
        <MonitorCheck /> <p className='ml-2'> รายงานผลการประเมินโรงพยาบาลอัจฉริยะ ประจำปีงบประมาณ 2568</p>
      </div>
      {/* <pre>{JSON.stringify(reportData, null, 2)}</pre> */}
      <h2>Excel Data</h2>
      <div className='overflow-x-auto bg-white rounded-md shadow-md p-3'>
        <table className='min-w-full table-auto'>
          <tbody>
            {reportData.map((row, rowIndex) => (
              <tr key={rowIndex} className='text-xs border'>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className='border text-center'>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default FormReportCentre