import React, { useEffect, useState } from 'react'
import useGlobalStore from '../../../../store/global-store'
import { changeStatusZoneApprove, getCheckApproveAll, getCheckApproveZone } from '../../../../api/Evaluate'
import { Alert, Input, Select, Switch, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { SquareCheckBig, SquareX } from 'lucide-react'
import { toast } from 'react-toastify'

const ApproveAll = () => {

  const user = useGlobalStore((state) => state.user)
  const token = useGlobalStore((state) => state.token)
  const [isLoading, setIsLoading] = useState(false)
  const [approveData, setApproveData] = useState([])
  const [searchQuery, setSearchQuery] = useState([])
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  const zone = user.zone

  useEffect(() => {
    loadCheckApproveAll()
  }, [])


  const loadCheckApproveAll = async () => {
    await getCheckApproveZone(zone)
      .then(res => {
        setApproveData(res.data)
        setSearchQuery(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }


  const handleFilter = (e) => {
    setSearchQuery(approveData.filter(f =>
      f.hcode.toLowerCase().includes(e.target.value) || f.hname_th.toLowerCase().includes(e.target.value) ||
      f.provname.toLowerCase().includes(e.target.value)
    ))
  }


  const dataSource = searchQuery?.map((item) => ({
    zone: parseInt(item.zone),
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


  const columns = [
    {
      title: <p className='text-center' style={{ fontSize: '12px' }}>เขตฯ</p>,
      align: 'center',
      render: ({ zone }) =>
        <span style={{ fontSize: '12px' }}>{zone}</span>
    },
    {
      title: <p className='text-center' style={{ fontSize: '12px' }}>จังหวัด</p>,
      align: 'center',
      render: ({ provname }) =>
        <span style={{ fontSize: '12px' }}>{provname}</span>
    },
    {
      title: <p className='text-center' style={{ fontSize: '12px' }}>หน่วยบริการ</p>,
      render: ({ hname_th, hcode }) =>
        <>
          <span style={{ fontSize: '12px' }}>{hname_th} [{hcode}]</span>
        </>

    },
    {
      title: <p className='text-center' style={{ fontSize: '12px' }}>ด้านโครงสร้าง</p>,
      children: [
        {
          title: <p className='text-center' style={{ fontSize: '12px' }}>สสจ.</p>,
          dataIndex: 'ssj_approve_cat1',
          align: 'center',
          render: (ssj_approve_cat1) =>
            <div className='flex justify-center'>
              {
                ssj_approve_cat1 === 67
                  ?
                  <SquareCheckBig className='text-green-500' size={16} />
                  :
                  <SquareX className='text-red-500' size={16} />
              }
            </div>
        },
        {
          title: <p className='text-center' style={{ fontSize: '12px' }}>เขตฯ</p>,
          dataIndex: 'zone_approve_cat1',
          align: 'center',
          render: (zone_approve_cat1) =>
            <div className='flex justify-center'>
              {
                zone_approve_cat1 === 67
                  ?
                  <SquareCheckBig className='text-green-500' size={16} />
                  :
                  <SquareX className='text-red-500' size={16} />
              }
            </div>
        }
      ]
    },
    {
      title: <p className='text-center' style={{ fontSize: '12px' }}>ด้านบริหารจัดการ</p>,
      children: [
        {
          title: <p className='text-center' style={{ fontSize: '12px' }}>สสจ.</p>,
          dataIndex: 'ssj_approve_cat2',
          align: 'center',
          render: (ssj_approve_cat2) =>
            <div className='flex justify-center'>
              {
                ssj_approve_cat2 === 42
                  ?
                  <SquareCheckBig className='text-green-500' size={16} />
                  :
                  <SquareX className='text-red-500' size={16} />
              }
            </div>
        },
        {
          title: <p className='text-center' style={{ fontSize: '12px' }}>เขตฯ</p>,
          dataIndex: 'zone_approve_cat2',
          align: 'center',
          render: (zone_approve_cat2) =>
            <div className='flex justify-center'>
              {
                zone_approve_cat2 === 42
                  ?
                  <SquareCheckBig className='text-green-500' size={16} />
                  :
                  <SquareX className='text-red-500' size={16} />
              }
            </div>
        }
      ]
    },
    {
      title: <p className='text-center' style={{ fontSize: '12px' }}>ด้านการบริการ</p>,
      children: [
        {
          title: <p className='text-center' style={{ fontSize: '12px' }}>สสจ.</p>,
          dataIndex: 'ssj_approve_cat3',
          align: 'center',
          render: (ssj_approve_cat3) =>
            <div className='flex justify-center'>
              {
                ssj_approve_cat3 === 45
                  ?
                  <SquareCheckBig className='text-green-500' size={16} />
                  :
                  <SquareX className='text-red-500' size={16} />
              }
            </div>
        },
        {
          title: <p className='text-center' style={{ fontSize: '12px' }}>เขตฯ</p>,
          dataIndex: 'zone_approve_cat3',
          align: 'center',
          render: (zone_approve_cat3) =>
            <div className='flex justify-center'>
              {
                zone_approve_cat3 === 45
                  ?
                  <SquareCheckBig className='text-green-500' size={16} />
                  :
                  <SquareX className='text-red-500' size={16} />
              }
            </div>
        }
      ]
    },
    {
      title: <p className='text-center' style={{ fontSize: '12px' }}>ด้านบุคลากร</p>,
      children: [
        {
          title: <p className='text-center' style={{ fontSize: '12px' }}>สสจ.</p>,
          dataIndex: 'ssj_approve_cat4',
          align: 'center',
          render: (ssj_approve_cat4) =>
            <div className='flex justify-center'>
              {
                ssj_approve_cat4 === 14
                  ?
                  <SquareCheckBig className='text-green-500' size={16} />
                  :
                  <SquareX className='text-red-500' size={16} />
              }
            </div>
        },
        {
          title: <p className='text-center' style={{ fontSize: '12px' }}>เขตฯ</p>,
          dataIndex: 'zone_approve_cat4',
          align: 'center',
          render: (zone_approve_cat4) =>
            <div className='flex justify-center'>
              {
                zone_approve_cat4 === 14
                  ?
                  <SquareCheckBig className='text-green-500' size={16} />
                  :
                  <SquareX className='text-red-500' size={16} />
              }
            </div>
        }
      ]
    },
    {
      title: <p className='text-center' style={{ fontSize: '12px' }}>สถานะการประเมิน</p>,
      align: 'center',
      render: (_, record) => {
        const {
          ssj_approve_cat1,
          ssj_approve_cat2,
          ssj_approve_cat3,
          ssj_approve_cat4,
          zone_approve_cat1,
          zone_approve_cat2,
          zone_approve_cat3,
          zone_approve_cat4,
          hcode
        } = record;

        const isDisabled = ssj_approve_cat1 !== 67 || ssj_approve_cat2 !== 42 || ssj_approve_cat3 !== 45 || ssj_approve_cat4 !== 14
        const isChecked = zone_approve_cat1 === 67 && zone_approve_cat2 === 42 && zone_approve_cat3 === 45 && zone_approve_cat4 === 14

        return (
          <div className="flex justify-center">
            <Switch
              size="small"
              checked={isChecked}
              disabled={isDisabled}
              onChange={(e) => handleZoneApprove(e, hcode)}
            />
          </div>
        );
      }
    },
  ]

  const handleZoneApprove = (e, hcode) => {
    console.log('Hcode:', e, hcode)
    const values = {
      hcode: hcode,
      zone_approve: e
    }
    changeStatusZoneApprove(token, values)
      .then(res => {
        toast.success(res.data.message)
        loadCheckApproveAll()
      })
      .catch(err => {
        console.log(err)
      })
  }


  return (
    <div>
      <div className='flex justify-center items-center text-2xl font-bold mb-2 text-green-600'>
        <p className='ml-2'>คณะกรรมการระดับเขตสุขภาพ อนุมัติผลการประเมินโรงพยาบาลของเขตสุขภาพที่ {Number(zone)} </p>
      </div>
      {/* SearchQuery */}

      <div className='bg-white rounded-md shadow-md p-3'>
        {visible && (
          <Alert
          message="การอนุมัติประเมินของ คกก.เขตฯ เงื่อนไข คือ"
          description={
            <div>
              <p style={{fontSize: '14px'}}>-หาก คกก.จังหวัด อนุมัติแต่ละด้านครบ สัญลักษณ์ checkbox สีเขียว</p>
              <p style={{fontSize: '14px'}}>-หาก คกก.จังหวัด อนุมัติแต่ละด้านไม่ครบ สัญลักษณ์ x สีแดง</p>
              <p style={{fontSize: '14px'}}>-หาก คกก.จังหวัด อนุมัติไม่ครบ ในด้านใดด้านหนึง ปุ่มอนุมัติจะไม่สามารถใช้งานได้</p>
              <p style={{fontSize: '14px'}}>-หาก คกก.จังหวัด อนุมัติครบทุกด้านแล้ว ปุ่มอนุมัติจะทำงาน สามารถอนุมัติและยกเลิกได้</p>
            </div>
          }
          type="success"
          showIcon
          closable 
          afterClose={handleClose}
        />
        )}
        <div className='flex justify-between items-center py-2 px-3'>
          <div className='flex items-center gap-2'>
            <p style={{ fontSize: '14px' }} className='text-blue-500'>
              จำนวนหน่วยบริการทีประเมินทั้งหมด {dataSource.length} รายการ
            </p>
          </div>
          <div>
            <Input
              placeholder='จังหวัด, รหัส 5 หลัก, ชื่อหน่วยบริการ...'
              className='rounded-full'
              style={{ width: 270 }}
              prefix={<SearchOutlined />}
              onChange={handleFilter}
            />
          </div>
        </div>

        <Table
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
          pagination={{ pageSize: 12 }}
        />

      </div>


    </div>
  )
}

export default ApproveAll
