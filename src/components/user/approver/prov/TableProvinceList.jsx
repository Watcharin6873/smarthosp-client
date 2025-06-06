import React, { useEffect, useState } from 'react'
import useGlobalStore from '../../../../store/global-store'
import { getCheckApproveAll, getSumEvaluateByProv } from '../../../../api/Evaluate'
import { Input, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import ExportExcel_prov from './ExportExcel_prov'
import { CircleCheck, CircleX } from 'lucide-react'

const TableProvinceList = () => {

    const user = useGlobalStore((state) => state.user)
    const token = useGlobalStore((state) => state.token)
    const province = user.province

    const [listSumEvaluate, setListSumEvaluate] = useState([])
    const [searchQuery, setSearchQuery] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [approveData, setApproveData] = useState([])

    useEffect(() => {
        loadListSumEvaluate(token)
        loadCheckApproveAll()
    }, [])

    const loadListSumEvaluate = async () => {
        setIsLoading(true)
        await getSumEvaluateByProv(token, province)
            .then(res => {
                // console.log('Data: ', res.data)
                setListSumEvaluate(res.data)
                setSearchQuery(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setIsLoading(false))
    }

    const loadCheckApproveAll = async () => {
        await getCheckApproveAll()
            .then(res => {
                setApproveData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }


    const apData = approveData?.map((item) => ({
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


    const listSumEvaluate2 = listSumEvaluate.map((item1) => {
    const item2 = apData?.filter(f => f.provname === province && f.hcode === item1.hcode);
    return {
      zone: Number(item1.zone),
    provcode: item1.provcode,
    provname: item1.provname,
    hcode: item1.hcode,
    hname_th: item1.hname_th,
    point_total_cat1: item1.point_total_cat1,
    point_require_cat1: item1.point_require_cat1,
    ssjapp_cat1: item2[0]?.ssj_approve_cat1,
    zoneapp_cat1: item2[0]?.zone_approve_cat1,
    point_total_cat2: item1.point_total_cat2,
    point_require_cat2: item1.point_require_cat2,
    ssjapp_cat2: item2[0]?.ssj_approve_cat2,
    zoneapp_cat2: item2[0]?.zone_approve_cat2,
    point_total_cat3: item1.point_total_cat3,
    point_require_cat3: item1.point_require_cat3,
    ssjapp_cat3: item2[0]?.ssj_approve_cat3,
    zoneapp_cat3: item2[0]?.zone_approve_cat3,
    point_total_cat4: item1.point_total_cat4,
    ssjapp_cat4: item2[0]?.ssj_approve_cat4,
    zoneapp_cat4: item2[0]?.zone_approve_cat4,
    cyber_level: item1.cyber_level,
    cyber_levelname: item1.cyber_levelname
    }
  })

//   console.log('List2: ', listSumEvaluate2)



    const handleFilter = (e) => {
        setSearchQuery(listSumEvaluate2.filter(f =>
            f.hcode.toLowerCase().includes(e.target.value) || f.hname_th.toLowerCase().includes(e.target.value)
        ))
    }


    const data = searchQuery.map((item, k) => ({
        key: k,
        zone: Number(item.zone),
        provcode: item.provcode,
        provname: item.provname,
        hcode: item.hcode,
        hname_th: item.hname_th,
        point_total_cat1: item.point_total_cat1,
        point_require_cat1: item.point_require_cat1,
        ssjapp_cat1: item.ssjapp_cat1,
        zoneapp_cat1: item.zoneapp_cat1,
        point_total_cat2: item.point_total_cat2,
        point_require_cat2: item.point_require_cat2,
        ssjapp_cat2: item.ssjapp_cat2,
        zoneapp_cat2: item.zoneapp_cat2,
        point_total_cat3: item.point_total_cat3,
        point_require_cat3: item.point_require_cat3,
        ssjapp_cat3: item.ssjapp_cat3,
        zoneapp_cat3: item.zoneapp_cat3,
        point_total_cat4: item.point_total_cat4,
        ssjapp_cat4: item.ssjapp_cat4,
        zoneapp_cat4: item.zoneapp_cat4,
        total_cat: item.point_total_cat1 + item.point_total_cat2 + item.point_total_cat3 + item.point_total_cat4,
        total_require: item.point_require_cat1 + item.point_require_cat2 + item.point_require_cat3,
        cyber_level: item.cyber_level,
        cyber_levelname: item.cyber_levelname

    }))

    const dataSource = data.sort((a, b) => (a.provcode > b.provcode) ? 1 : -1)

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

    const data2 = listSumEvaluate2.map((item, k) => ({
        key: k,
        zone: Number(item.zone),
        provcode: item.provcode,
        provname: item.provname,
        hcode: item.hcode,
        hname_th: item.hname_th,
        point_total_cat1: item.point_total_cat1,
        point_require_cat1: item.point_require_cat1,
        ssjapp_cat1: item.ssjapp_cat1,
        zoneapp_cat1: item.zoneapp_cat1,
        point_total_cat2: item.point_total_cat2,
        point_require_cat2: item.point_require_cat2,
        ssjapp_cat2: item.ssjapp_cat2,
        zoneapp_cat2: item.zoneapp_cat2,
        point_total_cat3: item.point_total_cat3,
        point_require_cat3: item.point_require_cat3,
        ssjapp_cat3: item.ssjapp_cat3,
        zoneapp_cat3: item.zoneapp_cat3,
        point_total_cat4: item.point_total_cat4,
        ssjapp_cat4: item.ssjapp_cat4,
        zoneapp_cat4: item.zoneapp_cat4,
        total_cat: item.point_total_cat1 + item.point_total_cat2 + item.point_total_cat3 + item.point_total_cat4,
        total_require: item.point_require_cat1 + item.point_require_cat2 + item.point_require_cat3,
        cyber_level: item.cyber_level,
        cyber_levelname: item.cyber_levelname
    }))

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


    return (
        <>
            <div className='text-center p-2'>
                <p className='text-2xl font-bold text-green-700'>ผลการประเมินโรงพยาบาลอัจฉริยะ ปีงบประมาณ 2568 ของจังหวัด{province}</p>
            </div>
            <div className='flex justify-between items-center py-2 px-3'>
                <div className='flex items-center gap-2'>
                    <p style={{ fontSize: '14px' }} className='text-blue-500'>
                        จำนวนหน่วยบริการทีประเมินทั้งหมด {searchQuery.length} รายการ
                    </p>
                    <ExportExcel_prov data={data3} fileName={"SmartHospReport-prov"} />
                </div>
                <div>
                    <Input
                        placeholder='รหัส 5 หลัก, ชื่อหน่วยบริการ...'
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
            // pagination={{pageSize:12}}
            />
        </>
    )
}

export default TableProvinceList