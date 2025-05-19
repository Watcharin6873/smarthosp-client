import React, { useEffect, useState } from 'react'
import Gem from '../../assets/Blue-gem.png'
import Gold from '../../assets/Gold2.png'
import Silver from '../../assets/Silver2.png'
import { Blocks, HandPlatter, MonitorCog, UserRound } from 'lucide-react'
import useGlobalStore from '../../store/global-store'
import {
  getCyberSecurityLevelData,
  getListEvaluateByHosp2,
  getSubQuetList,
  sumEvaluateByHosp,
  getListEvaluateByHosp3
} from '../../api/Evaluate'
import { ArrowUpOutlined } from '@ant-design/icons'


const HomeUsers = () => {
  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)
  const [listPoint, setListPoint] = useState([])
  const [listPoint2, setListPoint2] = useState([])
  const [cyberData, setCyberData] = useState()
  const [listEvaluate, setListEvaluate] = useState([])
  const [subQuestList, setSubQuestList] = useState([])


  useEffect(() => {
    loadListPoint(token)
    loadCyberSecurityData(token)
    loadSubQuestList(token)
    loadListEvaluate(token)
    loadListEvaluateByHosp3(token)
  }, [])

  const hcode = user.hcode
  const loadSubQuestList = async () => {
    await getSubQuetList(token)
      .then(res => {
        setSubQuestList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadListEvaluate = async () => {
    await getListEvaluateByHosp2(token, hcode)
      .then(res => {
        // console.log('Data: ', res.data)
        setListEvaluate(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadListEvaluateByHosp3 = async () => {
    await getListEvaluateByHosp3(token, hcode)
      .then(res => {
        // console.log('Data3: ', res.data)
        setListPoint2(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const dataListEvaluste = listEvaluate.map((item) => ({
    id: item.id,
    category_questId: item.category_questId,
    questId: item.questId,
    sub_questId: item.sub_questId,
    sub_quest_name: item.sub_quests.sub_quest_name,
    check: item.check.split(","),
    hcode: item.hcode,
    userId: item.userId,
    file_name: item.file_name,
    ssj_approve: item.ssj_approve,
    zone_approve: item.zone_approve,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }))

  const dataSubQuestLists = subQuestList.map((item) => ({
    id: item.id,
    sub_questId: item.sub_questId,
    choice: item.choice,
    sub_quest_listname: item.sub_quest_listname,
    sub_quest_total_point: item.sub_quest_total_point,
    sub_quest_require_point: item.sub_quest_require_point,
    description: item.description,
    necessary: item.necessary,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }))

  const result = dataSubQuestLists.map((item1) =>
    dataListEvaluste.map((item2) =>
      item1.choice === item2.check
    )
  )

  // console.log('Data: ', dataListEvaluste)

  const loadListPoint = async () => {
    await sumEvaluateByHosp(token, hcode)
      .then(res => {
        // console.log('ListPoint: ', res.data)
        setListPoint(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadCyberSecurityData = async () => {
    await getCyberSecurityLevelData(token, user.hcode)
      .then(res => {
        setCyberData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const dataSource = listPoint2.map((item) => ({
    category_questId: Number(item.category_questId),
    sub_quest_require_point: Number(item.sub_quest_require_point),
    sub_quest_total_point: Number(item.sub_quest_total_point)
  }))



  //Category
  const infraScore = dataSource.filter((item) => item.category_questId === 1)
  const manageScore = dataSource.filter((item) => item.category_questId === 2)
  const serviceScore = dataSource.filter((item) => item.category_questId === 3)
  const peopleScore = dataSource.filter((item) => item.category_questId === 4)

  //Aprove
  const infraListData = dataListEvaluste.filter((item) => item.category_questId === 1)
  const manageListData = dataListEvaluste.filter((item) => item.category_questId === 2)
  const serviceListData = dataListEvaluste.filter((item) => item.category_questId === 3)
  const peopleListData = dataListEvaluste.filter((item) => item.category_questId === 4)

  //unique Data
  const uniqueInfraData = [...new Map(infraListData.map(item => [item['ssj_approve', 'zone_approve'], item])).values()]
  const uniqueManageData = [...new Map(manageListData.map(item => [item['ssj_approve', 'zone_approve'], item])).values()]
  const uniqueServiceData = [...new Map(serviceListData.map(item => [item['ssj_approve', 'zone_approve'], item])).values()]
  const uniquePeopleData = [...new Map(peopleListData.map(item => [item['ssj_approve', 'zone_approve'], item])).values()]

  // console.log('Approve: ', uniqueInfraData[0].zone_approve)

  const sumTotalPoint = listPoint2.reduce((a, v) => a + Number(v.sub_quest_total_point), 0)
  const sumRequirePoint = listPoint2.reduce((a, v) => a + Number(v.sub_quest_require_point), 0)

  const initialPoint = 800
  const initialRequirePoint = 500
  const initialCyber = 'Green'

  return (
    <div>

      <div className='grid grid-cols-3 gap-2'>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex justify-center items-center gap-2'>
            <p className='text-2xl text-green-700 font-bold'>คะแนนที่ได้อยู่ในระดับ</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3'>
            {
              sumTotalPoint < 600
                ?
                <div style={{ textAlign: 'center' }}>
                  <p className='text-4xl font-bold text-red-500'>ไม่ผ่าน!</p>
                </div>
                : sumTotalPoint >= 600 && sumTotalPoint < 700
                  ?
                  <div style={{ textAlign: 'center' }}>
                    <p className='text-4xl font-bold text-slate-400'>เงิน</p>
                    <div className='flex justify-center mt-2'>
                      <img className='w-32' src={Silver} alt='Gem' />
                    </div>
                  </div>
                  : sumTotalPoint >= 700 && sumRequirePoint < 500
                    ?
                    <div style={{ textAlign: 'center' }}>
                      <p className='text-4xl font-bold text-slate-400'>เงิน</p>
                      <div className='flex justify-center mt-2'>
                        <img className='w-32' src={Silver} alt='Gem' />
                      </div>
                    </div>
                    : sumTotalPoint >= 700 && sumTotalPoint < 800 && sumRequirePoint == 500
                      ?
                      <div style={{ textAlign: 'center' }}>
                        <p className='text-4xl font-bold text-yellow-600'>ทอง</p>
                        <div className='flex justify-center mt-2'>
                          <img className='w-32' src={Gold} alt='Gem' />
                        </div>
                      </div>
                      : sumTotalPoint >= 800 && sumRequirePoint < 500
                        ?
                        <div style={{ textAlign: 'center' }}>
                          <p className='text-4xl font-bold text-slate-400'>เงิน</p>
                          <div className='flex justify-center mt-2'>
                            <img className='w-32' src={Silver} alt='Gem' />
                          </div>
                        </div>
                        : sumTotalPoint >= 800 && sumRequirePoint == 500 && cyberData?.cyber_level != 'GREEN'
                          ?
                          <div style={{ textAlign: 'center' }}>
                            <p className='text-4xl font-bold text-yellow-600'>ทอง</p>
                            <div className='flex justify-center mt-2'>
                              <img className='w-32' src={Gold} alt='Gem' />
                            </div>
                          </div>
                          : sumTotalPoint >= 800 && sumRequirePoint == 500 && cyberData?.cyber_level == 'GREEN'
                            ?
                            <div style={{ textAlign: 'center' }}>
                              <p className='text-4xl font-bold text-orange-400'>เพชร</p>
                              <div className='flex justify-center mt-2'>
                                <img className='w-32' src={Gem} alt='Gem' />
                              </div>
                            </div>
                            : null

            }
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <div className='w-12 h-12 bg-amber-50 rounded-full shadow-md flex justify-center items-center'>
              <Blocks className='text-green-700' size={30} />
            </div>
            <p className='text-2xl text-green-700 font-bold'>ด้านโครงสร้าง</p>
          </div>
          <div className='flex justify-center items-baseline gap-1 my-3'>
            <div className='w-36 text-center border rounded-md p-5'>
              <p className=''>คะแนนที่ได้</p>
              {
                infraScore.map((item4) => (
                  item4.total_point === null
                    ? <p className='text-2xl text-blue-700'>0/300</p>
                    : <p className='text-2xl text-blue-700'>{item4.sub_quest_total_point}/300</p>
                ))
              }
              {
                infraScore.map((item4) => (
                  <p className='text-sm mt-2'>คิดเป็น {(item4.sub_quest_total_point / 300 * 100).toFixed(1)} %</p>
                ))
              }
            </div>
            <div className='w-36 text-center border rounded-md p-5'>
              <p className=''>คะแนนจำเป็น</p>
              {
                infraScore.map((item) => (
                  item.require_point === null
                    ? <p className='text-2xl text-green-700'>0/170</p>
                    : <p className='text-2xl text-green-700'>{item.sub_quest_require_point}/170</p>
                ))
              }
              {
                infraScore.map((item4) => (
                  <p className='text-sm mt-2'>คิดเป็น {(item4.sub_quest_require_point / 170 * 100).toFixed(1)} %</p>
                ))
              }
            </div>
          </div>

          <div className='flex justify-between text-sm'>
            <p className='text-slate-400'>การอนุมัติ(คกก.สสจ.) : </p>
            {
              uniqueInfraData?.map(f =>
                f.ssj_approve == true
                  ? <p className='text-green-500'>อนุมัติแล้ว</p>
                  : <p className='text-red-500'>ยังไม่อนุมัติ</p>
              )
            }

          </div>
          <div className='flex justify-between text-sm'>
            <p className='text-slate-400'>การอนุมัติ(คกก.เขตฯ.) : </p>
            {
              uniqueInfraData?.map(f =>
                f.zone_approve === true
                  ? <p className='text-green-500'>อนุมัติแล้ว</p>
                  : <p className='text-red-500'>ยังไม่อนุมัติ</p>
              )
            }
          </div>

        </div>
        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <div className='w-12 h-12 bg-amber-50 rounded-full shadow-md flex justify-center items-center'>
              <MonitorCog className='text-green-700' size={30} />
            </div>
            <p className='text-2xl text-green-700 font-bold'>ด้านบริหารจัดการ</p>
          </div>
          <div className='flex justify-center items-baseline gap-1 my-3'>
            <div className='w-36 text-center border rounded-md p-5'>
              <p className=''>คะแนนที่ได้</p>
              {
                manageScore.map((item4) => (
                  item4.total_point === null
                    ? <p className='text-2xl text-blue-700'>0/300</p>
                    : <p className='text-2xl text-blue-700'>{item4.sub_quest_total_point}/300</p>
                ))
              }
              {
                manageScore.map((item4) => (
                  <p className='text-sm mt-2'>คิดเป็น {(item4.sub_quest_total_point / 300 * 100).toFixed(1)} %</p>
                ))
              }
            </div>
            <div className='w-36 text-center border rounded-md p-5'>
              <p className=''>คะแนนจำเป็น</p>
              {
                manageScore.map((item) => (
                  item.require_point === null
                    ? <p className='text-2xl text-green-700'>0/160</p>
                    : <p className='text-2xl text-green-700'>{item.sub_quest_require_point}/160</p>
                ))
              }
              {
                manageScore.map((item4) => (
                  <p className='text-sm mt-2'>คิดเป็น {(item4.sub_quest_require_point / 160 * 100).toFixed(1)} %</p>
                ))
              }
            </div>
          </div>

          <div className='flex justify-between text-sm'>
            <p className='text-slate-400'>การอนุมัติ(คกก.สสจ.) : </p>
            {
              uniqueManageData?.map(f =>
                f.ssj_approve == true
                  ? <p className='text-green-500'>อนุมัติแล้ว</p>
                  : <p className='text-red-500'>ยังไม่อนุมัติ</p>
              )
            }

          </div>
          <div className='flex justify-between text-sm'>
            <p className='text-slate-400'>การอนุมัติ(คกก.เขตฯ.) : </p>
            {
              uniqueManageData?.map(f =>
                f.zone_approve === true
                  ? <p className='text-green-500'>อนุมัติแล้ว</p>
                  : <p className='text-red-500'>ยังไม่อนุมัติ</p>
              )
            }
          </div>

        </div>
        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex justify-center items-center gap-2'>
            <p className='text-2xl text-green-700 font-bold'>คะแนนรวมทุกด้าน</p>
          </div>
          <div className='p-2 mt-10 flex justify-between'>
            <div className='text-slate-400'><p>คะแนนที่ได้รวม</p></div>
            <div className='flex text-green-700'>
              {
                sumTotalPoint < 600
                  ? <p className='text-red-500'>{sumTotalPoint}</p>
                  : sumTotalPoint >= 600 && sumTotalPoint < 700
                    ? <p className='text-slate-400'>{sumTotalPoint}</p>
                    : sumTotalPoint >= 700 && sumTotalPoint < 800
                      ? <p className='text-yellow-600'>{sumTotalPoint}</p>
                      : sumTotalPoint >= 800
                        ? <p className='text-green-700'>{sumTotalPoint}</p>
                        : null

              }
            </div>
          </div>
          <div className='p-2 flex justify-between'>
            <div className='text-slate-400'><p>คะแนนจำเป็นรวม</p></div>
            <div className='flex text-green-700'>
              {
                sumRequirePoint < 500
                  ? <p className='text-red-500'>{sumRequirePoint}</p>
                  : <p className='text-green-700'>{sumRequirePoint}</p>
              }
            </div>
          </div>
          <div className='p-2 flex justify-between'>
            <div className='text-slate-400'><p>ระดับ Cyber security</p></div>
            <div className='flex text-green-700'>
              {/* <p className='text-red-500'>-</p> */}
              {
                cyberData?.cyber_level === 'GREEN'
                  ? <p className='text-green-700'>{cyberData?.cyber_levelname}</p>
                  : cyberData?.cyber_level === 'YELLOW'
                    ? <p className='text-yellow-400'>{cyberData?.cyber_levelname}</p>
                    : cyberData?.cyber_level === 'RED'
                      ? <p className='text-red-500'>{cyberData?.cyber_levelname}</p>
                      : <p className='text-red-500'>-</p>
              }
            </div>
          </div>
        </div>
        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <div className='w-12 h-12 bg-amber-50 rounded-full shadow-md flex justify-center items-center'>
              <HandPlatter className='text-green-700' size={30} />
            </div>
            <p className='text-2xl text-green-700 font-bold'>ด้านการบริการ</p>
          </div>
          <div className='flex justify-center items-baseline gap-1 my-3'>
            <div className='w-36 text-center border rounded-md p-5'>
              <p className=''>คะแนนที่ได้</p>
              {
                serviceScore.map((item4) => (
                  item4.total_point === null
                    ? <p className='text-2xl text-blue-700'>0/300</p>
                    : <p className='text-2xl text-blue-700'>{item4.sub_quest_total_point}/300</p>
                ))
              }
              {
                serviceScore.map((item4) => (
                  <p className='text-sm mt-2'>คิดเป็น {(item4.sub_quest_total_point / 300 * 100).toFixed(1)} %</p>
                ))
              }
            </div>
            <div className='w-36 text-center border rounded-md p-5'>
              <p className=''>คะแนนจำเป็น</p>
              {
                serviceScore.map((item) => (
                  item.require_point === null
                    ? <p className='text-2xl text-green-700'>0/170</p>
                    : <p className='text-2xl text-green-700'>{item.sub_quest_require_point}/170</p>
                ))
              }
              {
                serviceScore.map((item4) => (
                  <p className='text-sm mt-2'>คิดเป็น {(item4.sub_quest_require_point / 170 * 100).toFixed(1)} %</p>
                ))
              }
            </div>
          </div>

          <div className='flex justify-between text-sm'>
            <p className='text-slate-400'>การอนุมัติ(คกก.สสจ.) : </p>
            {
              uniqueServiceData?.map(f =>
                f.ssj_approve == true
                  ? <p className='text-green-500'>อนุมัติแล้ว</p>
                  : <p className='text-red-500'>ยังไม่อนุมัติ</p>)
            }

          </div>
          <div className='flex justify-between text-sm'>
            <p className='text-slate-400'>การอนุมัติ(คกก.เขตฯ.) : </p>
            {
              uniqueServiceData?.map(f =>
                f.zone_approve === true
                  ? <p className='text-green-500'>อนุมัติแล้ว</p>
                  : <p className='text-red-500'>ยังไม่อนุมัติ</p>
              )
            }
          </div>

        </div>
        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <div className='w-12 h-12 bg-amber-50 rounded-full shadow-md flex justify-center items-center'>
              <UserRound className='text-green-700' size={30} />
            </div>
            <p className='text-2xl text-green-700 font-bold'>ด้านบุคลากร</p>
          </div>
          <div className='flex justify-center items-baseline gap-1 my-3'>
            <div className='w-36 text-center border rounded-md p-5'>
              <p className=''>คะแนนที่ได้</p>
              {
                peopleScore.map((item4) => (
                  item4.total_point === null
                    ? <p className='text-2xl text-blue-700'>0/100</p>
                    : <p className='text-2xl text-blue-700'>{item4.sub_quest_total_point}/100</p>
                ))
              }
              {
                peopleScore.map((item4) => (
                  <p className='text-sm mt-2'>คิดเป็น {(item4.sub_quest_total_point / 100 * 100).toFixed(1)} %</p>
                ))
              }
            </div>
          </div>

          <div className='flex justify-between text-sm'>
            <p className='text-slate-400'>การอนุมัติ(คกก.สสจ.) : </p>
            {
              uniquePeopleData?.map(f =>
                f.ssj_approve == true
                  ? <p className='text-green-500'>อนุมัติแล้ว</p>
                  : <p className='text-red-500'>ยังไม่อนุมัติ</p>
              )
            }

          </div>
          <div className='flex justify-between text-sm'>
            <p className='text-slate-400'>การอนุมัติ(คกก.เขตฯ.) : </p>
            {
              uniquePeopleData?.map(f =>
                f.zone_approve === true
                  ? <p className='text-green-500'>อนุมัติแล้ว</p>
                  : <p className='text-red-500'>ยังไม่อนุมัติ</p>
              )
            }
          </div>

        </div>

      </div>

    </div>
  )
}

export default HomeUsers