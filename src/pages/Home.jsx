import React, { useEffect, useState } from 'react'
import UseTitle from '../utills/UseTitle'
import Gem from '../assets/Blue-gem.png'
import Gold from '../assets/Gold2.png'
import Silver from '../assets/Silver2.png'
import HospitalIcon from '../assets/Hospital.png'
import The_Best from '../assets/The_Best.png'
import { ArrowUpOutlined, ClearOutlined, SearchOutlined } from '@ant-design/icons'
import { getListHospitalAll } from '../api/Hospital'
import { Ban, Hospital } from 'lucide-react'
import { getCheckApproveAll, getHospitalInListEvaluate, splitCommaForCheckApprove, sumEvaluateAll } from '../api/Evaluate'
import { Alert, Button, Form, Select } from 'antd'
// import Chart from "react-apexcharts";
import { BarChart, PieChart, pieArcLabelClasses } from '@mui/x-charts';
import FormHome from '../components/FormHome'
import FormZoneSearchEvaluate from '../components/FormZoneSearchEvaluate'
// import { BarChart } from '@mui/x-charts';

const position = [13, 100];

const Home = () => {

  UseTitle('Dashboard')
  const [listHospitalAll, setListHospitalAll] = useState([])
  const [listHospitalZone, setListHospitalZone] = useState([])
  const [hospitalInList, setHospitalInList] = useState([])
  const [totalSumEvaluate, setTotalSumEvaluate] = useState([])
  const [searchQuery, setSearchQuery] = useState([])
  const [searchQueryHosp, setSearchQueryHosp] = useState([])
  const [approveData, setApproveData] = useState([])
  const [expandedRows, setExpandedRows] = useState(null)
  const [clientReady, setClientReady] = useState(false);
  const [formSearch] = Form.useForm()
  const [zoneSearch, setZoneSearch] = useState('')
  const [provSearch, setProvSearch] = useState('')
  const [values, setValues] = useState()


  useEffect(() => {
    loadListHospitalAll()
    loadHospitalInListEvaluate()
    loadTotalSumEvaluate()
    loadCheckApproveAll()
  }, [])

  const loadCheckApproveAll = async () => {
    await getCheckApproveAll()
      .then(res => {
        setApproveData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const apData = approveData.map((item) => ({
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


  const loadListHospitalAll = async () => {
    await getListHospitalAll()
      .then(res => {
        // console.log('Hosp: ',res.data)
        setListHospitalAll(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadHospitalInListEvaluate = async () => {
    await getHospitalInListEvaluate()
      .then(res => {
        // console.log('Hosp: ', res.data)
        setHospitalInList(res.data)
        setSearchQueryHosp(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadTotalSumEvaluate = async () => {
    await sumEvaluateAll()
      .then(res => {
        // console.log('Values: ', res.data)
        setTotalSumEvaluate(res.data)
        setSearchQuery(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleChangeZone = (zone) => {
    setZoneSearch(zone)
    setSearchQuery(totalSumEvaluate.filter(f => f.zone === zone))
    setSearchQueryHosp(hospitalInList.filter(f => f.zone === zone))
    setListHospitalZone(listHospitalAll.filter(f => f.zone === zone))
    formSearch.resetFields()
  }

  const handleChangeProv = (prov) => {
    setProvSearch(prov)
  }

  //Form search
  const handleSubmit = (e) => {
    console.log(e)
    const zone = e.zone;
    const provcode = e.provcode;
    setValues({
      zone: zone,
      provcode: provcode
    })
    setSearchQuery(totalSumEvaluate.filter(f => f.zone === zone && f.provcode === provcode))
    setSearchQueryHosp(hospitalInList.filter(f => f.zone === zone && f.provcode === provcode))
    formSearch.resetFields()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed: ', errorInfo)
  }

  const clearForm = () => {
    formSearch.resetFields()
    setSearchQuery(totalSumEvaluate.map((item) => ({ ...item })))
    setSearchQueryHosp(hospitalInList.map((item) => ({ ...item })))
    setZoneSearch('')
  }

  const totalSumEvaluateData = searchQuery.map((item) => ({
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

  const totalSumEvaluateData2 = searchQuery.map(sq1 => {
    const ap1 = apData.find(a => a.hcode === sq1.hcode)
    return {
      ...sq1,
      c_cat1: ap1 ? Number(ap1.c_cat1) : null,
      ssj_approve_cat1:ap1 ? Number(ap1.ssj_approve_cat1) : null,
      ssj_unapprove_cat1:ap1 ? Number(ap1.ssj_unapprove_cat1) : null,
      zone_approve_cat1:ap1 ? Number(ap1.zone_approve_cat1) : null,
      zone_unapprove_cat1:ap1 ? Number(ap1.zone_unapprove_cat1) : null,
      c_cat2:ap1 ? Number(ap1.c_cat2) : null,
      ssj_approve_cat2:ap1 ? Number(ap1.ssj_approve_cat2) : null,
      ssj_unapprove_cat2:ap1 ? Number(ap1.ssj_unapprove_cat2) : null,
      zone_approve_cat2:ap1 ? Number(ap1.zone_approve_cat2) : null,
      zone_unapprove_cat2:ap1 ? Number(ap1.zone_unapprove_cat2) : null,
      c_cat3:ap1 ? Number(ap1.c_cat3) : null,
      ssj_approve_cat3:ap1 ? Number(ap1.ssj_approve_cat3) : null,
      ssj_unapprove_cat3:ap1 ? Number(ap1.ssj_unapprove_cat3) : null,
      zone_approve_cat3:ap1 ? Number(ap1.zone_approve_cat3) : null,
      zone_unapprove_cat3:ap1 ? Number(ap1.zone_unapprove_cat3) : null,
      c_cat4:ap1 ? Number(ap1.c_cat4) : null,
      ssj_approve_cat4:ap1 ? Number(ap1.ssj_approve_cat4) : null,
      ssj_unapprove_cat4:ap1 ? Number(ap1.ssj_unapprove_cat4) : null,
      zone_approve_cat4:ap1 ? Number(ap1.zone_approve_cat4) : null,
      zone_unapprove_cat4:ap1 ? Number(ap1.zone_unapprove_cat4) : null,
      cyber_level: sq1.cyber_level,
      cyber_levelname: sq1.cyber_levelname
    }
  });

  console.log('ApproveData: ', totalSumEvaluateData2)

  const uniqueZone = [...new Set(totalSumEvaluateData.map((zon) => zon.zone))]

  const zoneData = totalSumEvaluateData.map((val) => ({
    zone: val.zone,
    provcode: val.provcode,
    provname: val.provname
  }))

  function unique(arr, keyProps) {
    const kvArray = arr.map(entry => {
      const key = keyProps.map(k => entry[k]).join('|');
      return [key, entry];
    });
    const map = new Map(kvArray);
    return Array.from(map.values());
  }

  const zoneUnique = unique(zoneData, ['zone'])

  const provData = unique(zoneData, ['zone', 'provcode', 'provname'])

  // console.log('Prov: ', provData)

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

  const hospNotEvaluate = (listHospitalAll.length - hospitalInList.length)
  const notPassLevel = totalSumEvaluateData.filter(f => f.sumTotalPoint < 600)
  const gemPer = (gemLevel.length / hospitalInList.length) * 100
  const gemPerZone = (gemLevel.length / searchQueryHosp.length) * 100
  const goldPer = (goldLevel.length / hospitalInList.length) * 100
  const goldPerZone = (goldLevel.length / searchQueryHosp.length) * 100
  const silverPer = (silverLevel.length / hospitalInList.length) * 100
  const silverPerZone = (silverLevel.length / searchQueryHosp.length) * 100
  const hospPerAll = (hospitalInList.length / listHospitalAll.length) * 100
  const hospPerZone = (searchQueryHosp.length / listHospitalZone.length) * 100
  const hospNotPer = ((listHospitalAll.length - hospitalInList.length) / listHospitalAll.length) * 100
  const notPassPer = (notPassLevel.length / hospitalInList.length) * 100
  const notPassPerZone = (notPassLevel.length / searchQueryHosp.length) * 100

  console.log('Level: ', gemLevel.length)

  const data2 = [
    { label: 'ระดับเพชร', value: gemLevel.length, color: '#0088FE' },
    { label: 'ระดับทอง', value: goldLevel.length, color: '#FFDC73' },
    { label: 'ระดับเงิน', value: silverLevel.length, color: '#d1cfcf' },
    { label: 'ไม่ผ่าน', value: notPassLevel.length, color: '#fc5151' },
    // { label: 'ยังไม่ประเมิน', value: hospNotEvaluate, color: '#fca951' },
  ];

  const TOTAL = data2.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(1)}%`;
  };

  const gemLevel01 = totalSumEvaluateData.filter(f => f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level == 'GREEN' && f.zone === '01')
  const gemLevel02 = totalSumEvaluateData.filter(f => f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level == 'GREEN' && f.zone === '02')
  const gemLevel03 = totalSumEvaluateData.filter(f => f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level == 'GREEN' && f.zone === '03')
  const gemLevel04 = totalSumEvaluateData.filter(f => f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level == 'GREEN' && f.zone === '04')
  const gemLevel05 = totalSumEvaluateData.filter(f => f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level == 'GREEN' && f.zone === '05')
  const gemLevel06 = totalSumEvaluateData.filter(f => f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level == 'GREEN' && f.zone === '06')
  const gemLevel07 = totalSumEvaluateData.filter(f => f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level == 'GREEN' && f.zone === '07')
  const gemLevel08 = totalSumEvaluateData.filter(f => f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level == 'GREEN' && f.zone === '08')
  const gemLevel09 = totalSumEvaluateData.filter(f => f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level == 'GREEN' && f.zone === '09')
  const gemLevel10 = totalSumEvaluateData.filter(f => f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level == 'GREEN' && f.zone === '10')
  const gemLevel11 = totalSumEvaluateData.filter(f => f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level == 'GREEN' && f.zone === '11')
  const gemLevel12 = totalSumEvaluateData.filter(f => f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level == 'GREEN' && f.zone === '12')

  const goldLevel01 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint == 500 && f.zone === '01') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level != 'GREEN' && f.zone === '01')
  )
  const goldLevel02 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint == 500 && f.zone === '02') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level != 'GREEN' && f.zone === '02')
  )
  const goldLevel03 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint == 500 && f.zone === '03') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level != 'GREEN' && f.zone === '03')
  )
  const goldLevel04 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint == 500 && f.zone === '04') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level != 'GREEN' && f.zone === '04')
  )
  const goldLevel05 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint == 500 && f.zone === '05') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level != 'GREEN' && f.zone === '05')
  )
  const goldLevel06 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint == 500 && f.zone === '06') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level != 'GREEN' && f.zone === '06')
  )
  const goldLevel07 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint == 500 && f.zone === '07') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level != 'GREEN' && f.zone === '07')
  )
  const goldLevel08 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint == 500 && f.zone === '08') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level != 'GREEN' && f.zone === '08')
  )
  const goldLevel09 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint == 500 && f.zone === '09') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level != 'GREEN' && f.zone === '09')
  )
  const goldLevel10 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint == 500 && f.zone === '10') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level != 'GREEN' && f.zone === '10')
  )
  const goldLevel11 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint == 500 && f.zone === '11') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level != 'GREEN' && f.zone === '11')
  )
  const goldLevel12 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint == 500 && f.zone === '12') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint == 500 && f.cyber_level != 'GREEN' && f.zone === '12')
  )

  const silverLevel01 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 600 && f.sumTotalPoint <= 700 && f.zone === '01') ||
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint < 500 && f.zone === '01') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint < 500 && f.zone === '01')
  )
  const silverLevel02 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 600 && f.sumTotalPoint <= 700 && f.zone === '02') ||
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint < 500 && f.zone === '02') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint < 500 && f.zone === '02')
  )
  const silverLevel03 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 600 && f.sumTotalPoint <= 700 && f.zone === '03') ||
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint < 500 && f.zone === '03') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint < 500 && f.zone === '03')
  )
  const silverLevel04 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 600 && f.sumTotalPoint <= 700 && f.zone === '04') ||
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint < 500 && f.zone === '04') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint < 500 && f.zone === '04')
  )
  const silverLevel05 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 600 && f.sumTotalPoint <= 700 && f.zone === '05') ||
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint < 500 && f.zone === '05') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint < 500 && f.zone === '05')
  )
  const silverLevel06 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 600 && f.sumTotalPoint <= 700 && f.zone === '06') ||
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint < 500 && f.zone === '06') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint < 500 && f.zone === '06')
  )
  const silverLevel07 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 600 && f.sumTotalPoint <= 700 && f.zone === '07') ||
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint < 500 && f.zone === '07') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint < 500 && f.zone === '07')
  )
  const silverLevel08 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 600 && f.sumTotalPoint <= 700 && f.zone === '08') ||
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint < 500 && f.zone === '08') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint < 500 && f.zone === '08')
  )
  const silverLevel09 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 600 && f.sumTotalPoint <= 700 && f.zone === '09') ||
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint < 500 && f.zone === '09') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint < 500 && f.zone === '09')
  )
  const silverLevel10 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 600 && f.sumTotalPoint <= 700 && f.zone === '10') ||
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint < 500 && f.zone === '10') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint < 500 && f.zone === '10')
  )
  const silverLevel11 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 600 && f.sumTotalPoint <= 700 && f.zone === '11') ||
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint < 500 && f.zone === '11') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint < 500 && f.zone === '11')
  )
  const silverLevel12 = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 600 && f.sumTotalPoint <= 700 && f.zone === '12') ||
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint < 500 && f.zone === '12') ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint < 500 && f.zone === '12')
  )

  const notPassLevel01 = totalSumEvaluateData.filter(f => f.sumTotalPoint < 600 && f.zone === '01')
  const notPassLevel02 = totalSumEvaluateData.filter(f => f.sumTotalPoint < 600 && f.zone === '02')
  const notPassLevel03 = totalSumEvaluateData.filter(f => f.sumTotalPoint < 600 && f.zone === '03')
  const notPassLevel04 = totalSumEvaluateData.filter(f => f.sumTotalPoint < 600 && f.zone === '04')
  const notPassLevel05 = totalSumEvaluateData.filter(f => f.sumTotalPoint < 600 && f.zone === '05')
  const notPassLevel06 = totalSumEvaluateData.filter(f => f.sumTotalPoint < 600 && f.zone === '06')
  const notPassLevel07 = totalSumEvaluateData.filter(f => f.sumTotalPoint < 600 && f.zone === '07')
  const notPassLevel08 = totalSumEvaluateData.filter(f => f.sumTotalPoint < 600 && f.zone === '08')
  const notPassLevel09 = totalSumEvaluateData.filter(f => f.sumTotalPoint < 600 && f.zone === '09')
  const notPassLevel10 = totalSumEvaluateData.filter(f => f.sumTotalPoint < 600 && f.zone === '10')
  const notPassLevel11 = totalSumEvaluateData.filter(f => f.sumTotalPoint < 600 && f.zone === '11')
  const notPassLevel12 = totalSumEvaluateData.filter(f => f.sumTotalPoint < 600 && f.zone === '12')

  //ใช้เมื่อมี Block "ยังไม่ได้ประเมิน"
  const hospitalInzone1 = listHospitalAll.filter((f => f.zone === '01'))
  const hospitalInzone2 = listHospitalAll.filter((f => f.zone === '02'))
  const hospitalInzone3 = listHospitalAll.filter((f => f.zone === '03'))
  const hospitalInzone4 = listHospitalAll.filter((f => f.zone === '04'))
  const hospitalInzone5 = listHospitalAll.filter((f => f.zone === '05'))
  const hospitalInzone6 = listHospitalAll.filter((f => f.zone === '06'))
  const hospitalInzone7 = listHospitalAll.filter((f => f.zone === '07'))
  const hospitalInzone8 = listHospitalAll.filter((f => f.zone === '08'))
  const hospitalInzone9 = listHospitalAll.filter((f => f.zone === '09'))
  const hospitalInzone10 = listHospitalAll.filter((f => f.zone === '10'))
  const hospitalInzone11 = listHospitalAll.filter((f => f.zone === '11'))
  const hospitalInzone12 = listHospitalAll.filter((f => f.zone === '12'))

  const listHospInZone = [
    hospitalInzone1.length, hospitalInzone2.length, hospitalInzone3.length, hospitalInzone4.length,
    hospitalInzone5.length, hospitalInzone6.length, hospitalInzone7.length, hospitalInzone8.length,
    hospitalInzone9.length, hospitalInzone10.length, hospitalInzone11.length, hospitalInzone12.length,
  ]

  //ใช้เมื่อนำ Block "ยังไม่ประเมิน" ออก
  const hospEvaluate1 = hospitalInList.filter(f => f.zone === '01')
  const hospEvaluate2 = hospitalInList.filter(f => f.zone === '02')
  const hospEvaluate3 = hospitalInList.filter(f => f.zone === '03')
  const hospEvaluate4 = hospitalInList.filter(f => f.zone === '04')
  const hospEvaluate5 = hospitalInList.filter(f => f.zone === '05')
  const hospEvaluate6 = hospitalInList.filter(f => f.zone === '06')
  const hospEvaluate7 = hospitalInList.filter(f => f.zone === '07')
  const hospEvaluate8 = hospitalInList.filter(f => f.zone === '08')
  const hospEvaluate9 = hospitalInList.filter(f => f.zone === '09')
  const hospEvaluate10 = hospitalInList.filter(f => f.zone === '10')
  const hospEvaluate11 = hospitalInList.filter(f => f.zone === '11')
  const hospEvaluate12 = hospitalInList.filter(f => f.zone === '12')

  const gemData = [
    ((gemLevel01.length / hospEvaluate1.length) * 100).toFixed(1),
    ((gemLevel02.length / hospEvaluate2.length) * 100).toFixed(1),
    ((gemLevel03.length / hospEvaluate3.length) * 100).toFixed(1),
    ((gemLevel04.length / hospEvaluate4.length) * 100).toFixed(1),
    ((gemLevel05.length / hospEvaluate5.length) * 100).toFixed(1),
    ((gemLevel06.length / hospEvaluate6.length) * 100).toFixed(1),
    ((gemLevel07.length / hospEvaluate7.length) * 100).toFixed(1),
    ((gemLevel08.length / hospEvaluate8.length) * 100).toFixed(1),
    ((gemLevel09.length / hospEvaluate9.length) * 100).toFixed(1),
    ((gemLevel10.length / hospEvaluate10.length) * 100).toFixed(1),
    ((gemLevel11.length / hospEvaluate11.length) * 100).toFixed(1),
    ((gemLevel12.length / hospEvaluate12.length) * 100).toFixed(1)
  ];

  // console.log('Silver: ',silverLevel03.length)

  const goldData = [
    ((goldLevel01.length / hospEvaluate1.length) * 100).toFixed(1),
    ((goldLevel02.length / hospEvaluate2.length) * 100).toFixed(1),
    ((goldLevel03.length / hospEvaluate3.length) * 100).toFixed(1),
    ((goldLevel04.length / hospEvaluate4.length) * 100).toFixed(1),
    ((goldLevel05.length / hospEvaluate5.length) * 100).toFixed(1),
    ((goldLevel06.length / hospEvaluate6.length) * 100).toFixed(1),
    ((goldLevel07.length / hospEvaluate7.length) * 100).toFixed(1),
    ((goldLevel08.length / hospEvaluate8.length) * 100).toFixed(1),
    ((goldLevel09.length / hospEvaluate9.length) * 100).toFixed(1),
    ((goldLevel10.length / hospEvaluate10.length) * 100).toFixed(1),
    ((goldLevel11.length / hospEvaluate11.length) * 100).toFixed(1),
    ((goldLevel12.length / hospEvaluate12.length) * 100).toFixed(1)
  ];
  const silverData = [
    ((silverLevel01.length / hospEvaluate1.length) * 100).toFixed(1),
    ((silverLevel02.length / hospEvaluate2.length) * 100).toFixed(1),
    ((silverLevel03.length / hospEvaluate3.length) * 100).toFixed(1),
    ((silverLevel04.length / hospEvaluate4.length) * 100).toFixed(1),
    ((silverLevel05.length / hospEvaluate5.length) * 100).toFixed(1),
    ((silverLevel06.length / hospEvaluate6.length) * 100).toFixed(1),
    ((silverLevel07.length / hospEvaluate7.length) * 100).toFixed(1),
    ((silverLevel08.length / hospEvaluate8.length) * 100).toFixed(1),
    ((silverLevel09.length / hospEvaluate9.length) * 100).toFixed(1),
    ((silverLevel10.length / hospEvaluate10.length) * 100).toFixed(1),
    ((silverLevel11.length / hospEvaluate11.length) * 100).toFixed(1),
    ((silverLevel12.length / hospEvaluate12.length) * 100).toFixed(1)
  ];
  const noPassData = [
    ((notPassLevel01.length / hospEvaluate1.length) * 100).toFixed(1),
    ((notPassLevel02.length / hospEvaluate2.length) * 100).toFixed(1),
    ((notPassLevel03.length / hospEvaluate3.length) * 100).toFixed(1),
    ((notPassLevel04.length / hospEvaluate4.length) * 100).toFixed(1),
    ((notPassLevel05.length / hospEvaluate5.length) * 100).toFixed(1),
    ((notPassLevel06.length / hospEvaluate6.length) * 100).toFixed(1),
    ((notPassLevel07.length / hospEvaluate7.length) * 100).toFixed(1),
    ((notPassLevel08.length / hospEvaluate8.length) * 100).toFixed(1),
    ((notPassLevel09.length / hospEvaluate9.length) * 100).toFixed(1),
    ((notPassLevel10.length / hospEvaluate10.length) * 100).toFixed(1),
    ((notPassLevel11.length / hospEvaluate11.length) * 100).toFixed(1),
    ((notPassLevel12.length / hospEvaluate12.length) * 100).toFixed(1)
  ];

  const xLabels = ['เขตฯ 1', 'เขตฯ 2', 'เขตฯ 3', 'เขตฯ 4', 'เขตฯ 5', 'เขตฯ 6', 'เขตฯ 7', 'เขตฯ 8', 'เขตฯ 9', 'เขตฯ 10', 'เขตฯ 11', 'เขตฯ 12']

  const xLabelsProv = provData.map((item) => item.provname)

  const notEvaluate = [

    (((hospEvaluate1.length - (gemLevel01.length + goldLevel01.length + silverLevel01.length + notPassLevel01.length)) / (hospEvaluate1.length)) * 100).toFixed(1),
    (((hospEvaluate2.length - (gemLevel02.length + goldLevel02.length + silverLevel02.length + notPassLevel02.length)) / (hospEvaluate2.length)) * 100).toFixed(1),
    (((hospEvaluate4.length - (gemLevel04.length + goldLevel04.length + silverLevel04.length + notPassLevel04.length)) / (hospEvaluate4.length)) * 100).toFixed(1),
    (((hospEvaluate3.length - (gemLevel03.length + goldLevel03.length + silverLevel03.length + notPassLevel03.length)) / (hospEvaluate3.length)) * 100).toFixed(1),
    (((hospEvaluate5.length - (gemLevel05.length + goldLevel05.length + silverLevel05.length + notPassLevel05.length)) / (hospEvaluate5.length)) * 100).toFixed(1),
    (((hospEvaluate6.length - (gemLevel06.length + goldLevel06.length + silverLevel06.length + notPassLevel06.length)) / (hospEvaluate6.length)) * 100).toFixed(1),
    (((hospEvaluate7.length - (gemLevel07.length + goldLevel07.length + silverLevel07.length + notPassLevel07.length)) / (hospEvaluate7.length)) * 100).toFixed(1),
    (((hospEvaluate8.length - (gemLevel08.length + goldLevel08.length + silverLevel08.length + notPassLevel08.length)) / (hospEvaluate8.length)) * 100).toFixed(1),
    (((hospEvaluate9.length - (gemLevel09.length + goldLevel09.length + silverLevel09.length + notPassLevel09.length)) / (hospEvaluate9.length)) * 100).toFixed(1),
    (((hospEvaluate10.length - (gemLevel10.length + goldLevel10.length + silverLevel10.length + notPassLevel10.length)) / (hospEvaluate10.length)) * 100).toFixed(1),
    (((hospEvaluate11.length - (gemLevel11.length + goldLevel11.length + silverLevel11.length + notPassLevel11.length)) / (hospEvaluate11.length)) * 100).toFixed(1),
    (((hospEvaluate12.length - (gemLevel12.length + goldLevel12.length + silverLevel12.length + notPassLevel12.length)) / (hospEvaluate12.length)) * 100).toFixed(1)
  ]

  const valueFormatter = (params) => {
    return `${params} %`;
  }


  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex justify-center items-center'>
          <Form
            form={formSearch}
            name='formSearch'
            layout='inline'
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name={`zone`}
              rules={[
                {
                  required: true,
                  message: 'กรุณาเลือกเขตสุขภาพ!'
                }
              ]}
            >
              <Select
                showSearch
                style={{ width: 180 }}
                placeholder='เลือกเขตสุขภาพ...'
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                onChange={handleChangeZone}
              >
                {zoneUnique.sort((a, b) => a - b).map((val1, k1) => (
                  <Select.Option key={k1} value={val1.zone}>เขตสุขภาพที่ {k1 + 1}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item>
              <Button
                danger
                onClick={clearForm}
              >
                <ClearOutlined /> Reset ค่า
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className='flex justify-center items-center gap-2 text-base font-bold text-green-700 pr-5'>
          {
            zoneUnique.length > 1
              ?
              <>
                <p>ผลการประเมินทั้งหมด</p>
              </>
              :
              <>
                <p>ผลการประเมินของเขตสุขภาพที่ {Number(zoneSearch)}</p>
                {
                  zoneUnique.map((item) => (
                    item.provcode === provSearch
                      ? <p>จังหวัด : {item.provname}</p>
                      : null
                  ))
                }
              </>
          }

        </div>

      </div>

      <p className='text-center text-orange-500 m-3 text-lg'>***ข้อมูลที่แสดงเป็นผลคะแนนที่ผ่านการอนุมัติจากคณะกรรมการระดับจังหวัดเรียบร้อยแล้ว***</p>

      <div className='grid grid-cols-5 gap-2'>

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
            <p>จังหวัด อนุมัติแล้ว</p>
            <div className='flex justify-center items-baseline gap-2'>
              <p className='text-xl'>{searchQueryHosp.length}</p>
              <p>แห่ง</p>
            </div>
          </div>
          {
            zoneSearch
              ?
              <>
                <div className='flex justify-between items-baseline text-orange-400 px-2'>
                  <p>จังหวัด ยังไม่อนุมัติ</p>
                  <div className='flex justify-center items-baseline gap-2'>
                    <p className='text-xl'>{listHospitalZone.length - searchQueryHosp.length}</p>
                    <p>แห่ง</p>
                  </div>
                </div>
                <div className='px-2 flex justify-between text-green-700 mt-1'>
                  <div><p>คิดเป็น</p></div>
                  <div className='flex'><p>{hospPerZone.toFixed(1)} % </p></div>
                </div>
              </>
              :
              <>
                <div className='flex justify-between items-baseline text-orange-400 px-2'>
                  <p>จังหวัด ยังไม่อนุมัติ</p>
                  <div className='flex justify-center items-baseline gap-2'>
                    <p className='text-xl'>{listHospitalAll.length - searchQueryHosp.length}</p>
                    <p>แห่ง</p>
                  </div>
                </div>

                <div className='px-2 flex justify-between text-green-700 mt-1'>
                  <div><p>คิดเป็น</p></div>
                  <div className='flex'><p>{hospPerAll.toFixed(1)} % </p></div>
                </div>
              </>



          }

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
          {
            zoneSearch
              ?
              <div className='px-2 flex justify-between text-blue-500 mt-7'>
                <div ><p>คิดเป็น</p></div>
                <div className='flex'><p>{gemPerZone.toFixed(1)} % </p></div>
              </div>
              :
              <div className='px-2 flex justify-between text-blue-500 mt-7'>
                <div ><p>คิดเป็น</p></div>
                <div className='flex'><p>{gemPer.toFixed(1)} % </p></div>
              </div>
          }
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
          {
            zoneSearch
              ?
              <div className='px-2 flex justify-between text-yellow-500 mt-7'>
                <div><p>คิดเป็น</p></div>
                <div className='flex'><p>{goldPerZone.toFixed(1)} % </p></div>
              </div>
              :
              <div className='px-2 flex justify-between text-yellow-500 mt-7'>
                <div><p>คิดเป็น</p></div>
                <div className='flex'><p>{goldPer.toFixed(1)} % </p></div>
              </div>
          }
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
          {
            zoneSearch
              ?
              <div className='px-2 flex justify-between  text-slate-400 mt-7'>
                <div><p>คิดเป็น</p></div>
                <div className='flex'><p>{silverPerZone.toFixed(1)} % </p></div>
              </div>
              :
              <div className='px-2 flex justify-between  text-slate-400 mt-7'>
                <div><p>คิดเป็น</p></div>
                <div className='flex'><p>{silverPer.toFixed(1)} % </p></div>
              </div>
          }
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
          {
            zoneSearch
              ?
              <div className='px-2 flex justify-between  text-red-500 mt-7'>
                <div><p>คิดเป็น</p></div>
                <div className='flex'><p>{notPassPerZone.toFixed(1)} % </p></div>
              </div>
              :
              <div className='px-2 flex justify-between  text-red-500 mt-7'>
                <div><p>คิดเป็น</p></div>
                <div className='flex'><p>{notPassPer.toFixed(1)} % </p></div>
              </div>
          }
        </div>


      </div>

      <div className='grid grid-cols-2 gap-2 mt-3'>
        <div className='bg-white rounded-md shadow-md p-3'>
          {
            zoneSearch
              ?
              <>
                <FormZoneSearchEvaluate zoneSearch={zoneSearch} />
              </>
              :
              <>
                <div className='flex justify-center items-center'>
                  <p>จำนวนร้อยละ (%) ของแต่ละระดับที่ได้เป็นคะแนนที่ผ่านการอนุมัติจากคณะกรรมการระดับจังหวัดแล้ว รายเขตสุขภาพ</p>
                </div>
                <BarChart
                  height={350}
                  margin={{ top: 50, right: 10, bottom: 60, left: 40 }}
                  series={[
                    { data: gemData, label: 'ระดับเพชร', id: 'gemID', stack: 'total', color: '#0088FE', valueFormatter },
                    { data: goldData, label: 'ระดับทอง', id: 'goldID', stack: 'total', color: '#FFDC73', valueFormatter },
                    { data: silverData, label: 'ระดับเงิน', id: 'silverID', stack: 'total', color: '#d1cfcf', valueFormatter },
                    { data: noPassData, label: 'ไม่ผ่าน', id: 'noPassID', stack: 'total', color: '#fc5151', valueFormatter },
                    // { data: notEvaluate, label: 'ยังไม่ประเมิน', id: 'notEvaluateID', stack: 'total', color: '#FCA951' },
                  ]}
                  xAxis={[{ data: xLabels, scaleType: 'band', tickLabelStyle: { angle: -35, textAnchor: "end" } }]}
                  yAxis={[{ min: 0, max: 100 }]}
                  // barLabel={({ value }) => `${value} %`}
                  sx={{
                    '& .MuiBarLabel-root': {
                      fill: 'white',
                      fontSize: 10,
                    },
                    ['.MuiChartsLegend-mark']: {
                      rx: '50%', // circle legend
                    },
                  }}
                />
              </>
          }
        </div>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex justify-center items-center'>
            <p>จำนวนร้อยละ (%) ของแต่ละระดับที่ได้เป็นคะแนนที่ผ่านการอนุมัติจากคณะกรรมการระดับจังหวัดแล้ว รวมทั้งหมด</p>
          </div>
          <div className='flex justify-center items-center mt-5'>
            <PieChart
              series={[
                {
                  data: data2,
                  innerRadius: 80,
                  outerRadius: 130,
                  arcLabel: getArcLabel,
                },
              ]}
              height={300}
              slotProps={{
                legend: { hidden: false },
              }}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: 'white',
                  fontSize: 12,
                },
                ['.MuiChartsLegend-mark']: {
                  rx: '50%', // circle legend
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className='bg-white rounded-md shadow-md mt-3'>
        <FormHome />
      </div>

    </div>
  )
}

export default Home