import React, { useEffect, useState } from 'react'
import useGlobalStore from '../../store/global-store'
import { MonitorCheck } from 'lucide-react'


const FormReportCentre = () => {

  const user = useGlobalStore((state)=> state.user)
  const token = useGlobalStore((state)=> state.token)

  const [isLoading, setIsLoading] = useState(false)


  useEffect(()=>{

  }, [])


  return (
    <div>

      <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
        <MonitorCheck /> <p className='ml-2'> รายงานผลการประเมินโรงพยาบาลอัจฉริยะ ประจำปีงบประมาณ 2568</p>
      </div>

    </div>
  )
}

export default FormReportCentre