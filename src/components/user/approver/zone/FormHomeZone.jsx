import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGlobalStore from '../../../../store/global-store'
import Gem from '../../../../assets/Blue-gem.png'
import Gold from '../../../../assets/Gold2.png'
import Silver from '../../../../assets/Silver2.png'
import HospitalIcon from '../../../../assets/Hospital.png'
import { Ban, Hospital, UserPlus, Users } from 'lucide-react'
import { getListHospitalOnZone } from '../../../../api/Hospital'
import { getListEvaluateByZone, sumEvaluateAll } from '../../../../api/Evaluate'
import { approveUserOnZone, notApproveUserOnZone } from '../../../../api/User'
import { ArrowUpOutlined } from '@ant-design/icons'
import TableZoneList from './TableZoneList'

const FormHomeZone = () => {

  const navigate = useNavigate()
  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)

  const [isLoading, setIsLoading] = useState(false)
  const [listHospitalOfZone, setListHospitalOfZone] = useState([])
  const [listEvaluateByZone, setListEvaluateByZone] = useState([])
  const [isApproveUser, setIsApproveUser] = useState([])
  const [isNotApproveUser, setIsNotApproveUser] = useState([])
  const [totalSumEvaluate, setTotalSumEvaluate] = useState([])


  const zone = user.zone

  useEffect(() => {
    loadListHospitalOfZone(token)
    loadListEvaluateByZone(token)
    loadApproveUser(token)
    loadNotApproveUser(token)
    loadTotalSumEvaluate()
  }, [])

  const loadListHospitalOfZone = async () => {
    await getListHospitalOnZone(token, zone)
      .then(res => {
        setListHospitalOfZone(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadListEvaluateByZone = async () => {
    await getListEvaluateByZone(token, zone)
      .then(res => {
        setListEvaluateByZone(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const listEvaluateZoneData = listEvaluateByZone.map((item) => ({
    id: item.id,
    category_questId: item.category_questId,
    questId: item.questId,
    sub_questId: item.sub_questId,
    quest_name: item.quests.quest_name,
    sub_quest_name: item.sub_quests.sub_quest_name,
    sub_quest_list: item.sub_quests.sub_quest_lists,
    check: item.check,
    file_name: item.file_name,
    ssj_approve: item.ssj_approve,
    zone_approve: item.zone_approve,
    hcode: item.hcode,
    hname_th: item.hospitals.hname_th,
    provcode: item.hospitals.provcode,
    provname: item.hospitals.provname,
    users_id: item.userId,
    users_firstname_th: item.users.firstname_th,
    users_lastname_th: item.users.lastname_th,
  }))

  const evaluateCat1 = listEvaluateZoneData.filter((item) => item.category_questId === 1)
  const evaluateCat2 = listEvaluateZoneData.filter((item) => item.category_questId === 2)
  const evaluateCat3 = listEvaluateZoneData.filter((item) => item.category_questId === 3)
  const evaluateCat4 = listEvaluateZoneData.filter((item) => item.category_questId === 4)

  const listEvaluateHospCat1 = [...new Map(evaluateCat1.map(item => [item['hcode'], item])).values()]
  const listEvaluateHospCat2 = [...new Map(evaluateCat2.map(item => [item['hcode'], item])).values()]
  const listEvaluateHospCat3 = [...new Map(evaluateCat3.map(item => [item['hcode'], item])).values()]
  const listEvaluateHospCat4 = [...new Map(evaluateCat4.map(item => [item['hcode'], item])).values()]

  const cat1Approve = listEvaluateHospCat1.filter((item) => item.zone_approve === true)
  const cat2Approve = listEvaluateHospCat2.filter((item) => item.zone_approve === true)
  const cat3Approve = listEvaluateHospCat3.filter((item) => item.zone_approve === true)
  const cat4Approve = listEvaluateHospCat4.filter((item) => item.zone_approve === true)

  const loadApproveUser = async () => {
    await approveUserOnZone(token, zone)
      .then(res => {
        setIsApproveUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadNotApproveUser = async () => {
    await notApproveUserOnZone(token, zone)
      .then(res => {
        setIsNotApproveUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadTotalSumEvaluate = async () => {
    await sumEvaluateAll()
      .then(res => {
        // console.log('Total: ', res.data)
        setTotalSumEvaluate(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const sumEvaluateData = totalSumEvaluate.filter(f => f.zone === zone)

  const totalSumEvaluateData = sumEvaluateData.map((item) => ({
    zone: item.zone,
    provcode: item.provcode,
    provname: item.provname,
    hcode: item.hcode,
    hname_th: item.hname_th,
    sumTotalPoint: item.sub_quest_total_point,
    sumRequirePoint: item.sub_quest_require_point,
    cyber_level: item.cyber_level,
    cyber_levelname: item.cyber_levelname
  }))

  // console.log('Hosp: ', totalSumEvaluateData)

  const gemLevel = totalSumEvaluateData.filter(f => f.sumTotalPoint >= 800 && f.sumRequirePoint == 510 && f.cyber_level == 'GREEN')
  const goldLevel = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint == 510) ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint == 510 && f.cyber_level != 'GREEN')
  )
  const silverLevel = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 600 && f.sumTotalPoint < 700) ||
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint < 510) ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint < 510)
  )
  const notPassLevel = totalSumEvaluateData.filter(f => f.sumTotalPoint < 600)
  const hospNotEvaluate = listHospitalOfZone.length - totalSumEvaluateData.length

  const gemPer = (gemLevel.length / listHospitalOfZone.length) * 100
  const goldPer = (goldLevel.length / listHospitalOfZone.length) * 100
  const silverPer = (silverLevel.length / listHospitalOfZone.length) * 100
  const hospNotPer = (hospNotEvaluate / listHospitalOfZone.length) * 100
  const notPassPer = (notPassLevel.length / listHospitalOfZone.length) * 100


  return (
    <div>
      <div className='grid grid-cols-5 gap-2'>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <img
              className='bg-amber-50 w-12 rounded-full shadow-md'
              src={Gem}
              alt='Gem'
            />
            <p className='text-2xl text-blue-500 font-bold'>ระดับเพชร</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3 text-blue-500'>
            <p className='text-4xl'>{gemLevel.length}</p>
            <p>แห่ง</p>
          </div>
          <div className='p-2 flex justify-between'>
            <div className='text-blue-500'><p>คิดเป็น</p></div>
            <div className='flex text-blue-500'><p>{gemPer.toFixed(1)} % </p></div>
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <img
              className='bg-amber-50 w-12 rounded-full shadow-md'
              src={Gold}
              alt='Gold'
            />
            <p className='text-2xl text-yellow-500 font-bold'>ระดับทอง</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3 text-yellow-500'>
            <p className='text-4xl'>{goldLevel.length}</p>
            <p>แห่ง</p>
          </div>
          <div className='p-2 flex justify-between text-yellow-500'>
            <div><p>คิดเป็น</p></div>
            <div><p>{goldPer.toFixed(1)} % </p></div>
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <img
              className='bg-amber-50 w-12 rounded-full shadow-md'
              src={Silver}
              alt='Silver'
            />
            <p className='text-2xl text-slate-400 font-bold'>ระดับเงิน</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3 text-slate-400'>
            <p className='text-4xl'>{silverLevel.length}</p>
            <p>แห่ง</p>
          </div>
          <div className='p-2 flex justify-between text-slate-400'>
            <div><p>คิดเป็น</p></div>
            <div><p>{silverPer.toFixed(1)} % </p></div>
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <div className='flex justify-center items-center bg-amber-50 w-12 h-12 rounded-full shadow-md'>
              <Ban size={40} className='text-red-500' />
            </div>
            <p className='text-2xl text-red-500 font-bold'>ไม่ผ่าน</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3 text-red-500'>
            <p className='text-4xl'>{notPassLevel.length}</p>
            <p>แห่ง</p>
          </div>
          <div className='p-2 flex justify-between  text-red-500'>
            <div><p>คิดเป็น</p></div>
            <div><p>{notPassPer.toFixed(1)} % </p></div>
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <img
              className='bg-amber-50 w-12 rounded-full shadow-md'
              src={HospitalIcon}
              alt='HospitalIcon'
            />
            <p className='text-2xl text-orange-400 font-bold'>ยังไม่ประเมิน</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3 text-orange-400'>
            <p className='text-4xl'>{hospNotEvaluate}</p>
            <p>แห่ง</p>
          </div>
          <div className='p-2 flex justify-between text-orange-400'>
            <div><p>คิดเป็น</p></div>
            <div><p>{hospNotPer.toFixed(1)} % </p></div>
          </div>
        </div>

      </div>

      <div className='grid grid-cols-5 gap-2 mt-2'>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex justify-center gap-2 p-1'>
            <Hospital /><p className='text-green-800 text-xl font-bold'>ด้านโครงสร้าง</p>
          </div>
          <div className='flex justify-between items-baseline gap-1 p-1 text-blue-600'>
            <p className=''>ประเมินแล้ว</p>
            <p className=''>{listEvaluateHospCat1.length} แห่ง</p>
          </div>
          <div className='flex justify-between items-baseline gap-1 p-1 text-green-600'>
            <p>อนุมัติแล้ว</p>
            <p>{cat1Approve.length} แห่ง</p>
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex justify-center gap-2 p-1'>
            <Hospital /><p className='text-green-800 text-xl font-bold'>ด้านบริหารจัดการ</p>
          </div>
          <div className='flex justify-between items-baseline gap-1 p-1 text-blue-600'>
            <p className=''>ประเมินแล้ว</p>
            <p className=''>{listEvaluateHospCat2.length} แห่ง</p>
          </div>
          <div className='flex justify-between items-baseline gap-1 p-1 text-green-600'>
            <p>อนุมัติแล้ว</p>
            <p>{cat2Approve.length} แห่ง</p>
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex justify-center gap-2 p-1'>
            <Hospital /><p className='text-green-800 text-xl font-bold'>ด้านการบริการ</p>
          </div>
          <div className='flex justify-between items-baseline gap-1 p-1 text-blue-600'>
            <p>ประเมินแล้ว</p>
            <p className=''>{listEvaluateHospCat3.length} แห่ง</p>
          </div>
          <div className='flex justify-between items-baseline gap-1 p-1 text-green-600'>
            <p>อนุมัติแล้ว</p>
            <p>{cat3Approve.length} แห่ง</p>
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex justify-center gap-2 p-1'>
            <Hospital /><p className='text-green-800 text-xl font-bold'>ด้านบุคลากร</p>
          </div>
          <div className='flex justify-between items-baseline gap-1 p-1 text-blue-600'>
            <p className=''>ประเมินแล้ว</p>
            <p className=''>{listEvaluateHospCat4.length} แห่ง</p>
          </div>
          <div className='flex justify-between items-baseline gap-1 p-1 text-green-600'>
            <p>อนุมัติแล้ว</p>
            <p>{cat4Approve.length} แห่ง</p>
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex justify-center gap-2 p-1'>
            <Users /><p className='text-green-800 text-xl font-bold'>คกก.ระดับ สสจ.</p>
          </div>
          <div className='flex justify-between items-baseline gap-1 p-1 text-orange-400'>
            <p className=''>ยังไม่อนุมัติ</p>
            <p className=''>{isNotApproveUser.length} ราย</p>
          </div>
          <div className='flex justify-between items-baseline gap-1 p-1 text-green-600'>
            <p className=''>อนุมัติแล้ว</p>
            <p className=''>{isApproveUser.length} ราย</p>
          </div>
        </div>

      </div>

      <div className='bg-white rounded-md shadow-md p-3 my-2'>
        <TableZoneList />
      </div>

    </div>
  )
}

export default FormHomeZone