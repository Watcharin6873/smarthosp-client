import React, { useEffect, useState } from 'react'
import useGlobalStore from '../../store/global-store'
import { MonitorCheck } from 'lucide-react'
import { getReportForPivot } from '../../api/Report'
import * as XLSX from 'xlsx'
import { useTable } from 'react-table'



const FormReportCentre = () => {

  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)

  const [isLoading, setIsLoading] = useState(false)
  const [reportData, setReportData] = useState([])
  const [pivotState, setPivotState] = useState({})
  const [columns, setColumns] = useState([]);


  useEffect(() => {
    loadDataForPivot(token)
  }, [])

  const loadDataForPivot = async () =>{
    await getReportForPivot(token)
      .then(res=>{
        console.log(res.data)
        setReportData(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
  }

  const pivotData = reportData.map((row)=>({
    zone: Number(row.zone),
    provine: row.provname + "["+ row.provcode +"]",
    hospital_name: row.hname_th + "["+ row.hcode +"]",
    sub_quest_name: row.sub_quest_name,
    c_check: row.c_check
  }))



  return (
    <div>

      <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
        <MonitorCheck /> <p className='ml-2'> รายงานผลการประเมินโรงพยาบาลอัจฉริยะ ประจำปีงบประมาณ 2568</p>
      </div>

    </div>
  )
}

export default FormReportCentre