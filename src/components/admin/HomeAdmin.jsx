import React, { useEffect, useState } from 'react'
import Gem from '../../assets/Blue-gem.png'
import Gold from '../../assets/Gold2.png'
import Silver from '../../assets/Silver2.png'
import HospitalIcon from '../../assets/Hospital.png'
import { Ban, Blocks, CircleCheck, CircleX, HandPlatter, MonitorCog, UserRound } from 'lucide-react'
import useGlobalStore from '../../store/global-store'
import { getCheckApproveAll, getCyberSecurityLevelData, getEvaluateForChart, getHospitalInListEvaluate, getSumEvaluateForAll, sumEvaluateAll, sumEvaluateByHosp } from '../../api/Evaluate'
import { ArrowUpOutlined, ClearOutlined, DownloadOutlined, ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons'
import { getListHospitalAll } from '../../api/Hospital'
import { Button, Checkbox, Form, Input, Modal, Select, Table } from 'antd'
import ExportExcel_admin from './ExportExcel_admin'


const HomeAdmin = () => {
  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)


  const [listHospitalAll, setListHospitalAll] = useState([])
  const [listHospitalEvaluate, setListHospitalEvaluate] = useState([])
  const [totalSumEvaluate, setTotalSumEvaluate] = useState([])
  const [listSumEvaluateForAll, setListSumEvaluateForAll] = useState([])
  const [searchQuery, setSearchQuery] = useState([])
  const [approveDataAll, setApproveDataAll] = useState([])
  const [searchHospitalAll, setSearchHospitalAll] = useState([])
  const [searchQueryHosp, setSearchQueryHosp] = useState([])



  useEffect(() => {
    loadListHospitalAll()
    loadListHospitalEvaluate()
    loadTotalSumEvaluate()
    loadListSumEvaluate()
    loadCheckApproveAll()
  }, [])


  //Load list hospital all.
  const loadListHospitalAll = async () => {
    await getListHospitalAll()
      .then(res => {
        // console.log('HospAll: ',res.data)
        setListHospitalAll(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  //Load list hospital in evaluate
  const loadListHospitalEvaluate = async () => {
    await getHospitalInListEvaluate()
      .then(res => {
        // console.log('HospList: ', res.data)
        setListHospitalEvaluate(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  //Load sum total evaluate
  const loadTotalSumEvaluate = async () => {
    await sumEvaluateAll()
      .then(res => {
        // console.log('ListEvaluate: ', res.data)
        setTotalSumEvaluate(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadListSumEvaluate = async () => {
    await getSumEvaluateForAll()
      .then(res => {
        // console.log('ListEvaluate: ', res.data)
        setListSumEvaluateForAll(res.data)
        setSearchQuery(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }


  //Check Approve All
  const loadCheckApproveAll = async() =>{
    await getCheckApproveAll()
      .then(res=>{
        // console.log('AP: ', res.data)
        setApproveDataAll(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
  }


  function unique(arr, keyProps) {
    const kvArray = arr.map(entry => {
      const key = keyProps.map(k => entry[k]).join('|');
      return [key, entry];
    });
    const map = new Map(kvArray);
    return Array.from(map.values());
  }



  const totalSumEvaluateData = totalSumEvaluate.map((item) => ({
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

  const gemPer = (gemLevel.length / listHospitalEvaluate.length) * 100
  const goldPer = (goldLevel.length / listHospitalEvaluate.length) * 100
  const silverPer = (silverLevel.length / listHospitalEvaluate.length) * 100
  const hospPerAll = (listHospitalEvaluate.length / listHospitalAll.length) * 100
  const notPassPer = (notPassLevel.length / listHospitalEvaluate.length) * 100

   const apData = approveDataAll?.map((item) => ({
    zone: item.zone,
    provcode: item.provcode,
    provname: item.provname,
    hcode: item.hcode,
    hname_th: item.hname_th,
    c_cat1: Number(item.c_cat1),
    ssj_approve_cat1: Number(item.ssj_approve_cat1),
    ssj_unapprove_cat1: Number(item.ssj_unapprove_cat1),
    zone_approve_cat1: Number(item.zone_approve_cat1),
    zone_unapprove_cat1: Number(item.zone_unapprove_cat1),
    c_cat2: Number(item.c_cat2),
    ssj_approve_cat2: Number(item.ssj_approve_cat2),
    ssj_unapprove_cat2: Number(item.ssj_unapprove_cat2),
    zone_approve_cat2: Number(item.zone_approve_cat2),
    zone_unapprove_cat2: Number(item.zone_unapprove_cat2),
    c_cat3: Number(item.c_cat3),
    ssj_approve_cat3: Number(item.ssj_approve_cat3),
    ssj_unapprove_cat3: Number(item.ssj_unapprove_cat3),
    zone_approve_cat3: Number(item.zone_approve_cat3),
    zone_unapprove_cat3: Number(item.zone_unapprove_cat3),
    c_cat4: Number(item.c_cat4),
    ssj_approve_cat4: Number(item.ssj_approve_cat4),
    ssj_unapprove_cat4: Number(item.ssj_unapprove_cat4),
    zone_approve_cat4: Number(item.zone_approve_cat4),
    zone_unapprove_cat4: Number(item.zone_unapprove_cat4)
  }))

  const data = searchQuery.map((item, k) => {
    const item2 = apData?.filter(f => f.zone === item.zone && f.hcode === item.hcode);
    return {
      key: k,
      zone: Number(item.zone),
      provcode: item.provcode,
      provname: item.provname,
      hcode: item.hcode,
      hname_th: item.hname_th,
      point_total_cat1: item.point_total_cat1,
      point_require_cat1: item.point_require_cat1,
      ssjapp_cat1: item2[0]?.ssj_approve_cat1,
      zoneapp_cat1: item2[0]?.zone_approve_cat1,
      point_total_cat2: item.point_total_cat2,
      point_require_cat2: item.point_require_cat2,
      ssjapp_cat2: item2[0]?.ssj_approve_cat2,
      zoneapp_cat2: item2[0]?.zone_approve_cat2,
      point_total_cat3: item.point_total_cat3,
      point_require_cat3: item.point_require_cat3,
      ssjapp_cat3: item2[0]?.ssj_approve_cat3,
      zoneapp_cat3: item2[0]?.zone_approve_cat3,
      point_total_cat4: item.point_total_cat4,
      ssjapp_cat4: item2[0]?.ssj_approve_cat4,
      zoneapp_cat4: item2[0]?.zone_approve_cat4,
      total_cat: item.point_total_cat1 + item.point_total_cat2 + item.point_total_cat3 + item.point_total_cat4,
      total_require: item.point_require_cat1 + item.point_require_cat2 + item.point_require_cat3,
      cyber_level: item.cyber_level,
      cyber_levelname: item.cyber_levelname
    }
  })

  // const dataSource = data.sort((a, b) => (a.zone > b.zone) ? 1 : -1)

  const dataSource = [...data].sort((a, b) => {
    if (a.zone !== b.zone) {
      return a.zone - b.zone //Primary sort
    }
    return a.provcode.localeCompare(b.provcode) //Secondary sort
  })


  const handleFilter = (e) => {
    setSearchQuery(listSumEvaluateForAll.filter(f =>
      f.hcode.toLowerCase().includes(e.target.value) ||
      f.hname_th.toLowerCase().includes(e.target.value) ||
      f.provname.toLowerCase().includes(e.target.value)
      // || f.zone.toLowerCase().includes(e.target.value)
    ))
  }

  const columns = [
    {
      title: <p className='text-center' style={{ fontSize: '13px' }}>เขตฯ</p>,
      align: 'center',
      render: ({ zone }) =>
        <span style={{ fontSize: '13px' }}>{zone}</span>
    },
    {
      title: <p className='text-center' style={{ fontSize: '13px' }}>จังหวัด</p>,
      align: 'center',
      render: ({ provname }) =>
        <span style={{ fontSize: '13px' }}>{provname}</span>
    },
    {
      title: <p className='text-center' style={{ fontSize: '13px' }}>หน่วยบริการ</p>,
      render: ({ hname_th, hcode }) =>
        <>
          <span style={{ fontSize: '13px' }}>{hname_th} [{hcode}]</span>
        </>

    },
    {
      title: <p className='text-center' style={{ fontSize: '13px' }}>ด้านโครงสร้าง</p>,
      children: [
        {
          title: <p className='text-center' style={{ fontSize: '13px' }}>คะแนน<br />ที่ได้</p>,
          dataIndex: 'point_total_cat1',
          align: 'center',
          render: (point_total_cat1) =>
            <span className='text-center' style={{ fontSize: '13px' }}>{point_total_cat1 === null ? 0 : point_total_cat1}</span>
        },
        {
          title: <p className='text-center' style={{ fontSize: '13px' }}>คะแนน<br />จำเป็น</p>,
          dataIndex: 'point_require_cat1',
          align: 'center',
          render: (point_require_cat1) =>
            <span className='text-center' style={{ fontSize: '13px' }}>{point_require_cat1 === null ? 0 : point_require_cat1}</span>
        },
        {
          title: <p className='text-center' style={{ fontSize: '12px' }}>สสจ.<br />อนุมัติ</p>,
          dataIndex: 'ssjapp_cat1',
          align: 'center',
          render: (ssjapp_cat1) =>
            <>
              {
                ssjapp_cat1 === 67
                  ?
                  <div className='text-green-600 flex justify-center'>
                    <CircleCheck size={12} />
                  </div>
                  :
                  <div className='text-red-500 flex justify-center'>
                    <CircleX size={12} />
                  </div>
              }
            </>
        },
        {
          title: <p className='text-center' style={{ fontSize: '12px' }}>เขตฯ<br />อนุมัติ</p>,
          dataIndex: 'zoneapp_cat1',
          align: 'center',
          render: (zoneapp_cat1) =>
            <>
              {
                zoneapp_cat1 === 67
                  ?
                  <div className='text-green-600 flex justify-center'>
                    <CircleCheck size={12} />
                  </div>
                  :
                  <div className='text-red-500 flex justify-center'>
                    <CircleX size={12} />
                  </div>
              }
            </>
        }
      ]
    },
    {
      title: <p className='text-center' style={{ fontSize: '13px' }}>ด้านบริหารจัดการ</p>,
      children: [
        {
          title: <p className='text-center' style={{ fontSize: '13px' }}>คะแนน<br />ที่ได้</p>,
          dataIndex: 'point_total_cat2',
          align: 'center',
          render: (point_total_cat2) =>
            <span className='text-center' style={{ fontSize: '13px' }}>{point_total_cat2 === null ? 0 : point_total_cat2}</span>
        },
        {
          title: <p className='text-center' style={{ fontSize: '13px' }}>คะแนน<br />จำเป็น</p>,
          dataIndex: 'point_require_cat2',
          align: 'center',
          render: (point_require_cat2) =>
            <span className='text-center' style={{ fontSize: '13px' }}>{point_require_cat2 === null ? 0 : point_require_cat2}</span>
        },
        {
          title: <p className='text-center' style={{ fontSize: '12px' }}>สสจ.<br />อนุมัติ</p>,
          dataIndex: 'ssjapp_cat2',
          align: 'center',
          render: (ssjapp_cat2) =>
            <>
              {
                ssjapp_cat2 === 42
                  ?
                  <div className='text-green-600 flex justify-center'>
                    <CircleCheck size={12} />
                  </div>
                  :
                  <div className='text-red-500 flex justify-center'>
                    <CircleX size={12} />
                  </div>
              }
            </>
        },
        {
          title: <p className='text-center' style={{ fontSize: '12px' }}>เขตฯ<br />อนุมัติ</p>,
          dataIndex: 'zoneapp_cat2',
          align: 'center',
          render: (zoneapp_cat2) =>
            <>
              {
                zoneapp_cat2 === 42
                  ?
                  <div className='text-green-600 flex justify-center'>
                    <CircleCheck size={12} />
                  </div>
                  :
                  <div className='text-red-500 flex justify-center'>
                    <CircleX size={12} />
                  </div>
              }
            </>
        }
      ]
    },
    {
      title: <p className='text-center' style={{ fontSize: '13px' }}>ด้านการบริการ</p>,
      children: [
        {
          title: <p className='text-center' style={{ fontSize: '13px' }}>คะแนน<br />ที่ได้</p>,
          dataIndex: 'point_total_cat3',
          align: 'center',
          render: (point_total_cat3) =>
            <span className='text-center' style={{ fontSize: '13px' }}>{point_total_cat3 === null ? 0 : point_total_cat3}</span>
        },
        {
          title: <p className='text-center' style={{ fontSize: '13px' }}>คะแนน<br />จำเป็น</p>,
          dataIndex: 'point_require_cat3',
          align: 'center',
          render: (point_require_cat3) =>
            <span className='text-center' style={{ fontSize: '13px' }}>{point_require_cat3 === null ? 0 : point_require_cat3}</span>
        },
        {
          title: <p className='text-center' style={{ fontSize: '12px' }}>สสจ.<br />อนุมัติ</p>,
          dataIndex: 'ssjapp_cat3',
          align: 'center',
          render: (ssjapp_cat3) =>
            <>
              {
                ssjapp_cat3 === 45
                  ?
                  <div className='text-green-600 flex justify-center'>
                    <CircleCheck size={12} />
                  </div>
                  :
                  <div className='text-red-500 flex justify-center'>
                    <CircleX size={12} />
                  </div>
              }
            </>
        },
        {
          title: <p className='text-center' style={{ fontSize: '12px' }}>เขตฯ<br />อนุมัติ</p>,
          dataIndex: 'zoneapp_cat3',
          align: 'center',
          render: (zoneapp_cat3) =>
            <>
              {
                zoneapp_cat3 === 45
                  ?
                  <div className='text-green-600 flex justify-center'>
                    <CircleCheck size={12} />
                  </div>
                  :
                  <div className='text-red-500 flex justify-center'>
                    <CircleX size={12} />
                  </div>
              }
            </>
        }
      ]
    },
    {
      title: <p className='text-center' style={{ fontSize: '13px' }}>ด้านบุคลากร</p>,
      children: [
        {
          title: <p className='text-center' style={{ fontSize: '13px' }}>คะแนน<br />ที่ได้</p>,
          dataIndex: 'point_total_cat4',
          align: 'center',
          render: (point_total_cat4) =>
            <span className='text-center' style={{ fontSize: '13px' }}>{point_total_cat4 === null ? 0 : point_total_cat4}</span>
        },
        {
          title: <p className='text-center' style={{ fontSize: '12px' }}>สสจ.<br />อนุมัติ</p>,
          dataIndex: 'ssjapp_cat4',
          align: 'center',
          render: (ssjapp_cat4) =>
            <>
              {
                ssjapp_cat4 === 14
                  ?
                  <div className='text-green-600 flex justify-center'>
                    <CircleCheck size={12} />
                  </div>
                  :
                  <div className='text-red-500 flex justify-center'>
                    <CircleX size={12} />
                  </div>
              }
            </>
        },
        {
          title: <p className='text-center' style={{ fontSize: '12px' }}>เขตฯ<br />อนุมัติ</p>,
          dataIndex: 'zoneapp_cat4',
          align: 'center',
          render: (zoneapp_cat4) =>
            <>
              {
                zoneapp_cat4 === 14
                  ?
                  <div className='text-green-600 flex justify-center'>
                    <CircleCheck size={12} />
                  </div>
                  :
                  <div className='text-red-500 flex justify-center'>
                    <CircleX size={12} />
                  </div>
              }
            </>
        }
      ]
    },
    {
      title: <p className='text-center' style={{ fontSize: '13px' }}>คะแนนที่ได้<br />(รวม)</p>,
      dataIndex: 'total_cat',
      align: 'center',
      render: (total_cat) =>
        <span className='text-center font-bold' style={{ fontSize: '13px' }}>{total_cat === null ? 0 : total_cat}</span>
    },
    {
      title: <p className='text-center' style={{ fontSize: '13px' }}>คะแนนจำเป็น<br />(รวม)</p>,
      dataIndex: 'total_require',
      align: 'center',
      render: (total_require) =>
        <span className='text-center font-bold' style={{ fontSize: '13px' }}>{total_require === null ? 0 : total_require}</span>
    },
    {
      title: <p className='text-center' style={{ fontSize: '13px' }}>ระดับที่ได้</p>,
      align: 'center',
      render: ({ total_cat, total_require, cyber_level }) =>
        <>
          {
            total_cat < 600
              ? <span className='text-red-500 font-bold' style={{ fontSize: '13px' }}>ไม่ผ่าน</span>
              : total_cat >= 600 && total_cat <= 700
                ? <span className='text-slate-400 font-bold' style={{ fontSize: '13px' }}>เงิน</span>
                : total_cat >= 700 && total_require < 500
                  ? <span className='text-slate-400 font-bold' style={{ fontSize: '13px' }}>เงิน</span>
                  : total_cat >= 800 && total_require < 500
                    ? <span className='text-slate-400 font-bold' style={{ fontSize: '13px' }}>เงิน</span>
                    : total_cat >= 700 && total_cat < 800 && total_require == 500
                      ? <span className='text-yellow-500 font-bold' style={{ fontSize: '13px' }}>ทอง</span>
                      : total_cat >= 800 && total_require == 500 && cyber_level != 'GREEN'
                        ? <span className='text-yellow-500 font-bold' style={{ fontSize: '13px' }}>ทอง</span>
                        : total_cat >= 800 && total_require == 500 && cyber_level == 'GREEN'
                          ? <span className='text-blue-500 font-bold' style={{ fontSize: '13px' }}>เพชร</span>
                          : null
          }
        </>
    },
    {
      title: <p className='text-center' style={{ fontSize: '13px' }}>ระดับ Cyber Secuerity</p>,
      align: 'center',
      render: ({ cyber_level, cyber_levelname }) =>
        <>
          {
            cyber_level === 'GREEN'
              ? <p className='text-green-600' style={{ fontSize: '13px' }}>{cyber_levelname}</p>
              : cyber_level === 'YELLOW'
                ? <p className='text-yellow-500' style={{ fontSize: '13px' }}>{cyber_levelname}</p>
                : cyber_level === 'RED'
                  ? <p className='text-red-500' style={{ fontSize: '13px' }}>{cyber_levelname}</p>
                  : null
          }

        </>
    },
  ]

  const data2 = listSumEvaluateForAll.sort((a, b) => (a.zone > b.zone) ? 1 : -1).map((item, k)=> {
    const item2 = apData?.filter(f => f.zone === item.zone && f.hcode === item.hcode);
    return {
      key: k,
      zone: Number(item.zone),
      provcode: item.provcode,
      provname: item.provname,
      hcode: item.hcode,
      hname_th: item.hname_th,
      point_total_cat1: item.point_total_cat1,
      point_require_cat1: item.point_require_cat1,
      ssjapp_cat1: item2[0]?.ssj_approve_cat1,
      zoneapp_cat1: item2[0]?.zone_approve_cat1,
      point_total_cat2: item.point_total_cat2,
      point_require_cat2: item.point_require_cat2,
      ssjapp_cat2: item2[0]?.ssj_approve_cat2,
      zoneapp_cat2: item2[0]?.zone_approve_cat2,
      point_total_cat3: item.point_total_cat3,
      point_require_cat3: item.point_require_cat3,
      ssjapp_cat3: item2[0]?.ssj_approve_cat3,
      zoneapp_cat3: item2[0]?.zone_approve_cat3,
      point_total_cat4: item.point_total_cat4,
      ssjapp_cat4: item2[0]?.ssj_approve_cat4,
      zoneapp_cat4: item2[0]?.zone_approve_cat4,
      total_cat: item.point_total_cat1 + item.point_total_cat2 + item.point_total_cat3 + item.point_total_cat4,
      total_require: item.point_require_cat1 + item.point_require_cat2 + item.point_require_cat3,
      cyber_level: item.cyber_level,
      cyber_levelname: item.cyber_levelname
    }
  })

  const data3 = data2.map((item) => ({
    เขตสุขภาพ: Number(item.zone),
    รหัสจังหวัด: item.provcode,
    จังหวัด: item.provname,
    รหัสหน่วยบริการ: item.hcode,
    ชื่อหน่วยบริการ: item.hname_th,
    คะแนนที่ได้ด้านโครงสร้าง: item.point_total_cat1,
    คะแนนจำเป็นด้านโครงสร้าง: item.point_require_cat1,
    สสจ_อนุมัติด้านโครงสร้าง: item.ssjapp_cat1 === 67 ? 'อนุมัติแล้ว' : 'ยังไม่อนุมัติ',
    เขต_อนุมัติด้านโครงสร้าง: item.zoneapp_cat1 === 67 ? 'อนุมัติแล้ว' : 'ยังไม่อนุมัติ',
    คะแนนที่ได้ด้านบริหารจัดการ: item.point_total_cat2,
    คะแนนจำเป็นด้านบริหารจัดการ: item.point_require_cat2,
    สสจ_อนุมัติด้านบริหารจัดการ: item.ssjapp_cat2 === 42 ? 'อนุมัติแล้ว' : 'ยังไม่อนุมัติ',
    เขต_อนุมัติด้านบริหารจัดการ: item.zoneapp_cat2 === 42 ? 'อนุมัติแล้ว' : 'ยังไม่อนุมัติ',
    คะแนนที่ได้ด้านการบริการ: item.point_total_cat3,
    คะแนนจำเป็นด้านการบริการ: item.point_require_cat3,
    สสจ_อนุมัติด้านการบริการ: item.ssjapp_cat3 === 45 ? 'อนุมัติแล้ว' : 'ยังไม่อนุมัติ',
    เขต_อนุมัติด้านการบริการ: item.zoneapp_cat3 === 45 ? 'อนุมัติแล้ว' : 'ยังไม่อนุมัติ',
    คะแนนที่ได้ด้านบุคลากร: item.point_total_cat4,
    สสจ_อนุมัติด้านบุคลากร: item.ssjapp_cat4 === 14 ? 'อนุมัติแล้ว' : 'ยังไม่อนุมัติ',
    เขต_อนุมัติด้านบุคลากร: item.zoneapp_cat4 === 14 ? 'อนุมัติแล้ว' : 'ยังไม่อนุมัติ',
    คะแนนที่ได้รวม: item.total_cat,
    คะแนนจำเป็นรวม: item.total_require,
    ระดับที่ได้: item.total_cat < 600
      ? 'ไม่ผ่าน'
      : item.total_cat >= 600 && item.total_cat <= 700
        ? 'เงิน'
        : item.total_cat >= 700 && item.total_require < 500
          ? 'เงิน'
          : item.total_cat >= 800 && item.total_require < 500
            ? 'เงิน'
            : item.total_cat >= 700 && item.total_cat < 800 && item.total_require == 500
              ? 'ทอง'
              : item.total_cat >= 800 && item.total_require == 500 && item.cyber_level != 'GREEN'
                ? 'ทอง'
                : item.total_cat >= 800 && item.total_require == 500 && item.cyber_level == 'GREEN'
                  ? 'เพชร'
                  : null,
    ระดับ_cyber_security: item.cyber_levelname
  }))

  const downloadReport = () => {
    window.open(`https://bdh-service.moph.go.th/api/smarthosp/cyber-image/Report_all.xlsx`)
  }

  return (
    <div>

      <div className='grid grid-cols-5 gap-2 mt-3'>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <img
              className='bg-amber-50 w-12 rounded-full shadow-md'
              src={HospitalIcon}
              alt='HospitalIcon'
            />
            <p className='text-xl text-green-700 font-bold'>ข้อมูลการประเมิน</p>
          </div>

          <div className='flex justify-between items-baseline text-green-700 p-2'>
            <p>ประเมินแล้ว</p>
            <div className='flex justify-center items-baseline gap-2'>
              <p className='text-xl'>{listHospitalEvaluate.length}</p>
              <p>แห่ง</p>
            </div>
          </div>
          <div className='flex justify-between items-baseline text-orange-400 px-2'>
            <p>ยังไม่ประเมิน</p>
            <div className='flex justify-center items-baseline gap-2'>
              <p className='text-xl'>{listHospitalAll.length - listHospitalEvaluate.length}</p>
              <p>แห่ง</p>
            </div>
          </div>

          <div className='px-2 flex justify-between text-green-700 mt-1'>
            <div><p>คิดเป็น</p></div>
            <div className='flex'><p>{hospPerAll.toFixed(1)} % </p></div>
          </div>

        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <img
              className='bg-amber-50 w-12 rounded-full shadow-md'
              src={Gem}
              alt='Gem'
            />
            <p className='text-xl text-blue-500 font-bold'>ระดับเพชร</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3 text-blue-500'>
            <p className='text-4xl'>{gemLevel.length}</p>
            <p>แห่ง</p>
          </div>
          <div className='px-2 flex justify-between text-blue-500 mt-7'>
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
            <p className='text-xl  text-yellow-500 font-bold'>ระดับทอง</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3 text-yellow-500'>
            <p className='text-4xl'>{goldLevel.length}</p>
            <p>แห่ง</p>
          </div>
          <div className='px-2 flex justify-between text-yellow-500 mt-7'>
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
            <p className='text-xl text-slate-400 font-bold'>ระดับเงิน</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3 text-slate-400'>
            <p className='text-4xl'>{silverLevel.length}</p>
            <p>แห่ง</p>
          </div>

          <div className='px-2 flex justify-between  text-slate-400 mt-7'>
            <div><p>คิดเป็น</p></div>
            <div className='flex'><p>{silverPer.toFixed(1)} % </p></div>
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <div className='flex justify-center items-center bg-amber-50 w-12 h-12 rounded-full shadow-md'>
              <Ban size={40} className='text-red-500' />
            </div>
            <p className='text-xl text-red-500 font-bold'>ไม่ผ่าน</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3 text-red-500'>
            <p className='text-4xl'>{notPassLevel.length}</p>
            <p>แห่ง</p>
          </div>

          <div className='px-2 flex justify-between  text-red-500 mt-7'>
            <div><p>คิดเป็น</p></div>
            <div className='flex'><p>{notPassPer.toFixed(1)} % </p></div>
          </div>
        </div>

      </div>

      <div className='w-full bg-white rounded-md shadow-md p-3'>
        <div className='flex justify-center items-center'>
          <p className='text-2xl font-bold text-green-700'>ผลการประเมินแต่ละระดับที่ได้จากคะแนนในการประเมินโรงพยาบาลอัจฉริยะ ปีงบประมาณ พ.ศ.2568</p>
        </div>
        <div className='flex justify-between items-center py-2 px-3'>
          <div className='flex items-center gap-2'>
            <p style={{ fontSize: '14px' }} className='text-blue-500'>
              จำนวนหน่วยบริการทีประเมินทั้งหมด {searchQuery.length} รายการ
            </p>
            <ExportExcel_admin data={data3} fileName={"SmartHospReport-All"} />
            <Button
              type='primary'
              icon={<DownloadOutlined shape='round' />}
              size='small'
              onClick={downloadReport}
            >
              ดาวน์โหลดข้อมูลการประเมินรายข้อ
            </Button>
          </div>
          <div>
            <Input
              placeholder='จังหวัด, รหัส 5 หลัก, ชื่อหน่วยบริการ...'
              className='rounded-full'
              style={{ width: 250 }}
              prefix={<SearchOutlined />}
              onChange={handleFilter}
            />
          </div>
        </div>
        <Table
          style={{
            margin: '10px'
          }}
          columns={columns}
          dataSource={dataSource}
          components={{
            header: {
              cell: ({ children, ...restProps }) => (
                <th {...restProps} style={{ background: "#388e3c", color: "white" }}>
                  {children}
                </th>
              ),
            },
          }}
          bordered
          size='small'
        pagination={{pageSize:12}}
        />


      </div>
    </div>
  )
}

export default HomeAdmin