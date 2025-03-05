import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGlobalStore from '../../store/global-store'
import { getHospitalOnProv } from '../../api/Hospital'
import { getSumEvaluateByZone } from '../../api/Evaluate'
import { Table } from 'antd'
import { CircleCheck, CircleX } from 'lucide-react'

const FormReportProv = () => {

  const navigate = useNavigate()
  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)

  const [isLoading, setIsLoading] = useState(false)
  const [listHospitals, setListHospitals] = useState([])
  const [listEvaluateByZone, setListEvaluateByZone] = useState([])
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
    await getSumEvaluateByZone(token, zone)
      .then(res => {
        console.log('List: ', res.data)
        setListEvaluateByZone(res.data)
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
        <table className='w-full text-left table-fixed text-slate-800'>
          <thead>
            <tr className='text-md text-slate-500 border border-l border-r border-slate-300 bg-slate-200'>
              <th className='text-center p-2 border-r'>หน่วยบริการที่อยู่ในจังหวัด{province} (คะแนนที่แสดงเป็นคะแนนที่หน่วยบริการประเมินเข้ามา ยังไม่ได้รับการอนุมัติ จาก คกก.จังหวัด)</th>
              <th className='text-center p-2 border-r w-40'>ประเภท</th>
            </tr>
          </thead>
          {
            listHospitals.map((item1, k1) => (
              <tbody>
                <tr className='cursor-pointer bg-slate-100 hover:bg-slate-50' key={k1} onClick={() => handleExpandedRow(k1)}>
                  <td className='border p-1 text-stone-800'>
                    <div className='flex gap-1 pl-4'>
                      <p className='text-sm'>{item1.hname_th}</p>
                      <p className='text-sm'>[{item1.hcode}]</p>
                    </div>
                  </td>
                  <td className='border text-center p-1 text-stone-800'>
                    <p className='text-sm'>{item1.typename}</p>
                  </td>
                </tr>
                {expandedRows === k1 ? (
                  <tr>
                    <td
                      colSpan={2}
                      className='text-center border'
                    >
                      <table className='w-full table-fixed text-slate-700'>
                        <thead className=''>
                          <tr>
                            <th colSpan={2} className='text-xs text-center border w-28 p-1'>ด้านโครงสร้าง</th>
                            <th colSpan={2} className='text-xs text-center border w-28'>ด้านบริหารจัดการ</th>
                            <th colSpan={2} className='text-xs text-center border w-28'>ด้านการบริการ</th>
                            <th colSpan={1} className='text-xs text-center border w-28'>ด้านบุคลากร</th>
                            <th rowSpan={2} className='text-xs text-center border w-28'>ระดับ Cyber Security</th>
                          </tr>
                          <tr>
                            <th className='text-xs text-center border p-1'>คะแนนที่ได้</th>
                            <th className='text-xs text-center border'>คะแนนจำเป็น</th>
                            {/* <th className='text-xs text-center border'>สสจ.<br />อนุมัติ</th>
                            <th className='text-xs text-center border'>เขตฯ.<br />อนุมัติ</th> */}
                            <th className='text-xs text-center border'>คะแนนที่ได้</th>
                            <th className='text-xs text-center border'>คะแนนจำเป็น</th>
                            {/* <th className='text-xs text-center border'>สสจ.<br />อนุมัติ</th>
                            <th className='text-xs text-center border'>เขตฯ.<br />อนุมัติ</th> */}
                            <th className='text-xs text-center border'>คะแนนที่ได้</th>
                            <th className='text-xs text-center border'>คะแนนจำเป็น</th>
                            {/* <th className='text-xs text-center border'>สสจ.<br />อนุมัติ</th>
                            <th className='text-xs text-center border'>เขตฯ.<br />อนุมัติ</th> */}
                            <th className='text-xs text-center border'>คะแนนที่ได้</th>
                            {/* <th className='text-xs text-center border'>สสจ.<br />อนุมัติ</th>
                            <th className='text-xs text-center border'>เขตฯ.<br />อนุมัติ</th> */}
                          </tr>
                        </thead>
                        <tbody className=''>
                          {
                            listEvaluateByZone.map((item2) =>
                              item1.hcode === item2.hcode
                                ?
                                <>
                                  <tr className='text-xs font-bold'>
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
                                    {/* <td className='border text-center'>
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
                                    </td> */}

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
                                    {/* <td className='border text-center'>
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
                                    </td> */}

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
                                    {/* <td className='border text-center'>
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
                                    </td> */}

                                    <td className='border text-center'>
                                      {
                                        item2.point_total_cat4 === null
                                          ? <p className='text-red-500'>0</p>
                                          : <p className='text-blue-600'>{item2.point_total_cat4}</p>
                                      }
                                    </td>
                                    {/* <td className='border text-center'>
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
                                    </td> */}

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
                                </>
                                :
                                <>
                                  {/* <div className='text-center'>
                                    <p className='text-orange-600'>ยังไม่พบข้อมูลการประเมิน</p>
                                  </div> */}
                                </>
                            )
                          }
                        </tbody>
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

export default FormReportProv