import React, { useEffect, useState } from 'react'
import useGlobalStore from '../../../../store/global-store'
import Gem from '../../../../assets/Blue-gem.png'
import Gold from '../../../../assets/Gold2.png'
import Silver from '../../../../assets/Silver2.png'
import HospitalIcon from '../../../../assets/Hospital.png'
import { useNavigate } from 'react-router-dom'
import { Ban, Hospital, UserPlus, Users } from 'lucide-react'
import { getHospitalOnProv } from '../../../../api/Hospital'
import { getListEvaluateByProv, sumEvaluateAll } from '../../../../api/Evaluate'
import { approveUserOnProv, notApproveUserOnProv } from '../../../../api/User'
import { ArrowUpOutlined, SearchOutlined } from '@ant-design/icons'
import { Input, Table } from 'antd'
import TableProvinceList from './TableProvinceList'

const FormHomeSSJ = () => {

  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [listHospital, setListHospital] = useState([])
  const [listEvaluateByProv, setListEvaluateByProv] = useState([])
  const [isApproveUser, setIsApproveUser] = useState([])
  const [isNotApproveUser, setIsNotApproveUser] = useState([])
  const [totalSumEvaluate, setTotalSumEvaluate] = useState([])
  const [searchQuery, setSearchQuery] = useState([])
  const province = user.province

  useEffect(() => {
    loadListHospital(token)
    loadListEvaluateByProv(token)
    loadSumApproveUser(token)
    loadSumNotApproveUser(token)
    loadTotalSumEvaluate()
  }, [])

  const loadListHospital = async () => {
    await getHospitalOnProv(token, province)
      .then(res => {
        // console.log('Hosp: ', res.data)
        setListHospital(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadListEvaluateByProv = async () => {
    await getListEvaluateByProv(token, province)
      .then(res => {
        setListEvaluateByProv(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const listEvaluateProvData = listEvaluateByProv.map((item) => ({
    id: item.id,
    file_name: item.file_name,
    ssj_approve: item.ssj_approve,
    zone_approve: item.zone_approve,
    category_questId: item.category_questId,
    questId: item.questId,
    sub_questId: item.sub_questId,
    check: item.check,
    userId: item.userId,
    hcode: item.hcode,
    hname_th: item.hospitals.hname_th,
    tmbname: item.hospitals.tmbname,
    ampname: item.hospitals.ampname,
    provcode: item.hospitals.provcode,
    provname: item.hospitals.provname,
    zone: item.hospitals.zone
  }))


  const evaluateCat1 = listEvaluateProvData.filter((item) => item.category_questId === 1)
  const evaluateCat2 = listEvaluateProvData.filter((item) => item.category_questId === 2)
  const evaluateCat3 = listEvaluateProvData.filter((item) => item.category_questId === 3)
  const evaluateCat4 = listEvaluateProvData.filter((item) => item.category_questId === 4)


  const listEvaluateHospCat1 = [...new Map(evaluateCat1.map(item => [item['hcode'], item])).values()]
  const listEvaluateHospCat2 = [...new Map(evaluateCat2.map(item => [item['hcode'], item])).values()]
  const listEvaluateHospCat3 = [...new Map(evaluateCat3.map(item => [item['hcode'], item])).values()]
  const listEvaluateHospCat4 = [...new Map(evaluateCat4.map(item => [item['hcode'], item])).values()]
  
 

  const cat1Approve = listEvaluateHospCat1.filter((item) => item.ssj_approve === true)
  const cat2Approve = listEvaluateHospCat2.filter((item) => item.ssj_approve === true)
  const cat3Approve = listEvaluateHospCat3.filter((item) => item.ssj_approve === true)
  const cat4Approve = listEvaluateHospCat4.filter((item) => item.ssj_approve === true)

   console.log("ListCat1: ", cat1Approve)

  // console.log("AP: ", listEvaluateHospCat1)

  const loadSumApproveUser = async () => {
    await approveUserOnProv(token, province)
      .then(res => {
        setIsApproveUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadSumNotApproveUser = async () => {
    await notApproveUserOnProv(token, province)
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
  const sumEvaluateData = totalSumEvaluate.filter(f => f.provname === province)

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

  const gemLevel = totalSumEvaluateData.filter(f => f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level == 'GREEN')
  const goldLevel = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint == 500) ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level != 'GREEN')
  )
  const silverLevel = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 600 && f.sumTotalPoint < 700) ||
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint < 500) ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint < 500)
  )
  const notPassLevel = totalSumEvaluateData.filter(f => f.sumTotalPoint < 600)
  const hospNotEvaluate = listHospital.length - totalSumEvaluateData.length

  const gemPer = (gemLevel.length / listHospital.length) * 100
  const goldPer = (goldLevel.length / listHospital.length) * 100
  const silverPer = (silverLevel.length / listHospital.length) * 100
  const hospNotPer = (hospNotEvaluate / listHospital.length) * 100
  const notPassPer = (notPassLevel.length / listHospital.length) * 100

  return (
    <div>
      <p className='text-sm text-orange-500 m-3'>***ข้อมูลที่แสดงเป็นผลคะแนนจาก รพ.ที่ประเมินตนเองและได้รับการอนุมัติ "รายข้อ" จากคณะกรรมการจังหวัดแล้ว***</p>
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
            <Users /><p className='text-green-800 text-xl font-bold'>ผู้ประเมิน รพ.</p>
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
        <TableProvinceList />
      </div>

    </div>
  )
}

export default FormHomeSSJ