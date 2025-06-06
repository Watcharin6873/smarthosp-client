import React, { useEffect, useState } from 'react'
import { getSumEvaluateForAll } from '../api/Evaluate'
import { Button, Input, Table } from 'antd'
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons'
import { getEvaluateReportAll } from '../api/Report'
import * as XLSX from 'xlsx';
import ExportExcel from './ExportExcel'

const FormHome = () => {

    const [listSumEvaluate, setListSumEvaluate] = useState([])
    const [evaluateReportAll, setEvaluateReportAll] = useState([])
    const [searchQuery, setSearchQuery] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        loadListSumEvaluate()
        loadEvaluateReportAll()
    }, [])

    const loadListSumEvaluate = async () => {
        setIsLoading(true)
        await getSumEvaluateForAll()
            .then(res => {
                // console.log(res.data)
                setListSumEvaluate(res.data)
                setSearchQuery(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setIsLoading(false))
    }


    const loadEvaluateReportAll = async () => {
        await getEvaluateReportAll()
            .then(res => {
                // console.log('Data: ',res.data)
                setEvaluateReportAll(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }


    const handleFilter = (e) => {
        setSearchQuery(listSumEvaluate.filter(f =>
            f.hcode.toLowerCase().includes(e.target.value) ||
            f.hname_th.toLowerCase().includes(e.target.value) ||
            f.provname.toLowerCase().includes(e.target.value)
            // || f.zone.toLowerCase().includes(e.target.value)
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

    // const dataSource = data.sort((a, b) => (a.zone > b.zone) ? 1 : -1)

    const dataSource = data.sort((a, b) =>
        a.zone === b.zone ? (a.provcode > b.provcode ? 1 : -1) : (a.zone > b.zone ? 1 : -1)
    );

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

    const data2 = evaluateReportAll.map((item) => ({
        zone: Number(item.zone),
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


    const data3 = data2.map((item) => ({
        เขตสุขภาพ: Number(item.zone),
        รหัสจังหวัด: item.provcode,
        จังหวัด: item.provname,
        รหัสหน่วยบริการ: item.hcode,
        ชื่อหน่วยบริการ: item.hname_th,
        คะแนนที่ได้ด้านโครงสร้าง: item.point_total_cat1,
        คะแนนจำเป็นด้านโครงสร้าง: item.point_require_cat1,
        คะแนนที่ได้ด้านบริหารจัดการ: item.point_total_cat2,
        คะแนนจำเป็นด้านบริหารจัดการ: item.point_require_cat2,
        คะแนนที่ได้ด้านการบริการ: item.point_total_cat3,
        คะแนนจำเป็นด้านการบริการ: item.point_require_cat3,
        คะแนนที่ได้ด้านบุคลากร: item.point_total_cat4,
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

    // console.log('Data: ',data3)

    return (
        <>
            <div className='text-center p-2'>
                <p className='text-2xl font-bold text-green-700'>ผลการประเมินโรงพยาบาลอัจฉริยะ ปีงบประมาณ 2568 รวมทั้งหมด</p>
            </div>
            <div className='flex justify-between items-center py-2 px-3'>
                <div className='flex items-center gap-2'>
                    <p style={{ fontSize: '14px' }} className='text-blue-500'>
                        จำนวนหน่วยบริการทีประเมินทั้งหมด {searchQuery.length} รายการ
                    </p>
                    <ExportExcel data={data3} fileName={"SmartHospReport"} />
                    {/* <Button type='primary' icon={<DownloadOutlined shape='round' />} size='small'>ดาวน์โหลดทั้งหมด</Button> */}
                </div>
                <div>
                    <Input
                        placeholder='จังหวัด, รหัส 5 หลัก, ชื่อหน่วยบริการ...'
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

export default FormHome