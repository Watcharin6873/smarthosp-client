import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGlobalStore from '../../store/global-store'
import { getHospitalOnProv } from '../../api/Hospital'
import { getSumEvaluateByProv, getSumEvaluateByZone } from '../../api/Evaluate'
import { Table } from 'antd'
import { CircleCheck, CircleX } from 'lucide-react'

const FormReportProv = () => {

  const navigate = useNavigate()
  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)

  const [isLoading, setIsLoading] = useState(false)
  const [listHospitals, setListHospitals] = useState([])
  const [listEvaluateByProv, setListEvaluateByProv] = useState([])
  const [expandedRows, setExpandedRows] = useState(null)

  const province = user.province
  const zone = user.zone

  useEffect(() => {
    loadListHospitals(token)
    loadListSumEvaluateByZone(token)
  }, [])

  const loadListHospitals = async () => {
    await getHospitalOnProv(token, province)
      .then(res => {
        console.log(res.data)
        setListHospitals(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadListSumEvaluateByZone = async () => {
    await getSumEvaluateByProv(token, province)
      .then(res => {
        console.log('List: ', res.data)
        setListEvaluateByProv(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleExpandedRow = (e) => {
    console.log('Value: ', e)
    var currentExpandedRows = null;
    const isRowExpanded = currentExpandedRows === e ? e : null;
    const newExpandedRows = isRowExpanded
      ? null
      : (currentExpandedRows = e);
    if (expandedRows !== e) {
      setExpandedRows(newExpandedRows);
    } else {
      setExpandedRows(null);
    }
  }


  return (
    <div>

      <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
        <p className='ml-2'>รายงานผลการประเมิน</p>
      </div>

      <div className='bg-white rounded-md shadow-md p-3'>

        <table className='w-full table-fixed text-slate-700'>
          <thead className=''>
            <tr style={{backgroundColor:'#388e3c', color:'white'}}>
              <th rowSpan={2} className='text-xs text-center border w-10 p-1'>เขตสุขภาพ</th>
              <th rowSpan={2} className='text-xs text-center border w-14'>จังหวัด</th>
              <th rowSpan={2} className='text-xs text-center border w-28'>หน่วยบริการ</th>
              <th colSpan={4} className='text-xs text-center border w-28 p-1'>ด้านโครงสร้าง</th>
              <th colSpan={4} className='text-xs text-center border w-28'>ด้านบริหารจัดการ</th>
              <th colSpan={4} className='text-xs text-center border w-28'>ด้านการบริการ</th>
              <th colSpan={3} className='text-xs text-center border w-28'>ด้านบุคลากร</th>
              <th rowSpan={2} className='text-xs text-center border w-28'>ระดับ Cyber Security</th>
            </tr>
            <tr style={{backgroundColor:'#388e3c', color:'white'}}>
              <th className='text-xs text-center border p-1'>คะแนนที่ได้</th>
              <th className='text-xs text-center border'>คะแนนจำเป็น</th>
              <th className='text-xs text-center border'>สสจ.<br />อนุมัติ</th>
              <th className='text-xs text-center border'>เขตฯ.<br />อนุมัติ</th>
              <th className='text-xs text-center border'>คะแนนที่ได้</th>
              <th className='text-xs text-center border'>คะแนนจำเป็น</th>
              <th className='text-xs text-center border'>สสจ.<br />อนุมัติ</th>
              <th className='text-xs text-center border'>เขตฯ.<br />อนุมัติ</th>
              <th className='text-xs text-center border'>คะแนนที่ได้</th>
              <th className='text-xs text-center border'>คะแนนจำเป็น</th>
              <th className='text-xs text-center border'>สสจ.<br />อนุมัติ</th>
              <th className='text-xs text-center border'>เขตฯ.<br />อนุมัติ</th>
              <th className='text-xs text-center border'>คะแนนที่ได้</th>
              <th className='text-xs text-center border'>สสจ.<br />อนุมัติ</th>
              <th className='text-xs text-center border'>เขตฯ.<br />อนุมัติ</th>
            </tr>
          </thead>
          <tbody className=''>
            {
              listEvaluateByProv.map((item2) =>
                <tr className='text-xs font-bold'>
                  <td className='border text-center'>
                    <p>{Number(item2.zone)}</p>
                  </td>
                  <td className='border text-center'>
                  <p>{item2.provname}</p>
                  </td>
                  <td className='border pl-1'>
                    <p>{item2.hname_th} [{item2.hcode}]</p>
                  </td>
                  <td className='border text-center p-1'>
                    {
                      item2.point_total_cat1 === null
                        ? <p className='text-red-500'>0</p>
                        : <p className='text-blue-600'>{item2.point_total_cat1}</p>
                    }
                  </td>
                  <td className='border text-center'>
                    {
                      item2.point_require_cat1 === null
                        ? <p className='text-red-500'>0</p>
                        : <p className='text-blue-600'>{item2.point_require_cat1}</p>
                    }
                  </td>
                  <td className='border text-center'>
                    {
                      item2.ssjapp_cat1 === '1'
                        ?
                        <div className='text-green-600 flex justify-center'>
                          <CircleCheck size={12} />
                        </div>
                        :
                        <div className='text-red-500 flex justify-center'>
                          <CircleX size={12} />
                        </div>
                    }
                  </td>
                  <td className='border text-center'>
                    {
                      item2.zoneapp_cat1 === '1'
                        ?
                        <div className='text-green-600 flex justify-center'>
                          <CircleCheck size={12} />
                        </div>
                        :
                        <div className='text-red-500 flex justify-center'>
                          <CircleX size={12} />
                        </div>
                    }
                  </td>

                  <td className='border text-center'>
                    {
                      item2.point_total_cat2 === null
                        ? <p className='text-red-500'>0</p>
                        : <p className='text-blue-600'>{item2.point_total_cat2}</p>
                    }
                  </td>
                  <td className='border text-center'>
                    {
                      item2.point_require_cat2 === null
                        ? <p className='text-red-500'>0</p>
                        : <p className='text-blue-600'>{item2.point_require_cat2}</p>
                    }
                  </td>
                  <td className='border text-center'>
                    {
                      item2.ssjapp_cat2 === '1'
                        ?
                        <div className='text-green-600 flex justify-center'>
                          <CircleCheck size={12} />
                        </div>
                        :
                        <div className='text-red-500 flex justify-center'>
                          <CircleX size={12} />
                        </div>
                    }
                  </td>
                  <td className='border text-center'>
                    {
                      item2.zoneapp_cat2 === '1'
                        ?
                        <div className='text-green-600 flex justify-center'>
                          <CircleCheck size={12} />
                        </div>
                        :
                        <div className='text-red-500 flex justify-center'>
                          <CircleX size={12} />
                        </div>
                    }
                  </td>

                  <td className='border text-center'>
                    {
                      item2.point_total_cat3 === null
                        ? <p className='text-red-500'>0</p>
                        : <p className='text-blue-600'>{item2.point_total_cat3}</p>
                    }
                  </td>
                  <td className='border text-center'>
                    {
                      item2.point_require_cat3 === null
                        ? <p className='text-red-500'>0</p>
                        : <p className='text-blue-600'>{item2.point_require_cat3}</p>
                    }
                  </td>
                  <td className='border text-center'>
                    {
                      item2.ssjapp_cat4 === '1'
                        ?
                        <div className='text-green-600 flex justify-center'>
                          <CircleCheck size={12} />
                        </div>
                        :
                        <div className='text-red-500 flex justify-center'>
                          <CircleX size={12} />
                        </div>
                    }
                  </td>
                  <td className='border text-center'>
                    {
                      item2.zoneapp_cat4 === '1'
                        ?
                        <div className='text-green-600 flex justify-center'>
                          <CircleCheck size={12} />
                        </div>
                        :
                        <div className='text-red-500 flex justify-center'>
                          <CircleX size={12} />
                        </div>
                    }
                  </td>

                  <td className='border text-center'>
                    {
                      item2.point_total_cat4 === null
                        ? <p className='text-red-500'>0</p>
                        : <p className='text-blue-600'>{item2.point_total_cat4}</p>
                    }
                  </td>
                  <td className='border text-center'>
                    {
                      item2.ssjapp_cat4 === '1'
                        ?
                        <div className='text-green-600 flex justify-center'>
                          <CircleCheck size={12} />
                        </div>
                        :
                        <div className='text-red-500 flex justify-center'>
                          <CircleX size={12} />
                        </div>
                    }
                  </td>
                  <td className='border text-center'>
                    {
                      item2.zoneapp_cat4 === '1'
                        ?
                        <div className='text-green-600 flex justify-center'>
                          <CircleCheck size={12} />
                        </div>
                        :
                        <div className='text-red-500 flex justify-center'>
                          <CircleX size={12} />
                        </div>
                    }
                  </td>

                  <td className='border text-center'>
                    {
                      item2.cyber_level === 'GREEN'
                        ? <p className='text-green-700'>{item2.cyber_levelname}</p>
                        : item2.cyber_level === 'YELLOW'
                          ? <p className='text-yellow-600'>{item2.cyber_levelname}</p>
                          : item2.cyber_level === 'RED'
                            ? <p className='text-red-500'>{item2.cyber_levelname}</p>
                            : null
                    }
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default FormReportProv