import React, { useEffect, useState } from 'react'
import { getSumEvaluateForAll } from '../api/Evaluate'
import { Input, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const FormHome = () => {

    const [listSumEvaluate, setListSumEvaluate] = useState([])
    const [searchQuery, setSearchQuery] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        loadListSumEvaluate()
    }, [])

    const loadListSumEvaluate = async () => {
        setIsLoading(true)
        await getSumEvaluateForAll()
            .then(res => {
                console.log(res.data)
                setListSumEvaluate(res.data)
                setSearchQuery(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setIsLoading(false))
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
        cyber_level: item.cyber_level,
        cyber_levelname: item.cyber_levelname

    }))

    const dataSource = data.sort((a, b) => (a.zone > b.zone) ? 1 : -1)

    const columns = [
        {
            title: 'เขตฯ',
            dataIndex: 'zone',
            align: 'center',
        },
        {
            title: 'จังหวัด',
            dataIndex: 'provname',
            align: 'center',
        },
        {
            title: <p className='text-center'>หน่วยบริการ</p>,
            render: ({ hname_th, hcode }) =>
                <>
                    <span style={{ fontSize: '14px' }}>{hname_th} [{hcode}]</span>
                </>

        },
        {
            title: 'ด้านโครงสร้าง',
            children: [
                {
                    title: 'คะแนนที่ได้',
                    dataIndex: 'point_total_cat1',
                    align: 'center',
                    render: (point_total_cat1)=> 
                        <span>{point_total_cat1 === null ? 0 : point_total_cat1}</span>
                },
                {
                    title: 'คะแนนจำเป็น',
                    dataIndex: 'point_require_cat1',
                    align: 'center',
                    render: (point_require_cat1)=> 
                        <span>{point_require_cat1 === null ? 0 : point_require_cat1}</span>
                }
            ]
        },
        {
            title: 'ด้านบริหารจัดการ',
            children: [
                {
                    title: 'คะแนนที่ได้',
                    dataIndex: 'point_total_cat2',
                    align: 'center',
                    render: (point_total_cat2)=> 
                        <span>{point_total_cat2 === null ? 0 : point_total_cat2}</span>
                },
                {
                    title: 'คะแนนจำเป็น',
                    dataIndex: 'point_require_cat2',
                    align: 'center',
                    render: (point_require_cat2)=> 
                        <span>{point_require_cat2 === null ? 0 : point_require_cat2}</span>
                }
            ]
        },
        {
            title: 'ด้านการบริการ',
            children: [
                {
                    title: 'คะแนนที่ได้',
                    dataIndex: 'point_total_cat3',
                    align: 'center',
                    render: (point_total_cat3)=> 
                        <span>{point_total_cat3 === null ? 0 : point_total_cat3}</span>
                },
                {
                    title: 'คะแนนจำเป็น',
                    dataIndex: 'point_require_cat3',
                    align: 'center',
                    render: (point_require_cat3)=> 
                        <span>{point_require_cat3 === null ? 0 : point_require_cat3}</span>
                }
            ]
        },
        {
            title: <p className='text-center'>ด้านบุคลากร</p>,
            children: [
                {
                    title: 'คะแนนที่ได้',
                    dataIndex: 'point_total_cat4',
                    align: 'center',
                    render: (point_total_cat4)=> 
                        <span>{point_total_cat4 === null ? 0 : point_total_cat4}</span>
                }
            ]
        },
        // {
        //     title: 'คะแนนรวม',
        //     dataIndex: '',
        //     align: 'center',
        // },
        // {
        //     title: 'ระดับที่ได้',
        //     dataIndex: '',
        //     align: 'center',
        // },
        {
            title: 'ระดับ Cyber Secuerity',
            align: 'center',
            render: ({ cyber_level, cyber_levelname }) =>
                <>
                    {
                        cyber_level === 'GREEN'
                            ? <p className='text-green-400'>{cyber_levelname}</p>
                            : cyber_level === 'YELLOW'
                                ? <p className='text-yellow-400'>{cyber_levelname}</p>
                                : cyber_level === 'RED'
                                    ? <p className='text-red-500'>{cyber_levelname}</p>
                                    : null
                    }

                </>
        },
    ]

    return (
        <>
            <div className='text-center p-3'>
                <p className='text-2xl font-bold text-green-700'>ผลการประเมินโรงพยาบาลอัจฉริยะ ปีงบประมาณ 2568 รวมทั้งหมด</p>
            </div>
            <div className='flex justify-between items-center p-3'>
                <div>
                    <p style={{ fontSize: '14px' }} className='text-blue-500'>
                        จำนวนหน่วยบริการทีประเมินทั้งหมด {searchQuery.length} รายการ
                    </p>
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
                bordered
                size='small'
            />
        </>
    )
}

export default FormHome