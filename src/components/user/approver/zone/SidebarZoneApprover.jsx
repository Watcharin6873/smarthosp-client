import React, { useState } from 'react'
import LogoMOPH from '../../../../assets/Logo_MOPH.png'
import LogoSmartHosp from '../../../../assets/SmartHospital-Logo2.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button, Modal } from 'antd'
import {
    LayoutDashboard,
    Send,
    LogOut,
    ListTodo,
    MonitorCheck,
    UserCog,
    BookCheck,
    MegaphoneIcon
} from 'lucide-react'
import useGlobalStore from '../../../../store/global-store'
import { ExclamationCircleFilled } from '@ant-design/icons'

const { confirm } = Modal


const SidebarZoneApprover = () => {

    const logout = useGlobalStore((state) => state.logout)
    const navigate = useNavigate()
    const [isOpenModalNotify, setIsOpenModalNotify] = useState(false)

    const isDisabled = true;

    const handleLogout = () => {
        //Code
        confirm({
            title: 'คุณต้องการออกจากระบบหรือไม่?',
            icon: <ExclamationCircleFilled />,
            content: '',
            onOk() {
                logout()
                navigate("/smarthosp-quest/")
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }

    const handleClick = (e) => {
        e.preventDefault()
        setIsOpenModalNotify(true)
    }

    const cancelModal = () => {
        setIsOpenModalNotify(false)
    }


    return (
        <div className='bg-green-800 w-72 text-gray-100 flex flex-col h-screen'>
            <div className='h-24 bg-green-900 flex items-center justify-center gap-1'>
                <div>
                    <img src={LogoSmartHosp} />
                </div>
            </div>

            <nav className='flex-1 px-4 py-4 space-y-2'>
                <NavLink
                    to={'/smarthosp-quest/user/zone-approve'}
                    end
                    className={({ isActive }) =>
                        isActive
                            ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                            : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                    }
                >
                    <LayoutDashboard className='mr-2' />
                    Dashboard
                </NavLink>
                {isDisabled ? (
                    <>
                        <NavLink
                            to={'zone-usermanagement'}
                            className={({ isActive }) =>
                                isActive
                                    ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                                    : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            }
                        >
                            <UserCog className='mr-2' />
                            จัดการผู้ใช้งาน (จังหวัด)
                        </NavLink>
                        <NavLink
                            to={'/smarthosp-quest/user/zone-approve'}
                            className=' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            onClick={handleClick}
                        >
                            <UserCog className='mr-2' />
                            ข้อมูลประเมินด้านโครงสร้าง
                        </NavLink>
                        <NavLink
                            to={'/smarthosp-quest/user/zone-approve'}
                            className=' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            onClick={handleClick}
                        >
                            <UserCog className='mr-2' />
                            ข้อมูลประเมินด้านบริหารจัดการ
                        </NavLink>
                        <NavLink
                            to={'/smarthosp-quest/user/zone-approve'}
                            className=' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            onClick={handleClick}
                        >
                            <UserCog className='mr-2' />
                            ข้อมูลประเมินด้านการบริการ
                        </NavLink>
                        <NavLink
                            to={'/smarthosp-quest/user/zone-approve'}
                            className=' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            onClick={handleClick}
                        >
                            <UserCog className='mr-2' />
                            ข้อมูลประเมินด้านบุคลากร
                        </NavLink>
                        <NavLink
                            to={'/smarthosp-quest/user/zone-approve'}
                            className=' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            onClick={handleClick}
                        >
                            <BookCheck className='mr-2' />
                            <span>คกก.เขตฯ อนุมัติการประเมิน</span> <span className='text-red-400'>*</span>
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink
                            to={'zone-usermanagement'}
                            className={({ isActive }) =>
                                isActive
                                    ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                                    : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            }
                        >
                            <UserCog className='mr-2' />
                            จัดการผู้ใช้งาน (จังหวัด)
                        </NavLink>
                        <NavLink
                            to={'zone-approve-infrastructure'}
                            className={({ isActive }) =>
                                isActive
                                    ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                                    : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            }
                        >
                            <ListTodo className='mr-2' />
                            ข้อมูลประเมินด้านโครงสร้าง
                        </NavLink>
                        <NavLink
                            to={'zone-approve-management'}
                            className={({ isActive }) =>
                                isActive
                                    ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                                    : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            }
                        >
                            <ListTodo className='mr-2' />
                            ข้อมูลประเมินด้านบริหารจัดการ
                        </NavLink>
                        <NavLink
                            to={'zone-approve-service'}
                            className={({ isActive }) =>
                                isActive
                                    ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                                    : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            }
                        >
                            <ListTodo className='mr-2' />
                            ข้อมูลประเมินด้านการบริการ
                        </NavLink>
                        <NavLink
                            to={'zone-approve-people'}
                            className={({ isActive }) =>
                                isActive
                                    ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                                    : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            }
                        >
                            <ListTodo className='mr-2' />
                            ข้อมูลประเมินด้านบุคลากร
                        </NavLink>
                        <NavLink
                            to={'approve-all'}
                            className={({ isActive }) =>
                                isActive
                                    ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                                    : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            }
                        >
                            <BookCheck className='mr-2' />
                            <span>คกก.เขตฯ อนุมัติการประเมิน</span> <span className='text-red-400'>*</span>
                        </NavLink>
                    </>
                )}
                <NavLink
                    to={'report-zone'}
                    className={({ isActive }) =>
                        isActive
                            ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                            : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                    }
                >
                    <MonitorCheck className='mr-2' />
                    รายงานผลการประเมิน
                </NavLink>
                <NavLink
                    to={'contact-us'}
                    className={({ isActive }) =>
                        isActive
                            ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                            : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                    }
                >
                    <Send className='mr-2' />
                    ติดต่อเรา
                </NavLink>

            </nav>

            <footer className='px-4 py-4 space-y-2'>
                <NavLink
                    onClick={handleLogout}
                    className='text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                >
                    <LogOut className='mr-2' />
                    Logout
                </NavLink>
            </footer>

            <Modal
                title={
                    <div
                        style={{
                            justifyContent: 'center',
                            display: 'flex',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                    >
                        <MegaphoneIcon style={{ color: 'orange' }} /> &nbsp;
                        <span>แจ้งเตือนประชาสัมพันธ์</span>
                    </div>
                }
                open={isOpenModalNotify}
                onCancel={cancelModal}
                footer={null}
                width={700}
                style={{ top: 20 }}
            >
                <p className='text-blue-700'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เรียนคณะกรรมการระดับเขตสุขภาพทุกท่าน สำนักสุขภาพดิจิทัลขอขอบคุณคณะกรรมการระดับเขตสุขภาพเป็นอย่างสูง
                    ที่ดำเนินการอนุมัติผลการประเมินตามเกณฑ์การประเมินโรงพยาบาลอัจฉริยะ ประจำปีงบประมาณ 2568 ให้สำเร็จลุล่วงไปด้วยดี จนได้ผลการประเมินและจัดงานมอบโล่รางวัลในแต่ละระดับ
                    เมื่อวันที่ 28 สิงหาคม 2568 ณ โรงแรมแกรนด์ ริชมอนด์ สไตลิช คอนเวนชั่น ขอบพระคุณครับ 🙏🙏🙏</p>
                <div className="flex justify-end mt-4">
                    <Button color='danger' onClick={() => setIsOpenModalNotify(false)}>ปิด</Button>
                </div>
            </Modal>


        </div>
    )
}

export default SidebarZoneApprover