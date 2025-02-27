import React, { useState, useEffect } from 'react'
import useGlobalStore from '../../../../store/global-store'
import { getDocumentByEvaluateByHosp, getListEvaluateByZone, getSubQuetList, zoneChangeStatusApprove, zoneUnApprove } from '../../../../api/Evaluate'
import { Button, Checkbox, Divider, Empty, Form, Image, Input, Select, Switch, Modal } from 'antd'
import { getListQuests } from '../../../../api/Quest'
import { toast } from 'react-toastify'
import { ExclamationCircleFilled, EyeTwoTone, SnippetsOutlined } from '@ant-design/icons'
import { Ban, RefreshCcw, Save } from 'lucide-react'
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

  // console.log('search: ', searchQuery)

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

  const handleApprove = async (fieldValue) => {
    // console.log(fieldValue)
    const result = []
    searchQuery.forEach((qItem) => {
      result.push({
        evaluateId: fieldValue["evaluateId" + qItem.id],
        usersId: fieldValue["usersId" + qItem.id],
        hcode: fieldValue["hcode" + qItem.id],
        hname_th: fieldValue["hname_th" + qItem.id],
        province: fieldValue["province" + qItem.id],
        zone: fieldValue["zone" + qItem.id],
        zone_approve: fieldValue["zone_approve" + qItem.id],
      })
    })
    console.log('Result: ', result)

    await zoneChangeStatusApprove(token, result)
      .then(res => {
        toast.success(res.data.message)
        loadListEvaluateByZone(token, zone)
        loadSubQuestList(token)
        loadListQuests(token)
        loadListHospitals(token)
        setSearchQuery(dataSource.filter(f => f.provcode === values.provcode && f.hcode === hospcode))
      })
      .catch(err => {
        console.log(err)
      })

  }

  const onFinishFailed = (errorInfo) => {
    console.log('Fialed: ', errorInfo)
  }

  // console.log('Data: ', searchQuery)

  const searchQuests = listQuests.filter(f => f.category_questId === 1)

  // console.log("Quest: ", searchQuets)

  const showPDF = (pdf) => {
    // window.open(`https://bdh-service.moph.go.th/api/smarthosp/file-uploads/${pdf}`, "_blank", "noreferer")
    window.open(`https://bdh-service.moph.go.th/api/smarthosp/file-uploads/${pdf}`, "_blank", "noreferer")
  }


  const subQuestLength = searchQuery.map((item1) =>
    searchQuests.map((item2) =>
      item1.quest_name === item2.quest_name
        ? {
          quest_name: item1.quest_name,
          sub_quest_name: item2.sub_quest_name
        }
        : null
    )
  )

  // console.log('Length:', subQuestLength.length)

  const showUnAproveModal = () => {
    setUnApproveModal(true)
  }

  const cancelModal = () => {
    setUnApproveModal(false)
  }

  const hospitalData = listHospitals.filter(f => f.hcode === hospcode)
  console.log('Hospital: ', hospitalData)

  useEffect(() => {
    formUnAprove.setFieldsValue({
      evaluateId: searchQuery.id,
      usersId: user.id,
      province: user.province,
      zone: user.zone
    })
  })

  const handleUnApprove = async (fieldValue) => {
    const result2 = []
    searchQuery.forEach((qItem) => {
      result2.push({
        evaluateId: fieldValue["evaluateId" + qItem.id],
        zone_approve: fieldValue["zone_approve" + qItem.id],
        usersId: fieldValue["usersId" + qItem.id],
        hcode: fieldValue["hcode" + qItem.id],
        province: fieldValue["province" + qItem.id],
        zone: fieldValue["zone" + qItem.id],

      })
    })
    console.log('Result2: ', result2)

    await zoneUnApprove(token, result2)
      .then(res => {
        toast.error(res.data.message)
        setUnApproveModal(false)
        loadListEvaluateByZone(token, zone)
        loadSubQuestList(token)
        loadListHospitals(token)
        setSearchQuery(dataSource.filter(f => f.provcode === values.provcode && f.hcode === hospcode))
      })
      .catch(err => {
        console.log(err)
      })
  }

  const refreshData = () => {
    loadListEvaluateByZone(token, zone)
    loadSubQuestList(token)
    loadListHospitals(token)
    setSearchQuery(dataSource.filter(f => f.provcode === values.provcode && f.hcode === hospcode))
  }


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
          <Form
            name='formZoneApprove'
            form={formZoneApprove}
            onFinish={handleApprove}
            onFinishFailed={onFinishFailed}
          >
            <table className='w-full text-left table-fixed text-slate-800'>
              <thead>
                <tr className='text-md text-slate-500 border border-l border-r border-slate-300 bg-slate-50'>
                  <th className='text-center p-4 border-r'>เกณฑ์การประเมินและคำตอบ</th>
                  <th className='text-center p-4 border-r w-32'>คะแนนเต็ม</th>
                  <th className='text-center p-4 border-r w-32'>คะแนนจำเป็น</th>
                  <th className='text-center p-4 border-r w-32'>ไฟล์หลักฐาน</th>
                  <th className='text-center p-4 border-r w-32'>การอนุมัติ</th>
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
                                    item2.zone_approve === true
                                      ? <p className='font-bold text-green-700'>อนุมัติแล้ว!</p>
                                      : <p className='font-bold text-red-500'>ยังไม่อนุมัติ!</p>
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
              </tbody>
            </table>
            {
              subQuestLength.length === 67
                ?
                <>
                  <div className='flex justify-center space-x-1 mt-3 gap-3'>
                    <div className='mt-3'>
                      <Form.Item>
                        <Button
                          type='primary'
                          htmlType='submit'
                          style={{ width: 180 }}
                          disabled={
                            subQuestLength.length === 67
                              ? false
                              : true

                          }
                        >
                          <Save /> Approve (อนุมัติ!)
                        </Button>
                      </Form.Item>
                    </div>

                    <div className='flex justify-center space-x-1 mt-3'>
                      <div>
                        <Button
                          color='danger'
                          style={{ width: 180 }}
                          variant='solid'
                          onClick={showUnAproveModal}
                        >
                          <Ban /> Cancel (ยกเลิก!)
                        </Button>
                      </div>
                    </div>

                    <div className='flex justify-center space-x-1 mt-3'>
                      <div>
                        <Button
                          style={{ width: 180 }}
                          variant='solid'
                          onClick={() => refreshData(hospcode)}
                        >
                          <RefreshCcw /> Refresh (รีเฟรช!)
                        </Button>
                      </div>
                    </div>

                  </div>
                </>
                : null
            }
          </Form>
        </div>

        <Modal
          title={
            <div className='flex items-center gap-2'>
              <ExclamationCircleFilled className='text-yellow-500' />
              <span className='font-bold'>คุณต้องการยกเลิกการอนุมัติด้านโครงสร้าง ของ{hospitalData[0]?.hname_th} [{hospitalData[0]?.hcode}] หรือไม่?</span>
            </div>
          }
          open={unApproveModal}
          onOk={formUnAprove.submit}
          onCancel={cancelModal}
          width={500}
          style={{ top: 20 }}

        >
          <div className='h-4'>
            <Form
              name='formUnApprove'
              form={formUnAprove}
              onFinish={handleUnApprove}
              onFinishFailed={onFinishFailed}
            >
              {
                searchQuests.map((it1) =>
                  searchQuery.map((it2) => (
                    it2.quest_name === it1.quest_name
                      ?
                      <>
                        <Form.Item
                          name={'evaluateId' + it2.id}
                          hidden={true}
                          initialValue={it2.id}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name={'hcode' + it2.id}
                          hidden={true}
                          initialValue={hospcode}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name={'usersId' + it2.id}
                          hidden={true}
                          initialValue={user.id}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name={'province' + it2.id}
                          hidden={true}
                          initialValue={user.province}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name={'zone' + it2.id}
                          hidden={true}
                          initialValue={user.zone}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name={'zone_approve' + it2.id}
                          hidden={true}
                          initialValue={false}
                        >
                          <Input />
                        </Form.Item>
                      </>
                      : null
                  ))
                )
              }
            </Form>
          </div>
        </Modal>


      </div>
    </div>
  )
}

export default FormApproveInfrastructure_Zone