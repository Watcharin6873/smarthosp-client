import React, { useEffect, useState } from 'react'
import useGlobalStore from '../../../../store/global-store'
import { useNavigate } from 'react-router-dom'
import {
  commentEvaluate,
  getCommentEvaluate,
  getCommentEvaluateById,
  getDocumentByEvaluateByHosp,
  getEvaluateByHosp3,
  getListEvaluateByProv,
  getSubQuetList,
  ssjApproveById,
  updateCommentEvaluate
} from '../../../../api/Evaluate'
import { Button, Checkbox, Divider, Form, Image, Select, Input, Switch, Modal } from 'antd'
import { ExclamationCircleFilled, EyeTwoTone, SnippetsOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import { getListQuests } from '../../../../api/Quest'
import { Ban, RefreshCcw, Save } from 'lucide-react'
import { getHospitalOnProv } from '../../../../api/Hospital'
import CommentForm from './CommentForm'

const FormApproveManagement_SSJ = () => {

  const navigate = useNavigate()
  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)
  const [disabledButton, setDisabledButton] = useState(false)
  const [updateCommentModal, setUpdateCommentModal] = useState(false)
  const [evaluateByProv, setEvaluateByProv] = useState([])
  const [listQuests, setListQuests] = useState([])
  const [searchQuery, setSearchQuery] = useState([])
  const [documentFile, setDocumentFile] = useState()
  const [hospcode, setHospcode] = useState(null)
  const [subQuestList, setSubQuestList] = useState([])
  const [listHospitals, setListHospitals] = useState([])
  const [comment, setComment] = useState([]);
  const [commentById, setCommentById] = useState({})


  const [formSsjApprove] = Form.useForm()
  const [formUnAprove] = Form.useForm()
  const [formUpdateComment] = Form.useForm()
  const province = user.province


  useEffect(() => {
    loadListEvaluateByProve(token)
    loadSubQuestList(token)
    loadListHospitals(token)
    loadCommentData(token)
  }, [])

  const loadListHospitals = async () => {
    await getHospitalOnProv(token, province)
      .then(res => {
        console.log(res.data)
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

  const loadCommentData = async () => {
    await getCommentEvaluate(token)
      .then(res => {
        // console.log('Comment: ', res.data)
        setComment(res.data)
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

  const category2 = evaluateByProv.filter(f => f.category_quests.id === 2)

  const uniqueData = [...new Map(category2.map(item => [item.hospitals['hcode', 'hname_th'], item])).values()]


  const optionSelectHosp = uniqueData.map((item) => ({
    value: item.hcode,
    label: item.hospitals.hname_th + ' [' + item.hcode + ']'
  }))

  const uniqueCatId = 2

  const selectHospital = (e) => {
    setDisabledButton(false)
    setHospcode(e)
    loadListQuests(token)
    setSearchQuery(category2.filter(f => f.hcode === e))
    getDocumentByEvaluateByHosp(token, uniqueCatId, e)
      .then(res => {
        // console.log(res.data)
        setDocumentFile(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const searchQuests = listQuests.filter(f => f.category_questId === 2)

  const refreshData = (value) => {
    loadListEvaluateByProve(token, province)
    loadSubQuestList(token)
    loadListHospitals(token)
    setSearchQuery(category2.filter(f => f.hcode === value))
  }


  useEffect(() => {
    formSsjApprove.setFieldsValue({
      evaluateId: searchQuery.id,
      usersId: user.id,
      province: user.province,
      zone: user.zone
    })
  })


  const displayPDF = (fileName) => {
    window.open(`https://bdh-service.moph.go.th/api/smarthosp/file-uploads/${fileName}`, "_blank", "noreferer")
  }

  useEffect(() => {
    formUnAprove.setFieldsValue({
      evaluateId: searchQuery.id,
      usersId: user.id,
      province: user.province,
      zone: user.zone
    })
  })

  const hospitalData = listHospitals.filter(f => f.hcode === hospcode)

  const handleApproveById = (e, id) => {
    const values = {
      id: id,
      ssj_approve: e
    }
    ssjApproveById(token, values)
      .then(res => {
        if (res.data.message == 'approve') {
          toast.success(`อนุมัติการประเมินในข้อนี้เรียบร้อยแล้ว!`)
        } else {
          toast.error(`ยกเลิกอนุมัติการประเมินในข้อนี้เรียบร้อยแล้ว!`)
        }

        getEvaluateByHosp3(token, uniqueCatId, hospcode)
          .then(res => {
            setSearchQuery(res.data)
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleSubmitComment = async (e) => {
    const valuesComment = {
      userId: user.id,
      evaluateId: e.evaluateId,
      comment_text: e.comment_text
    }
    await commentEvaluate(token, valuesComment)
      .then(res => {
        toast.success(res.data.message)
        loadCommentData(token)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const editText = async (e, id) => {
    setUpdateCommentModal(true)

    await getCommentEvaluateById(token, id)
      .then(res => {
        setCommentById(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }


  useEffect(() => {
    formUpdateComment?.setFieldsValue({
      id: commentById.id,
      comment_text: commentById.comment_text
    })
  })

  const handleUpdateComment = async (e) => {
    const values = {
      id: e.id,
      comment_text: e.comment_text,
      userId: user.id
    }
    await updateCommentEvaluate(token, values)
      .then(res => {
        toast.warning(res.data.message)
        setUpdateCommentModal(false)
        loadCommentData(token)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const cancelModal = () => {
    setUpdateCommentModal(false)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('ErrorInfo: ', errorInfo)
  }


  const dataSearch = searchQuery.map((item1) => ({
    hcode: item1.hcode,
    sub_questId: item1.sub_questId,
    ssj_approve: item1.ssj_approve,
    zone_approve: item1.zone_approve,
    check: item1.check,
    category_questId: item1.category_questId
  })
  )

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
  )


  return (
    <div>

      <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
        <p className='ml-2'>Approve ด้านบริหารจัดการ</p>
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
                  onClick={() => displayPDF(documentFile.file_name)}
                  type='primary'
                >
                  <SnippetsOutlined /> ดูเอกสาร/หลักฐาน
                </Button>
              </>
          }
          <Button
            style={{ width: 180 }}
            variant='solid'
            onClick={() => refreshData(hospcode)}
          >
            <RefreshCcw /> Refresh (รีเฟรช!)
          </Button>
        </div>
        <p className='text-sm text-orange-400 p-4'>หมายเหตุ: เมื่อคณะกรรมการระดับจังหวัด กดปุ่มอนุมัติคณะแนนจะเพิ่มขึ้น และหากยกเลิการอนุมัติคะแนนจะลดลงตามข้อที่มีการยกเลิก</p>
        <div>

          <table className='w-full text-left table-fixed text-slate-800'>
            <thead>
              <tr className='text-md text-slate-500 border border-l border-r border-slate-300 bg-slate-50'>
                <th className='text-center p-4 border-r'>เกณฑ์การประเมินและคำตอบ</th>
                <th className='text-center p-4 border-r w-32'>คะแนนที่ได้</th>
                <th className='text-center p-4 border-r w-32'>คะแนนจำเป็น</th>
                <th className='text-center p-4 border-r w-32'>ไฟล์หลักฐาน</th>
                <th className='text-center p-4 border-r w-32'>การอนุมัติ</th>
                <th className='text-center p-4 border-r w-52'>Comment จาก คกก.สสจ.</th>
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
                                  name={'ssj_approve' + item1.id}
                                  hidden={true}
                                  initialValue={true}
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
                                  name={'hcode' + item1.id}
                                  hidden={true}
                                  initialValue={user.hcode}
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
                                  <div className='pl-10 gap-2'>
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
                                          <Button onClick={() => displayPDF(item1.file_name)}>
                                            <EyeTwoTone /> ดูไฟล์
                                          </Button>
                                        </div>
                                      </>
                                      :
                                      <>
                                        -
                                      </>
                                  }

                                </div>
                              </td>
                              <td className='text-center border-l px-1'>
                                <Switch
                                  size='small'
                                  checked={
                                    item1.ssj_approve === true ? true : false
                                  }
                                  onChange={(e) => handleApproveById(e, item1.id)}
                                />
                              </td>
                              <td className='text-center border-l px-1'>
                                {/* ความเห็นเพิ่มเติม */}

                                {comment.some(cm => cm.evaluateId === item1.id) ? (
                                  <>
                                    <div>
                                      <div className='text-left border rounded-md mb-1 p-1 bg-slate-50'>
                                        <p className='text-xs'>{comment.filter(f => f.evaluateId === item1.id).map(ite => ite.comment_text)}</p>
                                      </div>
                                      <Button
                                        size='small'
                                        color="danger"
                                        variant="dashed"
                                        onClick={(e) => {
                                          const target = comment.find(f => f.evaluateId === item1.id);
                                          if (target) editText(e, target.id);
                                        }
                                        }
                                        block
                                      >
                                        แก้ไข Comment
                                      </Button>
                                    </div>
                                  </>
                                ) : (
                                  <CommentForm evaluateId={item1.id} onSubmit={handleSubmitComment} />
                                )}
                              </td>
                            </tr>
                          </>
                          : null
                      ))
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
                  : null
              }

            </tbody>
          </table>
        </div>
      </div>

      <Modal
        title={
          <div className='flex items-center gap-2'>
            <ExclamationCircleFilled className='text-yellow-500' />
            <span className='font-bold'>แก้ไข Comment ของ คกก.จังหวัด</span>
          </div>
        }
        open={updateCommentModal}
        onCancel={cancelModal}
        onOk={formUpdateComment.submit}
        width={350}
      >
        <Form
          form={formUpdateComment}
          onFinish={handleUpdateComment}
          onFinishFailed={onFinishFailed}
          layout='vertical'
        >
          <Form.Item
            name='id'
            hidden={true}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='comment_text'
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  )
}

export default FormApproveManagement_SSJ