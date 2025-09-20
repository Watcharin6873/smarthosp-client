import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useGlobalStore from '../../../store/global-store';
import {
  getDocumentByEvaluateByHosp,
  getDocumentsFromEvaluate,
  getEvaluateById,
  getEvidenceFromEvaluate,
  getListEvaluateByHosp2,
  getSubQuetList,
  getHospitalInListEvaluate,
  saveDocuments,
  updateChoiceEvaluate,
  uploadFileById,
  removeFileById,
  getCommentEvaluate,
  getListEvaluateByHosp3
} from '../../../api/Evaluate'
import { BellRing, CircleCheck, CircleX, FileCog, FilePenLine, LoaderCircle, Megaphone, MonitorCheck, RefreshCw, SquareCheckBig, SquareX, Trash } from 'lucide-react'
import { getListTopic } from '../../../api/Topic'
import { Button, Checkbox, Divider, Form, Image, Input, InputNumber, Modal, Radio, Select, Space, Upload } from 'antd'
import { getListQuests } from '../../../api/Quest'
import { EditOutlined, ExclamationCircleFilled, EyeTwoTone, UploadOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import axios from 'axios'
import { pdfjs } from 'react-pdf';
import PdfComp from '../../../components/reports/PdfComp'
import { getListSubQuests } from '../../../api/SubQuest'

const { confirm } = Modal

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


const props = {
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  showUploadList: {
    extra: ({ size = 0 }) => (
      <span
        className='text-slate-400'
      >
        &nbsp;({(size / 1024 / 1024).toFixed(2)}MB)
      </span>
    ),
    showRemoveIcon: true,
  },
};

const FormViewReportHosp = () => {
  const { hcode } = useParams();
  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)
  const [listCategoryQuest, setListCategoryQuest] = useState([])
  const [listQuest, setListQuest] = useState([])
  const [listEvaluate, setListEvaluate] = useState([])
  const [evaluateById, setEvaluateById] = useState({})
  const [searchCategory, setSearchCategory] = useState([])
  const [searchQuest, setSearchQuest] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
  const [isModalUploadOpen, setIsModalUploadOpen] = useState(false)
  const [isShowEvidenceModal, setIsShowEvidenceModal] = useState(false)
  const [formUpdate] = Form.useForm()
  const [formUpload] = Form.useForm()
  const [category_questId, setCategory_questtId] = useState('')
  const [document, setDocument] = useState()
  const [evidence, setEvidence] = useState()
  const [subQuestList, setSubQuestList] = useState([])
  const [listSubQuest, setListSubQuest] = useState([])
  const [subQuest, setSubQuest] = useState([])
  const [pdfFile, setPdfFile] = useState(null)
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [modalAlertNotiMessage, setModalAlertNotiMessage] = useState(false)
  const [comment, setComment] = useState([]);
  const [listPoint, setListPoint] = useState([])
  const [searchListPoint, setSearchListPoint] = useState([])
  const [hospitalInList, setHospitalInList] = useState([])

  useEffect(() => {
    loadListCategoryQuest(token)
    loadListQuest(token)
    loadSubQuestList(token)
    loadListEvaluate(token)
    loadCommentData(token)
    loadSubQuest(token)
    loadListPoint(token)
    loadHospitalInListEvaluate()
    // setModalAlertNotiMessage(true)
  }, [])

  useEffect(() => {
    let timerId = setTimeout(() => {
      refreshData()
    }, 2000)
    return () => {
      clearTimeout(timerId)
    }
  }, [])

  const loadHospitalInListEvaluate = async () => {
    await getHospitalInListEvaluate()
      .then(res => {
        setHospitalInList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const hospitalData = hospitalInList.filter(f => f.hcode == hcode)

  const h_data = hospitalData?.map((item)=>({
    hospcode: item.hcode,
    hospname: item.hname_th
  }))

  const loadSubQuestList = async () => {
    await getSubQuetList(token)
      .then(res => {
        setSubQuestList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadListCategoryQuest = async () => {
    await getListTopic(token)
      .then(res => {
        setListCategoryQuest(res.data)
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

  const loadSubQuest = async () => {
    await getListSubQuests(token)
      .then(res => {
        setListSubQuest(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const listSubQuest2 = listSubQuest.map((item) => ({
    id: item.id,
    category_questId: parseInt(item.category_questId),
    questId: item.questId,
    sub_quest_name: item.sub_quest_name,
    necessary: item.necessary
  }))

  const optionCategory = listCategoryQuest.map((item) => ({
    value: item.id,
    label: item.category_name_th,
    key: item.id
  }))

  const loadListQuest = async () => {
    await getListQuests(token)
      .then(res => {
        setListQuest(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadListEvaluate = async () => {
    setIsLoading(true)
    await getListEvaluateByHosp2(token, hcode)
      .then(res => {
        setListEvaluate(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }


  const loadListPoint = async () => {
    await getListEvaluateByHosp3(token, hcode)
      .then(res => {
        // console.log('Data3: ', res.data)
        setListPoint(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }


  const selectCategoryQuest = (e) => {
    setCategory_questtId(e)
    setSearchCategory(listEvaluate.filter(f => f.category_questId === e))
    setSearchQuest(listQuest.filter(f => f.category_questId === e))
    setSubQuest(listSubQuest2.filter(f => f.category_questId === e))
    setSearchListPoint(listPoint.filter(f => f.category_questId === e))
    // loadSubQuestList76(token)
  }

  console.log('subQuest: ', subQuest)


  const showUploadModal = async (value) => {
    console.log('Value: ', value)
    setIsModalUploadOpen(true)
    await getEvaluateById(token, value.id)
      .then(res => {
        setEvaluateById(res.data)
        // refreshData(category_questId, hcode)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // console.log('Evaluate: ', evaluateById)

  const refreshData = () => {
    setSearchCategory(listEvaluate.filter(f => f.category_questId === category_questId))
  }

  useEffect(() => {
    formUpload.setFieldsValue({
      evaluateId: evaluateById.id,
      file_name: []
    })
  })

  const dataScore = searchListPoint.map((item) => ({
    category_questId: Number(item.category_questId),
    sub_quest_require_point: Number(item.sub_quest_require_point),
    sub_quest_total_point: Number(item.sub_quest_total_point)
  }))



  const showUpdateModal = async (id) => {
    console.log(id)
    setIsModalUpdateOpen(true)
    await getEvaluateById(token, id)
      .then(res => {
        console.log("GetById: ", res.data)
        setEvaluateById(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }


  useEffect(() => {
    formUpdate.setFieldsValue({
      id: evaluateById.id,
      category_questId: evaluateById.category_questId,
      questId: evaluateById.questId,
      sub_questId: evaluateById.sub_questId,
      check: evaluateById.check,
      hcode: evaluateById.hcode,
      userId: evaluateById.userId
    })
  })

  const handleUpdateEvaluate = async (fieldValue) => {
    const values = {
      ...fieldValue, id: evaluateById.id
    }
    console.log('Values: ', values)
    await updateChoiceEvaluate(token, values)
      .then(res => {
        toast.success(res.data.message)
        setIsModalUpdateOpen(false)
        loadListEvaluate(token)
        setSearchCategory(listEvaluate.filter(f => f.category_questId === category_questId))
      })
      .catch(err => {
        console.log(err.response.data.message)
        toast.error(err.response.data.message)
      })
  }

  const handleUploadFile = async (fieldValue) => {
    const formData = new FormData();
    formData.append("file_name", fieldValue.file_name.file.originFileObj)
    await uploadFileById(token, evaluateById.id, formData)
      .then(res => {
        toast.success(res.data.message)
        setIsModalUploadOpen(false)
        loadListEvaluate(token)
        formUpload.resetFields()
      }).catch(err => {
        console.log(err.response.data)
        toast.error(err.response.data.message)
      })
  }


  const onFinishFailed = (errorInfo) => {
    console.log('Failed: ', errorInfo)
  }


  const closeModal = () => {
    setIsModalUpdateOpen(false)
    setIsModalUploadOpen(false)
    setIsShowEvidenceModal(false)
    // setModalAlertNotiMessage(false)
  }

  const showDocument = (values) => {
    console.log(values)
    getDocumentByEvaluateByHosp(token, values, hcode)
      .then(res => {
        // console.log('Document: ', res.data)
        if (res.data) {
          window.open(`https://bdh-service.moph.go.th/api/smarthosp/file-uploads/${res.data.file_name}`, "_blank", "noreferrer")
        } else {
          toast.warning('ไม่พบข้อมูล!')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const showEvidenceModal = async (id) => {
    setIsShowEvidenceModal(true)
    await getEvaluateById(token, id)
      .then(res => {
        console.log("GetById: ", res.data)
        setEvaluateById(res.data)
        setPdfFile(`https://bdh-service.moph.go.th/api/smarthosp/file-uploads/${res.data.file_name}`)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const showEvidence = (evd) => {
    // console.log('EVD: ', evd)
    getEvidenceFromEvaluate(token, evd.id, hcode)
      .then(res => {
        console.log('Evidence: ', res.data)
        window.open(`https://bdh-service.moph.go.th/api/smarthosp/file-uploads/${res.data.file_name}`, "_blank", "noreferrer")
      })
      .catch(err => {
        toast.error("ไม่พบข้อมูล!")
        console.log(err)
      })


  }


  const dataSearchCategorys = searchCategory.map((item) => ({
    id: item.id,
    category_questId: item.category_questId,
    questId: item.questId,
    sub_questId: item.sub_questId,
    sub_quest_name: item.sub_quests.sub_quest_name,
    necessary: item.sub_quests.necessary,
    check: item.check.split(","),
    hcode: item.hcode,
    userId: item.userId,
    file_name: item.file_name,
    ssj_approve: item.ssj_approve,
    zone_approve: item.zone_approve,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }))

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


  // console.log('Data1: ', dataSearchCategorys)
  // console.log('Data2: ', dataSubQuestLists)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const removeFile = (id) => {
    console.log(id)
    confirm({
      title: 'ต้องการลบไฟล์หลักฐานนี้หรือไม่?',
      icon: <ExclamationCircleFilled />,
      okText: 'ใช่',
      okType: 'danger',
      cancelText: 'ไม่',
      onOk() {
        removeFileById(token, id)
          .then(res => {
            toast.error(res.data.message)
            setIsShowEvidenceModal(false)
            loadListEvaluate(token)
          })
          .catch(err => {
            console.log(err)
          })
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }


  return (
    <div>
      <div className='flex justify-center items-center text-2xl font-bold mb-8 text-green-600'>
        <MonitorCheck /> <p className='ml-2'> รายงานผลการประเมินโรงพยาบาลอัจฉริยะ ประจำปีงบประมาณ 2568 ของ{h_data?.map(it=> it.hospname)} [{h_data?.map(it=> it.hospcode)}]</p>
      </div>
      <div className='bg-white rounded-md shadow-md p-3'>

        <div className='flex justify-center items-center space-x-1'>
          <p className='font-bold'>ด้านการประเมิน : </p>
          <Select
            onChange={(e) => selectCategoryQuest(e)}
            options={optionCategory}
            placeholder='กรุณาเลือกด้านการประเมินที่ต้องการ...'
            style={{ width: '20%' }}
          // disabled
          />
          {
            searchCategory.length > 0
              ?
              <>
                <Button onClick={() => showDocument(category_questId)}>
                  <EyeTwoTone /> ดูหลักฐานไฟล์รวม
                </Button>
              </>
              : null
          }
          <Button
            onClick={refreshData}
          // disabled
          >
            <RefreshCw size={13} /> รีเฟรช
          </Button>
        </div>
        <Divider />
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
                <table className='text-left table-fixed w-full min-w-screen text-slate-800'>
                  <thead className=''>
                    <tr
                      className='text-md text-slate-500 border border-l border-r border-slate-300 bg-slate-50'
                      style={{ fontSize: '15px' }}
                    >
                      <th className='text-center p-4 border-r' style={{ width: 500 }}>เกณฑ์การประเมิน</th>
                      {/* <th className='text-center p-4 border-r'>จำเป็นดำเนินการ</th> */}
                      <th className='text-center p-4 border-r'>คะแนนที่ได้</th>
                      <th className='text-center p-4 border-r'>คะแนนจำเป็น</th>
                      <th className='text-center p-4 border-r w-52'>ภาพหลักฐาน</th>
                      {/* <th className='text-center p-4 border-r w-44'>Comment</th> */}
                      <th className='text-center p-4 border-r'>สสจ.<br />อนุมัติ</th>
                      <th className='text-center p-4 border-r'>เขตฯ<br />อนุมัติ</th>
                      {/* <th className='text-center p-4 border-r'>แก้ไข</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {searchQuest.map((item1, k1) => (
                      <>
                        <tr key={k1} className='border'>
                          <td className='p-1 text-amber-950 font-bold' colSpan={5}>{item1.quest_name}</td>
                        </tr>
                        {dataSearchCategorys.map((item2, k2) => (
                          item1.id === item2.questId
                            ?
                            <tr key={k2} className='border'>
                              <td className='pl-5 pr-1 py-1 border-r w-screen' style={{ fontSize: '15px' }}>
                                <div className='flex gap-1'>
                                  <p className='font-bold'>
                                    {item2.sub_quest_name}
                                    {
                                      item2.necessary
                                        ?
                                        <span className='text-red-600'> (*จำเป็น)</span>
                                        : ''
                                    }
                                  </p>

                                </div>
                                {
                                  item2.check?.map((ch) =>
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
                                          {/* <p className='text-red-600'>{sb.necessary === true ? '(*)' : ''}</p> */}
                                        </div>
                                        : null
                                    )
                                  )
                                }
                              </td>
                              <td className='text-center border-r'>
                                {
                                  item2.check?.map((ch) =>
                                    dataSubQuestLists.map((sb) =>
                                      sb.sub_questId === item2.sub_questId && sb.choice === ch
                                        ?
                                        <div>
                                          <p className='font-bold'>
                                            {
                                              sb.sub_quest_total_point
                                            }
                                          </p>
                                        </div>
                                        : null
                                    )
                                  )
                                }
                              </td>
                              <td className='text-center border-r' style={{ fontSize: '15px' }}>
                                {
                                  item2.check?.map((ch) =>
                                    dataSubQuestLists.map((sb) =>
                                      sb.sub_questId === item2.sub_questId && sb.choice === ch
                                        ?
                                        <div>
                                          <p className='font-bold'>
                                            {
                                              sb.sub_quest_require_point
                                            }
                                          </p>
                                        </div>
                                        : null
                                    )
                                  )
                                }
                              </td>
                              <td className='text-center border-r p-1' style={{ fontSize: '15px' }}>
                                {
                                  item2.file_name
                                    ?
                                    <>
                                      <div className='flex justify-center items-center'>
                                        <Button size='small' onClick={() => showEvidenceModal(item2.id)}>
                                          <EyeTwoTone /> ดูหลักฐาน
                                        </Button>
                                      </div>
                                    </>
                                    :
                                    <>
                                    </>
                                }
                              </td>
                              <td className='text-center border-r'>
                                {
                                  item2.ssj_approve
                                    ?
                                    <div className='flex justify-center'>
                                      <SquareCheckBig className='text-green-500' size={16} />
                                    </div>
                                    :
                                    <div className='flex justify-center'>
                                      <SquareX className='text-red-500' size={16} />
                                    </div>

                                }
                              </td>
                              <td className='text-center border-r'>
                                {
                                  item2.zone_approve
                                    ?
                                    <div className='flex justify-center'>
                                      <SquareCheckBig className='text-green-500' size={16} />
                                    </div>
                                    :
                                    <div className='flex justify-center'>
                                      <SquareX className='text-red-500' size={16} />
                                    </div>
                                }
                              </td>
                            </tr>
                            : null
                        ))}
                      </>
                    ))}
                    {
                      category_questId && category_questId
                        ?
                        <tr className='border font-bold text-blue-500 bg-slate-50'>
                          <td className='text-center border-r p-1'>
                            คะแนนรวมทั้งหมด(จากการอนุมัติของ คกก.จังหวัด)
                          </td>
                          <td className='text-center border-r p-1'>
                            {
                              dataScore.map((score) => (
                                <p>{score.sub_quest_total_point}</p>
                              ))
                            }
                          </td>
                          <td className='text-center border-r p-1'>
                            {
                              dataScore.map((score) => (
                                <p>{score.sub_quest_require_point}</p>
                              ))
                            }
                          </td>
                          <td className='text-center border-r p-1' colSpan={3}></td>
                        </tr>
                        : null
                    }
                  </tbody>
                </table>
              </>
          }

          {/*Modal upload File_name*/}
          <Modal
            title={
              <div className='flex justify-center'>
                <ExclamationCircleFilled className='text-yellow-500' /> &nbsp;
                <span className='text-xl font-bold'>Upload ไฟล์หลักฐาน</span>
              </div>
            }
            open={isModalUploadOpen}
            onOk={formUpload.submit}
            onCancel={closeModal}
            width={480}
            style={{ top: 20 }}
          >
            <Divider />

            <Form
              name='formUpload'
              form={formUpload}
              layout='vertical'
              onFinish={handleUploadFile}
              onFinishFailed={onFinishFailed}
              className='mt-2'
            >
              <div className='m-2'>
                {
                  evaluateById.length > 0
                    ? <p className='text-md text-blue-700 font-bold'>{evaluateById.sub_quests.sub_quest_name}</p>
                    : null
                }

              </div>
              <Form.Item
                name='file_name'
                label={<b>อัปโหลดไฟล์/เอกสาร หลักฐาน</b>}
                rules={[
                  { required: true, message: 'กรุณาเลือกไฟล์!' }
                ]}
              >
                <Upload
                  customRequest={({ onSuccess }) => onSuccess('ok')}
                  {...props}
                >
                  <Button>
                    <UploadOutlined /> อัปโหลดไฟล์นามสกุล (.pdf) และขนาดไฟล์ต้องไม่เกิน 2 MB เท่านั้น!
                  </Button>
                </Upload>
              </Form.Item>
            </Form>
          </Modal>


          {/* Modal Update data */}
          <Modal
            title={
              <div className='flex justify-center'>
                <ExclamationCircleFilled className='text-yellow-500' /> &nbsp;
                <span className='text-xl font-bold'>แก้ไขคำตอบการประเมิน</span>
              </div>
            }
            open={isModalUpdateOpen}
            onOk={formUpdate.submit}
            onCancel={closeModal}
            width={450}
            style={{ top: 20 }}
          >
            <Form
              name='formUpdate'
              form={formUpdate}
              layout='vertical'
              onFinish={handleUpdateEvaluate}
              onFinishFailed={onFinishFailed}
              className='mt-2'
            >
              <Form.Item
                name='hcode'
                label={<b>หน่วยบริการ</b>}
              >
                <div className='p-1 border rounded-md'>
                  {
                    evaluateById.hcode
                      ? user.hname_th + " [" + evaluateById.hcode + "]"
                      : null
                  }
                </div>
              </Form.Item>
              <Form.Item
                name='category_questId'
                label={<b>ด้านการประเมิน</b>}
              >
                <div className='p-1 border rounded-md'>
                  {
                    evaluateById.category_questId
                      ? evaluateById.category_quests.category_name_th
                      : null
                  }
                </div>
              </Form.Item>
              <Form.Item
                name='questId'
                label={<b>เกณฑ์หลัก</b>}
              >
                <div className='p-1 border rounded-md'>
                  {
                    evaluateById.questId
                      ? evaluateById.quests.quest_name
                      : null
                  }
                </div>
              </Form.Item>
              <Form.Item
                name='sub_questId'
                label={<b>เกณฑ์ย่อย</b>}
              >
                <div className='p-1 border rounded-md'>
                  {
                    evaluateById.sub_questId
                      ? evaluateById.sub_quests.sub_quest_name
                      : null
                  }
                </div>
              </Form.Item>
              <div className='flex justify-between'>
                <div>
                  <Form.Item
                    name='check'
                    label={<b>ตัวเลือกประเมิน</b>}
                    rules={[
                      {
                        required: true,
                        message: 'ระบุคะแนนจำเป็น'
                      }
                    ]}
                  >
                    {
                      evaluateById.sub_questId === 76
                        ?
                        <>
                          <Checkbox.Group style={{ display: 'inline-block' }}>
                            {
                              evaluateById?.sub_quests?.sub_quest_lists?.map((it1, k1) => (
                                <div className='flex gap-1'>
                                  {
                                    it1.sub_quest_listname === 'ไม่มีการดำเนินการ'
                                      ?
                                      <>
                                        <Checkbox key={k1} value={it1.choice} /><p className='text-red-500'>{it1.sub_quest_listname}</p>
                                      </>
                                      :
                                      <>
                                        <Checkbox key={k1} value={it1.choice} /><p className='text-green-700'>{it1.sub_quest_listname}</p>
                                      </>
                                  }

                                </div>
                              ))
                            }
                          </Checkbox.Group>
                        </>
                        :
                        <>
                          <Radio.Group>
                            <Space direction='vertical'>
                              {
                                evaluateById?.sub_quests?.sub_quest_lists?.map((ch) => (
                                  <Radio value={ch.choice}
                                    className={
                                      ch.sub_quest_listname === "ไม่มีการดำเนินการ"
                                        ? `text-red-700 pl-7`
                                        : `text-green-700 pl-7`
                                    }
                                  >
                                    {ch.sub_quest_listname} {ch.necessary ? <p className='text-red-500'>(*จำเป็น)</p> : null}
                                  </Radio>
                                ))
                              }
                            </Space>
                          </Radio.Group>
                        </>
                    }
                  </Form.Item>
                </div>
              </div>
              <Form.Item
                name='userId'
                label={<b>ผู้ประเมิน</b>}
              >
                <div className='p-1 border rounded-md'>
                  {
                    evaluateById.userId
                      ? user.firstname_th + " " + user.lastname_th
                      : null
                  }
                </div>
              </Form.Item>
            </Form>
          </Modal>


          {/* Modal view evidence */}
          <Modal
            title={
              <div className='flex justify-center'>
                <ExclamationCircleFilled className='text-yellow-500' /> &nbsp;
                <span className='text-xl font-bold'>ดูข้อมูลหลักฐาน</span>
              </div>
            }
            open={isShowEvidenceModal}
            // onOk={formUpdate.submit}
            onCancel={closeModal}
            width={700}
            style={{ top: 20 }}
            footer={
              <Button size='small' color='danger' onClick={closeModal} variant="dashed">ปิด</Button>
            }
          >
            <Divider />
            <div>
              <p className='text-slate-600 font-bold'>{evaluateById?.sub_quests?.sub_quest_name}</p>
            </div>
            <div className='flex gap-4 mt-2'>
              <Button size='small' color='danger' variant='outlined' onClick={() => removeFile(evaluateById?.id)}>
                <Trash size={16} /> ลบไฟล์หลักฐานนี้
              </Button>
            </div>
            <div>
              <PdfComp pdfFile={pdfFile} />
            </div>
          </Modal>

          {/* <Modal
                        // title="แจ้งปิดการแก้ไขการประเมินชั่วคราว"
                        title={
                            <div className='flex justify-center'>
                                <BellRing className='text-yellow-500' /> &nbsp;
                                <span className='text-xl font-bold'>แจ้งปิดการแก้ไขการประเมินชั่วคราว</span>
                                &nbsp; <BellRing className='text-yellow-500' />
                            </div>
                        }
                        open={modalAlertNotiMessage}
                        // onOk={handleOk}
                        onCancel={closeModal}
                        width={900}
                        footer={null}
                    >
                        <Divider />
                        <p className='text-red-400 text-center'>***เรียน ทุกท่าน
                            ทาง สสท. จะปิดระบบรายงานผลการประเมิน ในวันที่ 1 เมษายน 2568 ตั้งแต่เวลา 00.01 น. - 15.00 น. ระหว่างนี้หน่วยบริการจะไม่สามารถแก้ไขผลการการประเมินได้ในช่วงดังกล่าว 
                            เพื่อให้ คกก.จังหวัด และ คกก.เขต ตรวจสอบการ Approve โดย สสท จะขอให้ทาง คกก.จังหวัด และ คกก.เขต ช่วย approved หน่วยบริการ 
                            และระบบรายงานผลการประเมิน อีกครั้งในเวลา 15.00 น. และขออภัยในความไม่สะดวกครับ***</p>
                    </Modal> */}
        </div>
      </div>
    </div>
  )
}

export default FormViewReportHosp
