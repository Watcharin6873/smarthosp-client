import React, { useEffect, useState } from 'react'
import useGlobalStore from '../../store/global-store'
import { LoaderCircle, MonitorCheck } from 'lucide-react'
import { getReportForPivot } from '../../api/Report'
import * as XLSX from 'xlsx'
import { useTable } from 'react-table'
import { getListHospitalAll } from '../../api/Hospital'
import { Button, Select, Table } from 'antd'
import { getListEvaluateByHosp } from '../../api/Evaluate'
import { orderBy } from 'lodash'
import { EyeTwoTone } from '@ant-design/icons'
import UseTitle from '../../utills/UseTitle'



const FormReportCentre = () => {

  UseTitle('รายงานผลการประเมิน')

  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)

  const [isLoading, setIsLoading] = useState(false)
  const [reportData, setReportData] = useState([])
  const [pivotState, setPivotState] = useState({})
  const [listHospitalAll, setListHospitalAll] = useState([]);
  const [listEvaluateByHosp, setListEvaluateByHosp] = useState([]);
  const [searchQuery, setSearchQuery] = useState([])
  const [hcodeValue, setHcodeValue] = useState(null);
  const [filterValueData, setFilterValueData] = useState(null);


  useEffect(() => {
    loadDataForPivot(token)
    loadListHospitalAll()
  }, [])

  const loadDataForPivot = async () => {
    await getReportForPivot(token)
      .then(res => {
        // console.log(res.data)
        setReportData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadListHospitalAll = async () => {
    await getListHospitalAll()
      .then(res => {
        setListHospitalAll(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }

  const pivotData = reportData.map((row) => ({
    zone: Number(row.zone),
    provine: row.provname + "[" + row.provcode + "]",
    hospital_name: row.hname_th + "[" + row.hcode + "]",
    sub_quest_name: row.sub_quest_name,
    c_check: row.c_check
  }))


  //Option select search
  const option = listHospitalAll.map((item) => ({
    value: item.hcode,
    label: item.hname_th + ' [' + item.hcode + ']'
  }))

  //เก็บค่า hcode มาค้นหาข้อมูล
  const handleChange = async (value) => {
    setHcodeValue(value)
    setFilterValueData(null)
    setIsLoading(true);
    await getListEvaluateByHosp(token, value)
      .then(res => {
        setListEvaluateByHosp(res.data)
        setSearchQuery(res.data)
        console.log('Data: ', res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  const handleFilter = (filterValue) =>{
    setFilterValueData(filterValue)
    setSearchQuery(listEvaluateByHosp.filter(f=> f.category_questId === parseInt(filterValue)))
  }

  const dataSource = orderBy(searchQuery.map((item, index) => ({ ...item, keyIndex: index })),
    ['category_questId', 'questId', 'sub_questId'], ['asc']
  )


  const columns = [
    {
      title: <p className='text-center' style={{ fontSize: '13px' }}>ด้าน</p>,
      dataIndex: 'category_questId',
      align: 'center',
      width: 200,
      render: (category_questId) => {
        return category_questId === 1 ? (
          <span style={{ fontSize: "13px" }}>ด้านโครงสร้าง</span>
        ) : category_questId === 2 ? (
          <span style={{ fontSize: "13px" }}>ด้านบริหารจัดการ</span>
        ) : category_questId === 3 ? (
          <span style={{ fontSize: "13px" }}>ด้านการบริการ</span>
        ) : category_questId === 4 ? (
          <span style={{ fontSize: "13px" }}>ด้านบุคลากร</span>
        ) : null;
      },

    },
    {
      title: <p className='text-center' style={{ fontSize: '13px' }}>เกณฑ์การประเมิน</p>,
      width: 600,
      render: ({ sub_quest_name }) =>
        <span className='text-center' style={{ fontSize: '13px' }}>{sub_quest_name}</span>
    },
    {
      title: <p className='text-center' style={{ fontSize: '13px' }}>ไฟล์หลักฐาน</p>,
      align: 'center',
      width: 150,
      render: ({ file_name }) =>
        // <span className='text-center' style={{ fontSize: '13px' }}>{file_name}</span>
        file_name ? (
          <div className='flex justify-center items-center'>
            <Button size='small' onClick={() => showEvidence(file_name)}>
              <EyeTwoTone /> ดูหลักฐาน
            </Button>
          </div>
        ) : (
          <span className='text-center' style={{ fontSize: '13px' }}>-</span>
        )
    },
    {
      title: <p className='text-center' style={{ fontSize: '13px' }}>คำตอบ</p>,
      align: 'center',
      width: 200,
      render: ({ sub_quest_listname }) =>
        <span className='text-center' style={{ fontSize: '13px' }}>{sub_quest_listname}</span>
    },
    {
      title: <p className='text-center' style={{ fontSize: '13px' }}>คะแนนที่ได้</p>,
      align: 'center',
      render: ({ sub_quest_total_point }) =>
        <span className='text-center' style={{ fontSize: '13px' }}>{sub_quest_total_point}</span>
    },
    {
      title: <p className='text-center' style={{ fontSize: '13px' }}>คะแนนจำเป็น</p>,
      align: 'center',
      render: ({ sub_quest_require_point }) =>
        <span className='text-center' style={{ fontSize: '13px' }}>{sub_quest_require_point}</span>
    },
  ]


  const showEvidence = (fileValue) => {
    window.open(`https://bdh-service.moph.go.th/api/smarthosp/file-uploads/${fileValue}`, "_blank", "noreferrer")
  }

  //Option Category
  const optionCat = [
    {
      value: '1',
      label: '1.ด้านโครงสร้าง'
    },
    {
      value: '2',
      label: '2.ด้านบริหารจัดการ'
    },
    {
      value: '3',
      label: '3.ด้านการบริการ'
    },
    {
      value: '4',
      label: '4.ด้านบุคลากร'
    }
  ]



  return (
    <div>

      <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
        <MonitorCheck /> <p className='ml-2'> ตรวจสอบหลักฐานการประเมินโรงพยาบาลอัจฉริยะ ประจำปีงบประมาณ 2568</p>
      </div>
      <div className='flex justify-center mt-3 gap-3'>
        <Select
          showSearch
          placeholder='กรุณาระบุรหัสหน่วยบริการ 5 หลัก'
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={option}
          onChange={handleChange}
          style={{ width: 300 }}
        />
        {
          hcodeValue ? (
            <Select
              showSearch
              placeholder='กรุณาระบุด้านของเกณฑ์การประเมิน'
              Value={filterValueData}
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={optionCat.sort((a, b) => a.value - b.value)}
              onChange={handleFilter}
              style={{ width: 300 }}
            />
          ) : null
        }
      </div>
      <br />
      <div>
        {
          isLoading
            ?
            <>
              <div className='flex justify-center items-center'>
                <LoaderCircle className='w-16 h-16 text-blue-400 animate-spin' />
              </div>
            </>
            :
            <>
              <Table
                style={{
                  margin: '10px'
                }}
                columns={columns}
                dataSource={dataSource}
                rowKey='keyIndex'
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
                pagination={{ pageSize: 24 }}
              />
            </>
        }
      </div>

    </div>
  )
}

export default FormReportCentre