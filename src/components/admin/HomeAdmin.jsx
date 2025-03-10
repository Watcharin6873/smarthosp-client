import React, { useEffect, useState } from 'react'
import Gem from '../../assets/Blue-gem.png'
import Gold from '../../assets/Gold2.png'
import Silver from '../../assets/Silver2.png'
import HospitalIcon from '../../assets/Hospital.png'
import { Ban, Blocks, HandPlatter, MonitorCog, UserRound } from 'lucide-react'
import useGlobalStore from '../../store/global-store'
import { getCyberSecurityLevelData, getEvaluateForChart, getHospitalInListEvaluate, getSumEvaluateForAll, sumEvaluateAll, sumEvaluateByHosp } from '../../api/Evaluate'
import { ArrowUpOutlined, ClearOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { getListHospitalAll } from '../../api/Hospital'
import { Button, Checkbox, Form, Modal, Select, Table } from 'antd'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'


const HomeAdmin = () => {
  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)


  const [listHospitalAll, setListHospitalAll] = useState([])
  const [listHospitalEvaluate, setListHospitalEvaluate] = useState([])
  const [totalSumEvaluate, setTotalSumEvaluate] = useState([])
  const [listSumEvaluateForAll, setListSumEvaluateForAll] = useState([])
  const [searchQuery, setSearchQuery] = useState([])
  const [searchHospitalAll, setSearchHospitalAll] = useState([])
  const [searchQueryHosp, setSearchQueryHosp] = useState([])



  useEffect(() => {
    loadListHospitalAll()
    loadListHospitalEvaluate()
    loadTotalSumEvaluate()
    loadListSumEvaluate()
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
        console.log('ListEvaluate: ', res.data)
        setListSumEvaluateForAll(res.data)
        setSearchQuery(res.data)
      })
      .catch(err => {
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

  const gemPer = (gemLevel.length / listHospitalEvaluate.length) * 100
  const goldPer = (goldLevel.length / listHospitalEvaluate.length) * 100
  const silverPer = (silverLevel.length / listHospitalEvaluate.length) * 100
  const hospPerAll = (listHospitalEvaluate.length / listHospitalAll.length) * 100
  const notPassPer = (notPassLevel.length / listHospitalEvaluate.length) * 100

  const data = searchQuery.map((item, k) => ({
    key: k,
    zone: Number(item.zone),
    zone_name: 'เขตสุขภาพที่ ' + Number(item.zone),
    provcode: item.provcode,
    provname: item.provname,
    hcode: item.hcode,
    hname_th: item.hname_th,
    point_total_cat1: item.point_total_cat1,
    point_require_cat1: item.point_require_cat1,
    point_total_cat2: item.point_total_cat2,
    point_require_cat2: item.point_require_cat2,
    point_total_cat3: item.point_total_cat3,
    point_require_cat3: item.point_require_cat3,
    point_total_cat4: item.point_total_cat4,
    point_require_cat4: item.point_require_cat4,
    total_cat: item.point_total_cat1 + item.point_total_cat2 + item.point_total_cat3 + item.point_total_cat4,
    total_require: item.point_require_cat1 + item.point_require_cat2 + item.point_require_cat3,
    cyber_level: item.cyber_level,
    cyber_levelname: item.cyber_levelname

  }))

  const dataSource = data.sort((a, b) => (a.zone > b.zone) ? 1 : -1)

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
                : total_cat >= 700 && total_require < 510
                  ? <span className='text-slate-400 font-bold' style={{ fontSize: '13px' }}>เงิน</span>
                  : total_cat >= 800 && total_require < 510
                    ? <span className='text-slate-400 font-bold' style={{ fontSize: '13px' }}>เงิน</span>
                    : total_cat >= 700 && total_cat < 800 && total_require == 510
                      ? <span className='text-yellow-500 font-bold' style={{ fontSize: '13px' }}>ทอง</span>
                      : total_cat >= 800 && total_require == 510 && cyber_level != 'GREEN'
                        ? <span className='text-yellow-500 font-bold' style={{ fontSize: '13px' }}>ทอง</span>
                        : total_cat >= 800 && total_require == 510 && cyber_level == 'GREEN'
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

  return (
    <div>

      {/* <div className='flex justify-between mb-5'>
        <div>
          <Form
            name='formSelectZone'
            form={formSelectZone}
            layout='inline'
          >
            <Form.Item name='zoneSearch'>
              <Select
                className='w-48'
                showSearch
                placeholder='กรุณาเลือกเขตสุขภาพ...'
                optionFilterProp='label'
                onChange={onChange}
                options={optionZone}
              />
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
        <div>
          {
            listProvcode?.length > 0
              ?
              <>
                <span>ข้อมูลของจังหวัด : </span>
                {
                  provinceData.map((item) => (
                    <span>{item.province + ' '}</span>
                  ))
                }
              </>
              : null

          }
        </div>
      </div> */}

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
        // pagination={{pageSize:12}}
        />


      </div>
    </div>
  )
}

export default HomeAdmin