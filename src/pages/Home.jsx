import React, { useEffect, useState } from 'react'
import UseTitle from '../utills/UseTitle'
import Gem from '../assets/Blue-gem.png'
import Gold from '../assets/Gold2.png'
import Silver from '../assets/Silver2.png'
import HospitalIcon from '../assets/Hospital.png'
import The_Best from '../assets/The_Best.png'
import { ArrowUpOutlined } from '@ant-design/icons'
import { getListHospitalAll } from '../api/Hospital'
import { Hospital } from 'lucide-react'
import { getHospitalInListEvaluate, sumEvaluateAll } from '../api/Evaluate'

const Home = () => {

  UseTitle('Dashboard')
  const [listHospitalAll, setListHospitalAll] = useState([])
  const [hospitalInList, setHospitalInList] = useState([])
  const [totalSumEvaluate, setTotalSumEvaluate] = useState([])
  const [expandedRows, setExpandedRows] = useState(null)

  useEffect(() => {
    loadListHospitalAll()
    loadHospitalInListEvaluate()
    loadTotalSumEvaluate()
  }, [])


  const loadListHospitalAll = async () => {
    await getListHospitalAll()
      .then(res => {
        setListHospitalAll(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadHospitalInListEvaluate = async () => {
    await getHospitalInListEvaluate()
      .then(res => {
        setHospitalInList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadTotalSumEvaluate = async() =>{
    await sumEvaluateAll()
      .then(res=>{        
        setTotalSumEvaluate(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
  }

  const zoneData = [...new Map(listHospitalAll.map(item => [item['zone'], item])).values()]

  const totalSumEvaluateData = totalSumEvaluate.map((item)=>({
    zonne: Number(item.zone),
    provcode: item.provcode,
    provname: item.provname,
    hcode: item.hcode,
    hname_th: item.hname_th,
    sumTotalPoint: item.sub_quest_total_point,
    sumRequirePoint: item.sub_quest_require_point,
    cyber_level: item.cyber_level,
    cyber_levelname: item.cyber_levelname
  }))

  console.log('Data: ', totalSumEvaluateData)

  const gemLevel = totalSumEvaluateData.filter(f=> f.sumTotalPoint >= 800 && f.sumRequirePoint == 510 && f.cyber_level == 'GREEN')
  const goldLevel = totalSumEvaluateData.filter(f=> 
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint == 510) || 
    (f.sumTotalPoint >= 800 && f.sumRequirePoint == 510 && f.cyber_level != 'GREEN')
  )
  const silverLevel = totalSumEvaluateData.filter(f=>
    (f.sumTotalPoint >= 600 && f.sumTotalPoint < 700) ||
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint < 510) ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint < 510 && f.cyber_level == 'GREEN')
  )
  const gemPer = (gemLevel.length/listHospitalAll.length) * 100
  const goldPer = (goldLevel.length/listHospitalAll.length) * 100
  const silverPer = (silverLevel.length/listHospitalAll.length) * 100
  const hospPer = (hospitalInList.length/listHospitalAll.length) * 100


  return (
    <div>
      
      <div className='grid grid-cols-4 gap-4'>
        
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
          <div className='p-2 flex justify-between text-blue-500'>
            <div ><p>คิดเป็น</p></div>
            <div className='flex'><p>{gemPer.toFixed(1)} % </p></div>
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <img
              className='bg-amber-50 w-12 rounded-full shadow-md'
              src={Gold}
              alt='Gold'
            />
            <p className='text-2xl  text-yellow-500 font-bold'>ระดับทอง</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3 text-yellow-500'>
            <p className='text-4xl'>{goldLevel.length}</p>
            <p>แห่ง</p>
          </div>
          <div className='p-2 flex justify-between text-yellow-500'>
            <div><p>คิดเป็น</p></div>
            <div className='flex'><p>{goldPer.toFixed(1)} % </p></div>
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <img
              className='bg-amber-50 w-12 rounded-full shadow-md'
              src={Silver}
              alt='Silver'
            />
            <p className='text-2xl text-slate-500 font-bold'>ระดับเงิน</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3 text-slate-500'>
            <p className='text-4xl'>{silverLevel.length}</p>
            <p>แห่ง</p>
          </div>
          <div className='p-2 flex justify-between  text-slate-500'>
            <div><p>คิดเป็น</p></div>
            <div className='flex'><p>{silverPer.toFixed(1)} % </p></div>
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <img
              className='bg-amber-50 w-12 rounded-full shadow-md'
              src={HospitalIcon}
              alt='HospitalIcon'
            />
            <p className='text-2xl text-green-700 font-bold'>รพ.ที่ลงทะเบียน</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3 text-green-700'>
            <p className='text-4xl'>{hospitalInList.length}</p>
            <p>แห่ง</p>
          </div>
          <div className='p-2 flex justify-between text-green-700'>
            <div><p>คิดเป็น</p></div>
            <div className='flex'><p>{hospPer.toFixed(1)} % </p></div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home