import React, { useState, useEffect } from 'react'
import useGlobalStore from '../../../../store/global-store'
import { getDocumentByEvaluateByHosp, getListEvaluateByZone, getSubQuetList, zoneChangeStatusApprove, zoneUnApprove } from '../../../../api/Evaluate'
import { Button, Checkbox, Divider, Empty, Form, Image, Input, Select, Switch, Modal } from 'antd'
import { getListQuests } from '../../../../api/Quest'
import { toast } from 'react-toastify'
import { ExclamationCircleFilled, EyeTwoTone, SnippetsOutlined } from '@ant-design/icons'
import { Ban, RefreshCcw, Save, SquareCheckBig, SquareX } from 'lucide-react'
import { getListHospitalOnZone } from '../../../../api/Hospital'

const FormApproveInfrastructure_Zone = () => {

  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)

  const [formSearch] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [unApproveModal, setUnApproveModal] = useState(false)
  const [listQuests, setListQuests] = useState([])
  const [evaluateByZone, setEvaluateByZone] = useState([])
  const [subQuestList, setSubQuestList] = useState([])
  const [searchQuery, setSearchQuery] = useState([])
  const [listHospitals, setListHospitals] = useState([])
  const [values, setValues] = useState({ provcode: "" })
  const [documentFile, setDocumentFile] = useState(null)
  const [clientReady, setClientReady] = useState(false)
  const [hospcode, setHospcode] = useState('')


  const [formZoneApprove] = Form.useForm()
  const [formUnAprove] = Form.useForm()
  const zone = user.zone

  useEffect(() => {
    loadListEvaluateByZone(token, zone)
    setClientReady(true);
    loadSubQuestList(token)
    loadListHospitals(token)
  }, [])

  const loadListHospitals = async () => {
    await getListHospitalOnZone(token, zone)
      .then(res => {
        // console.log(res.data)
        setListHospitals(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }


  const loadSubQuestList = async () => {
    await getSubQuetList(token)
      .then(res => {
        setSubQuestList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }


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


  const loadListQuests = async () => {
    await getListQuests(token)
      .then(res => {
        setListQuests(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadListEvaluateByZone = async () => {
    setIsLoading(true)
    await getListEvaluateByZone(token, zone)
      .then(res => {
        // console.log(res.data)
        setEvaluateByZone(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }


  const category1 = evaluateByZone.filter(f => f.category_questId === 1)

  const dataSource = category1.map((item) => ({
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


  // console.log("Data: ", dataSource)

  const uniqueProv = [...new Map(dataSource.map(item => [item['provcode', 'provname'], item])).values()]
  const uniqueHosp = [...new Map(dataSource.map(item => [item['provcode', 'hcode', 'hname_th'], item])).values()]

  const testFilter = uniqueHosp.filter(f => f.provcode === values.provcode)

  const optionProv = uniqueProv.sort((a, b) => a - b).map((item) => ({
    value: item.provcode,
    label: item.provname
  }))

  const optionHosp2 = testFilter.map((item1) => ({
    value: item1.hcode,
    label: item1.hname_th + ' [' + item1.hcode + ']'
  }))

  const handleChange = (provcode) => {
    setValues({ provcode: provcode })
  }

  console.log('')

  const uniqueCatId = 1

  const handleSubmit = async (fieldValue) => {
    const provcode = fieldValue.provcode
    const hcode = fieldValue.hcode
    setHospcode(hcode)
    loadListQuests(token)
    setSearchQuery(dataSource.filter(f => f.provcode === provcode && f.hcode === hcode))

    await getDocumentByEvaluateByHosp(token, uniqueCatId, hcode)
      .then(res => {
        // console.log('Doc: ', res.data)
        setDocumentFile(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('ErrorInfo: ', errorInfo)
  }


  useEffect(() => {
    formZoneApprove.setFieldsValue({
      evaluateId: searchQuery.id,
      usersId: user.id,
      hcode: searchQuery.hcode,
      hname_th: searchQuery.hname_th,
      province: searchQuery.provname,
      zone: user.zone,
      zone_approve: true
    })
  })


  const searchQuests = listQuests.filter(f => f.category_questId === 1)

  const showPDF = (pdf) => {
    // window.open(`https://bdh-service.moph.go.th/api/smarthosp/file-uploads/${pdf}`, "_blank", "noreferer")
    window.open(`https://bdh-service.moph.go.th/api/smarthosp/file-uploads/${pdf}`, "_blank", "noreferer")
  }

  const hospitalData = listHospitals.filter(f => f.hcode === hospcode)

  const approved = [...new Set(searchQuery.map(item => item.ssj_approve))];


  const dataSearch = searchQuery.map((item1) => ({
    hcode: item1.hcode,
    sub_questId: item1.sub_questId,
    ssj_approve: item1.ssj_approve,
    zone_approve: item1.zone_approve,
    check: item1.check,
    category_questId: item1.category_questId
  })
  );

  const dataSearch2 = dataSearch.flatMap((dc) =>
    dc.check.split(",").flatMap((ch) =>
      dataSubQuestLists.filter((sb) => sb.sub_questId === dc.sub_questId && sb.choice === ch).map((matched) => ({
        category_questId: dc.category_questId,
        hcode: dc.hcode,
        sub_questId: dc.sub_questId,
        ssj_approve: dc.ssj_approve,
        zone_approve: dc.zone_approve,
        choice: matched.choice,
        sub_quest_total_point: matched.sub_quest_total_point,
        sub_quest_require_point: matched.sub_quest_require_point
      }))
    )
  );

  return (
    <div>
      <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
        <p className='ml-2'>Approve ด้านโครงสร้าง</p>
      </div>

      <div className='bg-white rounded-md shadow-md p-3'>
        <div className='flex justify-center items-center space-x-2'>
          <p className='text-slate-700 font-bold'>เลือกจังหวัดและหน่วยบริการ :</p>
          <Form
            name='formSearch'
            form={formSearch}
            layout='inline'
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name='provcode'
              rules={[
                {
                  required: true,
                  message: 'กรุณาเลือกจักหวัด'
                }
              ]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                placeholder='กรุณาเลือกจังหวัด...'
                options={optionProv}
                onSelect={(provcode) => handleChange(provcode)}
                style={{ width: '200px' }}
              />
            </Form.Item>
            <Form.Item
              name='hcode'
              rules={[
                {
                  required: true,
                  message: 'กรุณาเลือกหน่วยบริการ'
                }
              ]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                placeholder='กรุณาเลือกหน่วยบริการ...'
                options={optionHosp2}
                style={{ width: '250px' }}
              />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !clientReady ||
                    !formSearch.isFieldsTouched(true) ||
                    !!formSearch.getFieldsError().filter(({ errors }) => errors.length).length
                  }
                >
                  ค้นหา
                </Button>
              )}
            </Form.Item>
          </Form>
          {
            !documentFile
              ? null
              :
              <>
                <Button
                  onClick={() => showPDF(documentFile.file_name)}
                  type='dashed'
                >
                  <SnippetsOutlined /> ดูเอกสาร/หลักฐาน
                </Button>
              </>
          }
        </div>
        <Divider />

        <div>
          <table className='w-full text-left table-fixed text-slate-800'>
            <thead>
              <tr className='text-md text-slate-500 border border-l border-r border-slate-300 bg-slate-50'>
                <th className='text-center p-4 border-r'>เกณฑ์การประเมินและคำตอบ</th>
                <th className='text-center p-4 border-r w-32'>คะแนนเต็ม</th>
                <th className='text-center p-4 border-r w-32'>คะแนนจำเป็น</th>
                <th className='text-center p-4 border-r w-32'>ไฟล์หลักฐาน</th>
                <th className='text-center p-4 border-r w-32'>สสจ. อนุมัติ</th>
                <th className='text-center p-4 border-r w-32'>เขตฯ อนุมัติ</th>
              </tr>
            </thead>
            <tbody>
              {
                searchQuests.map((item1, k1) =>
                  <>
                    <tr key={k1} className='border-b border-l border-r'>
                      <td colSpan={4}>
                        <p
                          className='ml-1 p-1 font-bold'
                        // style={{ fontSize: '18px' }}
                        >
                          <u>{item1.quest_name}</u>
                        </p>
                      </td>
                    </tr>
                    {
                      searchQuery.map((item2, k2) =>
                        item2.questId === item1.id
                          ?
                          <>
                            <tr key={k2} className='border-neutral-200 dark:border-white/10 border-b border-l border-r'>
                              <td className='p-4'>
                                <Form.Item
                                  name={'evaluateId' + item2.id}
                                  hidden={true}
                                  initialValue={item2.id}
                                >
                                  <Input />
                                </Form.Item>

                                <Form.Item
                                  name={'usersId' + item2.id}
                                  hidden={true}
                                  initialValue={user.id}
                                >
                                  <Input />
                                </Form.Item>
                                <Form.Item
                                  name={'hcode' + item2.id}
                                  hidden={true}
                                  initialValue={item2.hcode}
                                >
                                  <Input />
                                </Form.Item>
                                <Form.Item
                                  name={'hname_th' + item2.id}
                                  hidden={true}
                                  initialValue={item2.hname_th}
                                >
                                  <Input />
                                </Form.Item>
                                <Form.Item
                                  name={'province' + item2.id}
                                  hidden={true}
                                  initialValue={item2.provname}
                                >
                                  <Input />
                                </Form.Item>
                                <Form.Item
                                  name={'zone' + item2.id}
                                  hidden={true}
                                  initialValue={user.zone}
                                >
                                  <Input />
                                </Form.Item>
                                <Form.Item
                                  name={'zone_approve' + item2.id}
                                  hidden={true}
                                  initialValue={true}
                                >
                                  <Input />
                                </Form.Item>
                                <div className='ml-7'>
                                  <p className='text-slate-600'>{item2.sub_quest_name}</p>
                                  <div className='pl-10 gap-2'>
                                    {
                                      item2.check.split(",").map((ch) =>
                                        dataSubQuestLists.map((sb) =>
                                          sb.sub_questId === item2.sub_questId && sb.choice === ch
                                            ?
                                            <div className='flex items-baseline gap-2 mt-3 ml-7'>
                                              <Checkbox checked />
                                              <p
                                                className={
                                                  sb.sub_quest_listname === 'ไม่มีการดำเนินการ'
                                                    ? 'text-red-700'
                                                    : 'text-green-700'
                                                }
                                              >
                                                {sb.sub_quest_listname}
                                              </p>
                                               <p className='text-red-500'>{sb.necessary === true ? '(*จำเป็น)' : ''}</p>
                                            </div>
                                            : null
                                        )
                                      )
                                    }
                                  </div>
                                </div>
                              </td>
                              <td className='text-center border-l'>
                                {
                                  item2.check.split(",").map((ch) =>
                                    dataSubQuestLists.map((sb) =>
                                      sb.sub_questId === item2.sub_questId && sb.choice === ch
                                        ?
                                        <div className='flex justify-center items-baseline gap-2 mt-3'>
                                          <p className='font-bold'>{sb.sub_quest_total_point}</p>
                                        </div>
                                        : null
                                    )
                                  )
                                }
                              </td>
                              <td className='text-center border-l'>
                                {
                                  item2.check.split(",").map((ch) =>
                                    dataSubQuestLists.map((sb) =>
                                      sb.sub_questId === item2.sub_questId && sb.choice === ch
                                        ?
                                        <div className='flex justify-center items-baseline gap-2 mt-3'>
                                          <p className='font-bold'>{sb.sub_quest_require_point}</p>
                                        </div>
                                        : null
                                    )
                                  )
                                }
                              </td>
                              <td className='text-center border-l'>
                                <div className='flex justify-center items-center'>
                                  {
                                    item2.file_name
                                      ?
                                      <>
                                        <Button onClick={() => showPDF(item2.file_name)}>
                                          <EyeTwoTone /> ดูไฟล์
                                        </Button>
                                      </>
                                      :
                                      <>
                                        -
                                      </>
                                  }
                                </div>
                              </td>
                              <td className='text-center border-l px-1'>
                                {
                                  item2.ssj_approve === true
                                    ?
                                    <div className='flex justify-center'>
                                      <SquareCheckBig className='text-green-700' />
                                    </div>
                                    :
                                    <div className='flex justify-center'>
                                      <SquareX className='text-red-600' />
                                    </div>
                                }
                              </td>
                              <td className='text-center border-l px-1'>
                                {
                                  item2.zone_approve === true
                                    ?
                                    <div className='flex justify-center'>
                                      <SquareCheckBig className='text-green-700' />
                                    </div>
                                    :
                                    <div className='flex justify-center'>
                                      <SquareX className='text-red-600' />
                                    </div>
                                }
                              </td>
                            </tr>
                          </>
                          : null
                      )
                    }
                  </>
                )
              }

              {
                hospcode
                  ?
                  <tr className='border-neutral-200 dark:border-white/10 border-b border-l border-r'>
                    <td className='text-center border-l px-1 font-bold text-blue-700'>คะแนนรวม</td>
                    <td className='text-center border-l px-1 font-bold text-blue-700'>
                      {
                        dataSearch2.filter((dc2) => dc2.ssj_approve === true).reduce((sum, it2) => sum + it2.sub_quest_total_point, 0)
                      }
                    </td>
                    <td className='text-center border-l px-1 font-bold text-blue-700'>
                      {
                        dataSearch2.filter((dc2) => dc2.ssj_approve === true).reduce((sum, it2) => sum + it2.sub_quest_require_point, 0)
                      }
                    </td>
                    <td className='text-center border-l px-1' colSpan={3}></td>
                  </tr>
                  :
                  <></>
              }

            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default FormApproveInfrastructure_Zone