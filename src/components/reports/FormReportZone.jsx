import React, { useEffect, useState } from 'react'
import useGlobalStore from '../../store/global-store'
import { useNavigate } from 'react-router-dom'
import { getListHospitalOnZone } from '../../api/Hospital'
import { getSumEvaluateByZone, selectApproveEvaluate } from '../../api/Evaluate'
import { CheckCircleOutlined } from '@mui/icons-material'
import { CloseCircleOutlined } from '@ant-design/icons'
import { CircleCheck, CircleX } from 'lucide-react'

const FormReportZone = () => {

  const navigate = useNavigate()
  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)

  const [isLoading, setIsLoading] = useState(false)
  const [listHospitals, setListHospitals] = useState([])
  const [listEvaluateByZone, setListEvaluateByZone] = useState([])
  const [expandedRows, setExpandedRows] = useState(null)
  const [expandedRows2, setExpandedRows2] = useState(null)

  const zone = user.zone

  useEffect(() => {
    loadListHospitalByZone(token)
    loadListSumEvaluateByZone(token)
  }, [])


  const loadListHospitalByZone = async () => {
    await getListHospitalOnZone(token, zone)
      .then(res => {
        // console.log('Data: ', res.data)
        setListHospitals(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadListSumEvaluateByZone = async () => {
    setIsLoading(true)
    await getSumEvaluateByZone(token, zone)
      .then(res => {
        setListEvaluateByZone(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  const provData = [...new Map(listHospitals.map(item => [item["provcode", "provname"], item])).values()]
  const hospData = [...new Map(listHospitals.map(item => [item["provcode", "hcode", "hname_th"], item])).values()]

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

  const handleExpandedRow2 = (e) => {
    console.log('Value: ', e)
    var currentExpandedRows = null;
    const isRowExpanded = currentExpandedRows === e ? e : null;
    const newExpandedRows = isRowExpanded
      ? null
      : (currentExpandedRows = e);
    if (expandedRows !== e) {
      setExpandedRows2(newExpandedRows);
    } else {
      setExpandedRows2(null);
    }
  }


  const data = listEvaluateByZone.map((item, k) => ({
    key: k,
    zone: Number(item.zone),
    provcode: item.provcode,
    provname: item.provname,
    hcode: item.hcode,
    hname_th: item.hname_th,
    point_total_cat1: item.point_total_cat1,
    point_require_cat1: item.point_require_cat1,
    ssjapp_cat1: item.ssjapp_cat1,
    zoneapp_cat1: item.zoneapp_cat1,
    point_total_cat2: item.point_total_cat2,
    point_require_cat2: item.point_require_cat2,
    ssjapp_cat2: item.ssjapp_cat2,
    zoneapp_cat2: item.zoneapp_cat2,
    point_total_cat3: item.point_total_cat3,
    point_require_cat3: item.point_require_cat3,
    ssjapp_cat3: item.ssjapp_cat3,
    zoneapp_cat3: item.zoneapp_cat3,
    point_total_cat4: item.point_total_cat4,
    ssjapp_cat4: item.ssjapp_cat4,
    zoneapp_cat4: item.zoneapp_cat4,
    total_cat: item.point_total_cat1 + item.point_total_cat2 + item.point_total_cat3 + item.point_total_cat4,
    total_require: item.point_require_cat1 + item.point_require_cat2 + item.point_require_cat3,
    cyber_level: item.cyber_level,
    cyber_levelname: item.cyber_levelname
  }))


  console.log('Data: ', data)


  return (
    <div>
      <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
        <p className='ml-2'>รายงานผลการประเมินของเขตสุขภาพที่ {Number(zone)} </p>
      </div>

      <div className='bg-white rounded-md shadow-md p-3'>
        <table className='w-full text-left table-fixed text-slate-800'>
          <thead>
            <tr className='text-slate-800 border border-l border-r border-slate-300 bg-slate-50'>
              <th className='text-center p-2 border-r'>รายชื่อจังหวัดในเขตสุขภาพที่ {Number(zone)}</th>
            </tr>
          </thead>
          {
            provData.map((item1, k1) => (
              <tbody>
                <tr key={k1} className='cursor-pointer hover:bg-slate-50 text-sm' onClick={() => handleExpandedRow(k1)}>
                  <td className='border p-1 text-center font-bold text-yellow-700'>
                    <p>{item1.provname}</p>
                  </td>
                </tr>
                {expandedRows === k1 ? (
                  <tr>
                    <td className='border'>
                      <table className='w-full table-fixed text-slate-700' style={{ fontSize: '12px' }}>
                        <thead className='bg-slate-50'>
                          <tr>
                            <th rowSpan={4} className='text-center border'>หน่วยบริการ</th>
                            <th colSpan={4} className='text-center border w-56'>ด้านโครงสร้าง</th>
                            <th colSpan={4} className='text-center border w-56'>ด้านบริหารจัดการ</th>
                            <th colSpan={4} className='text-center border w-56'>ด้านการบริการ</th>
                            <th colSpan={3} className='text-center border w-40'>ด้านบุคลากร</th>
                            <th rowSpan={2} className='text-xs text-center border w-40'>ระดับ Cyber Security</th>
                          </tr>
                          <tr>
                            <th className='text-center border'>คะแนน<br />เต็ม</th>
                            <th className='text-center border'>คะแนน<br />จำเป็น</th>
                            <th className='text-center border'>สสจ.<br />อนุมัติ</th>
                            <th className='text-center border'>เขตฯ.<br />อนุมัติ</th>
                            <th className='text-center border'>คะแนน<br />เต็ม</th>
                            <th className='text-center border'>คะแนน<br />จำเป็น</th>
                            <th className='text-center border'>สสจ.<br />อนุมัติ</th>
                            <th className='text-center border'>เขตฯ.<br />อนุมัติ</th>
                            <th className='text-center border'>คะแนน<br />เต็ม</th>
                            <th className='text-center border'>คะแนน<br />จำเป็น</th>
                            <th className='text-center border'>สสจ.<br />อนุมัติ</th>
                            <th className='text-center border'>เขตฯ.<br />อนุมัติ</th>
                            <th className='text-center border'>คะแนน<br />เต็ม</th>
                            <th className='text-center border'>สสจ.<br />อนุมัติ</th>
                            <th className='text-center border'>เขตฯ.<br />อนุมัติ</th>
                          </tr>
                        </thead>
                        {
                          listHospitals.map((item2, k2) => (
                            item2.provcode === item1.provcode
                              ?
                              <tbody>
                                {
                                  data.map((item3) => (
                                    item3.hcode === item2.hcode
                                      ?
                                      <>
                                        <tr key={k2}>
                                          <td className='border'>
                                            <p className='pl-2'>{item2.hname_th} [{item2.hcode}]</p>
                                          </td>
                                          <td className='border text-center text-blue-600'>
                                            <p className='pl-2'>{item3.point_total_cat1 === null ? 0 : item3.point_total_cat1}</p>
                                          </td>
                                          <td className='border text-center text-blue-600'>
                                            <p className='pl-2'>{item3.point_require_cat1 === null ? 0 : item3.point_require_cat1}</p>
                                          </td>
                                          <td className='border text-center'>
                                            {
                                              item3.ssjapp_cat1 === '1'
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
                                              item3.zoneapp_cat1 === '1'
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

                                          <td className='border text-center text-blue-600'>
                                            <p className='pl-2'>{item3.point_total_cat2 === null ? 0 : item3.point_total_cat2}</p>
                                          </td>
                                          <td className='border text-center text-blue-600'>
                                            <p className='pl-2'>{item3.point_require_cat2 === null ? 0 : item3.point_require_cat2}</p>
                                          </td>
                                          <td className='border text-center text-blue-600'>
                                            {
                                              item3.ssjapp_cat2 === '1'
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
                                              item3.zoneapp_cat2 === '1'
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

                                          <td className='border text-center text-blue-600'>
                                            <p className='pl-2'>{item3.point_total_cat3 === null ? 0 : item3.point_total_cat3}</p>
                                          </td>
                                          <td className='border text-center text-blue-600'>
                                            <p className='pl-2'>{item3.point_require_cat3 === null ? 0 : item3.point_require_cat3}</p>
                                          </td>
                                          <td className='border text-center'>
                                            {
                                              item3.ssjapp_cat3 === '1'
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
                                              item3.zoneapp_cat3 === '1'
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

                                          <td className='border text-center text-blue-600'>
                                            <p className='pl-2'>{item3.point_total_cat4 === null ? 0 : item3.point_total_cat4}</p>
                                          </td>
                                          <td className='border text-center'>
                                            {
                                              item3.ssjapp_cat4 === '1'
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
                                              item3.zoneapp_cat4 === '1'
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
                                              item3.cyber_level === 'GREEN'
                                                ? <p className='text-green-700'>{item3.cyber_levelname}</p>
                                                : item3.cyber_level === 'YELLOW'
                                                  ? <p className='text-yellow-600'>{item3.cyber_levelname}</p>
                                                  : item3.cyber_level === 'RED'
                                                    ? <p className='text-red-500'>{item3.cyber_levelname}</p>
                                                    : null
                                            }
                                          </td>
                                        </tr>
                                      </>
                                      : null
                                  ))
                                }
                              </tbody>
                              : null

                          ))
                        }
                      </table>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            ))
          }
        </table>
      </div>


    </div>
  )
}

export default FormReportZone