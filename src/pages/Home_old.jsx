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
import { getHospitalInListEvaluate, sumEvaluateAll } from '../api/Evaluate'
import { Alert, Button, Form, Select } from 'antd'
// import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
// import { BarChart } from '@mui/x-charts/BarChart';

const position = [13, 100];

const Home = () => {

  UseTitle('Dashboard')
  const [listHospitalAll, setListHospitalAll] = useState([])
  const [hospitalInList, setHospitalInList] = useState([])
  const [totalSumEvaluate, setTotalSumEvaluate] = useState([])
  const [searchQuery, setSearchQuery] = useState([])
  const [searchQueryHosp, setSearchQueryHosp] = useState([])
  // const [expandedRows, setExpandedRows] = useState(null)
  // const [clientReady, setClientReady] = useState(false);
  const [formSearch] = Form.useForm()
  const [zoneSearch, setZoneSearch] = useState('')
  const [provSearch, setProvSearch] = useState('')
  const [values, setValues] = useState()


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
    // formSearch.resetFields()
    setSearchQuery(totalSumEvaluate.map((item) => ({ ...item })))
    setSearchQueryHosp(hospitalInList.map((item) => ({ ...item })))
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

  const gemLevel = totalSumEvaluateData.filter(f => f.sumTotalPoint >= 800 && f.sumRequirePoint == 510 && f.cyber_level == 'GREEN')
  const goldLevel = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 700 && f.sumTotalPoint < 800 && f.sumRequirePoint == 510) ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint == 510 && f.cyber_level != 'GREEN')
  )
  const silverLevel = totalSumEvaluateData.filter(f =>
    (f.sumTotalPoint >= 600 && f.sumTotalPoint <= 700) ||
    (f.sumTotalPoint >= 700 && f.sumRequirePoint < 510) ||
    (f.sumTotalPoint >= 800 && f.sumRequirePoint < 510)
  )

  const hospNotEvaluate = (listHospitalAll.length - hospitalInList.length)
  const notPassLevel = totalSumEvaluateData.filter(f => f.sumTotalPoint < 600)
  const gemPer = (gemLevel.length / listHospitalAll.length) * 100
  const goldPer = (goldLevel.length / listHospitalAll.length) * 100
  const silverPer = (silverLevel.length / listHospitalAll.length) * 100
  const hospPer = (hospitalInList.length / listHospitalAll.length) * 100
  const hospNotPer = ((listHospitalAll.length - hospitalInList.length) / listHospitalAll.length) * 100
  const notPassPer = (notPassLevel.length / listHospitalAll.length) * 100



  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex justify-center items-center mb-5'>
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
                style={{ width: 180 }}
                placeholder='เลือกเขตสุขภาพ...'
                onChange={handleChangeZone}
              >
                {zoneUnique.sort((a, b) => a - b).map((val1, k1) => (
                  <Select.Option key={k1} value={val1.zone}>เขตสุขภาพที่ {k1 + 1}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name={`provcode`}
              rules={[
                {
                  required: true,
                  message: 'กรุณาเลือกเขตสุขภาพ!'
                }
              ]}
            >
              <Select
                style={{ width: 180 }}
                placeholder='เลือกจังหวัด...'
                onChange={handleChangeProv}
              >
                {provData.map((val2, k2) => (
                  zoneSearch === val2.zone
                    ? <Select.Option key={k2} value={val2.provcode}>{val2.provname}</Select.Option>
                    : null
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
              >
                <SearchOutlined /> ค้นหา
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                danger
                onClick={clearForm}
              >
                <ClearOutlined /> ล้างค่า
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className='flex justify-center items-center mb-5 gap-2 text-base font-bold text-green-700 pr-5'>
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

      <div className='grid grid-cols-5 gap-2'>

        <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <img
              className='bg-amber-50 w-12 rounded-full shadow-md'
              src={HospitalIcon}
              alt='HospitalIcon'
            />
            <p className='text-xl text-green-700 font-bold'>ประเมินแล้ว</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3 text-green-700'>
            <p className='text-4xl'>{searchQueryHosp.length}</p>
            <p>แห่ง</p>
          </div>
          <div className='p-2 flex justify-between text-green-700'>
            <div><p>คิดเป็น</p></div>
            <div className='flex'><p>{hospPer.toFixed(1)} % </p></div>
          </div>
        </div>

        {/* <div className='bg-white rounded-md shadow-md p-3'>
          <div className='flex items-center gap-2'>
            <img
              className='bg-amber-50 w-12 rounded-full shadow-md'
              src={HospitalIcon}
              alt='HospitalIcon'
            />
            <p className='text-xl text-orange-400 font-bold'>ยังไม่ประเมิน</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3 text-orange-400'>
            <p className='text-4xl'>{listHospitalAll.length - searchQueryHosp.length}</p>
            <p>แห่ง</p>
          </div>
          <div className='p-2 flex justify-between text-orange-400'>
            <div><p>คิดเป็น</p></div>
            <div className='flex'><p>{hospNotPer.toFixed(1)} % </p></div>
          </div>
        </div> */}

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
            <p className='text-xl  text-yellow-500 font-bold'>ระดับทอง</p>
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
            <p className='text-xl text-slate-500 font-bold'>ระดับเงิน</p>
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
            <div className='flex justify-center items-center bg-amber-50 w-12 h-12 rounded-full shadow-md'>
              <Ban size={40} className='text-red-500' />
            </div>
            <p className='text-xl text-red-500 font-bold'>ไม่ผ่าน</p>
          </div>
          <div className='flex justify-center items-baseline gap-2 my-3 text-red-500'>
            <p className='text-4xl'>{notPassLevel.length}</p>
            <p>แห่ง</p>
          </div>
          <div className='p-2 flex justify-between  text-red-500'>
            <div><p>คิดเป็น</p></div>
            <div className='flex'><p>{notPassPer.toFixed(1)} % </p></div>
          </div>
        </div>


      </div>

    </div>
  )
}

export default Home