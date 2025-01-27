import React, { useEffect, useState } from 'react'
import useGlobalStore from '../../../../store/global-store'
import { useNavigate } from 'react-router-dom'
import { getDocumentByEvaluateByHosp, getListEvaluateByProv, getSubQuetList, ssjChangeStatusApprove } from '../../../../api/Evaluate'
import { Button, Checkbox, Divider, Image, Select, Form, Input, Switch } from 'antd'
import { EyeTwoTone, SnippetsOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import { getListQuests } from '../../../../api/Quest'
import { Save } from 'lucide-react'
import { getSubQuestByCatId } from '../../../../api/SubQuest'

const FormApprovePeople_SSJ = () => {

  const navigate = useNavigate()
  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)
  const [disabledButton, setDisabledButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [evaluateByProv, setEvaluateByProv] = useState([])
  const [listQuests, setListQuests] = useState([])
  const [searchQuery, setSearchQuery] = useState([])
  const [documentFile, setDocumentFile] = useState()
  const [hospcode, setHospcode] = useState(null)
  const [subQuests, setSubQuests] = useState([])
  const [subQuestList, setSubQuestList] = useState([])
  const [formSsjApprove] = Form.useForm()
  const province = user.province


  useEffect(() => {
    loadListEvaluateByProve(token)
    loadSubQuests(token)
    loadSubQuestList(token)
  }, [])

  const uniqueCatId = 4

  const loadSubQuests = async () => {
    await getSubQuestByCatId(token, uniqueCatId)
      .then(res => {
        // console.log("SQ: ", res.data)
        setSubQuests(res.data)
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


  const loadListEvaluateByProve = async () => {
    await getListEvaluateByProv(token, province)
      .then(res => {
        // console.log("List: ", res.data)
        setEvaluateByProv(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const category4 = evaluateByProv.filter(f => f.category_quests.id === 4)

  const uniqueData = [...new Map(category4.map(item => [item.hospitals['hcode', 'hname_th'], item])).values()]

  // console.log("List: ", uniqueData)

  const optionSelectHosp = uniqueData.map((item) => ({
    value: item.hcode,
    label: item.hospitals.hname_th + ' [' + item.hcode + ']'
  }))


  const selectHospital = (e) => {
    setDisabledButton(false)
    setHospcode(e)
    loadListQuests(token)
    setSearchQuery(category4.filter(f => f.hcode === e))
    getDocumentByEvaluateByHosp(token, uniqueCatId, e)
      .then(res => {
        // console.log(res.data)
        setDocumentFile(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }


  const searchQuests = listQuests.filter(f => f.category_questId === 4)


  const changeStatusApprove = async (e, id) => {
    console.log(e, id)
    const values = {
      id: id,
      ssj_approve: e
    }

    await ssjChangeStatusApprove(token, values)
      .then(res => {
        toast.success(res.data.message)
        loadListEvaluateByProve(token, province)
        setSearchQuery(category4.filter(f => f.hcode == hospcode))
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    formSsjApprove.setFieldsValue({
      evaluateId: searchQuery.id,
      usersId: user.id,
      province: user.province,
      zone: user.zone
    })
  })

  const handleSubmit = async (fieldValue) => {
    setDisabledButton(true)
    const result = []
    searchQuery.forEach((qItem) => {
      result.push({
        evaluateId: fieldValue["evaluateId" + qItem.id],
        ssj_approve: fieldValue["ssj_approve" + qItem.id],
        usersId: fieldValue["usersId" + qItem.id],
        hcode: fieldValue["hcode" + qItem.id],
        province: fieldValue["province" + qItem.id],
        zone: fieldValue["zone" + qItem.id],
      })
    })
    console.log('Result: ', result)

    await ssjChangeStatusApprove(token, result)
      .then(res => {
        toast.success(res.data.message)
        loadListEvaluateByProve(token, province)
      })
      .catch(err => {
        console.log(err)
      })

  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed: ', errorInfo)
  }

  const showPDF = (pdf) => {
    window.open(`https://bdh-service.moph.go.th/api/smarthosp/file-uploads/${pdf}`, "_blank", "noreferer")
  }


  const subQuestLength = searchQuery.map((item1) =>
    searchQuests.map((item2) =>
      item1.quests.quest_name === item2.quest_name
        ? {
          quest_name: item1.quest_name,
          sub_quest_name: item2.sub_quest_name
        }
        : null
    )
  )


  const displayPDF = (fileName)=>{
    window.open(`https://bdh-service.moph.go.th/api/smarthosp/file-uploads/${fileName}`, "_blank", "noreferer")
  }


  return (
    <div>

      <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
        <p className='ml-2'>Approve ด้านบุคลากร</p>
      </div>

      <div className='bg-white rounded-md shadow-md p-3'>
        <div className='flex justify-center items-center space-x-3'>
          <p className='font-bold'>เลือกหน่วยบริการ : </p>
          <Select
            showSearch
            onChange={(e) => selectHospital(e)}
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={optionSelectHosp}
            placeholder='กรุณาเลือกหน่วยบริการ...'
            style={{ width: '40%' }}
          />
          {
            !documentFile
              ? null
              :
              <>
                <Button
                  onClick={() => showPDF(documentFile.file_name)}
                  type='primary'
                >
                  <SnippetsOutlined /> ดูเอกสาร/หลักฐาน
                </Button>
              </>
          }
        </div>
        <Divider />
        <div>
          <Form
            name='formSsjApprove'
            form={formSsjApprove}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
          >
            <table className='w-full text-left table-fixed text-slate-800'>
              <thead>
                <tr className='text-md text-slate-500 border border-l border-r border-slate-300 bg-slate-50'>
                  <th className='text-center p-4 border-r'>เกณฑ์การประเมินและคำตอบ</th>
                  <th className='text-center p-4 border-r w-32'>คะแนนที่ได้</th>
                  <th className='text-center p-4 border-r w-32'>คะแนนจำเป็น</th>
                  <th className='text-center p-4 border-r w-32'>ไฟล์หลักฐาน</th>
                  <th className='text-center p-4 border-r w-32'>การอนุมัติ</th>
                </tr>
              </thead>
              <tbody>
                {
                  searchQuests.map((item2, k2) =>
                    <>
                      <tr key={k2} className='border-b border-l border-r'>
                        <td colSpan={5}>
                          <p
                            className='ml-1 p-1 font-bold'
                            style={{ fontSize: '18px' }}
                          >
                            <u>{item2.quest_name}</u>
                          </p>
                        </td>
                      </tr>
                      {
                        searchQuery.map((item1, k1) => (
                          item1.quests.quest_name === item2.quest_name
                            ?
                            <>
                              <tr key={k1} className='border-neutral-200 dark:border-white/10 border-b border-l border-r'>
                                <td className='p-4'>
                                  <Form.Item
                                    name={'evaluateId' + item1.id}
                                    hidden={true}
                                    initialValue={item1.id}
                                  >
                                    <Input />
                                  </Form.Item>

                                  <Form.Item
                                    name={'usersId' + item1.id}
                                    hidden={true}
                                    initialValue={user.id}
                                  >
                                    <Input />
                                  </Form.Item>
                                  <Form.Item
                                    name={'province' + item1.id}
                                    hidden={true}
                                    initialValue={user.province}
                                  >
                                    <Input />
                                  </Form.Item>
                                  <Form.Item
                                    name={'zone' + item1.id}
                                    hidden={true}
                                    initialValue={user.zone}
                                  >
                                    <Input />
                                  </Form.Item>
                                  <div className='ml-7'>
                                    <p className='font-bold text-slate-600'>{item1.sub_quests.sub_quest_name}</p>
                                    <div className='pl-10 flex gap-2'>
                                      {
                                        item1.check.split(",").map((ch) =>
                                          dataSubQuestLists.map((sb) =>
                                            sb.sub_questId === item1.sub_quests.id && sb.choice === ch
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
                                    item1.check.split(",").map((ch) =>
                                      dataSubQuestLists.map((sb) =>
                                        sb.sub_questId === item1.sub_quests.id && sb.choice === ch
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
                                    item1.check.split(",").map((ch) =>
                                      dataSubQuestLists.map((sb) =>
                                        sb.sub_questId === item1.sub_quests.id && sb.choice === ch
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
                                      item1.file_name
                                        ?
                                        <>
                                          <div className='flex justify-center items-center'>
                                            <Button onClick={()=> displayPDF(item1.file_name)}>
                                              <EyeTwoTone /> ดูไฟล์
                                            </Button>
                                          </div>
                                          {/* <Image
                                            className='px-1 py-1'
                                            width={100}
                                            src={`https://bdh-service.moph.go.th/api/smarthosp/file-uploads/${item1.file_name}`}
                                          /> */}
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
                                    item1.ssj_approve === true
                                      ? <p className='font-bold text-green-700'>อนุมัติแล้ว!</p>
                                      : <p className='font-bold text-red-500'>ยังไม่อนุมัติ!</p>
                                  }
                                </td>
                              </tr>
                            </>
                            : null
                        ))
                      }
                    </>

                  )
                }
              </tbody>
            </table>
            <div className='flex justify-center space-x-1 mt-3'>
              <div className='m-3'>
                <Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    style={{ width: 500 }}
                    disabled={
                      subQuestLength.length === 14
                        ? false
                        : true
                    }
                  >
                    <Save /> Approve ผลการประเมินด้านโครงสร้าง
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default FormApprovePeople_SSJ