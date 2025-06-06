import React, { useState } from 'react'
import LogoMOPH from '../../../../assets/Logo_MOPH.png'
import LogoSmartHosp from '../../../../assets/SmartHospital-Logo2.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button, Modal } from 'antd'
import {
    LayoutDashboard,
    ListChecks,
    Send,
    LogOut,
    MonitorCheck,
    UserCog,
    ListTodo
} from 'lucide-react'
import useGlobalStore from '../../../../store/global-store'
import { ExclamationCircleFilled } from '@ant-design/icons'

const { confirm } = Modal


const SidebarProvApprover = () => {

    const logout = useGlobalStore((state) => state.logout)
    const navigate = useNavigate()
    const [isOpenModalNotify, setIsOpenModalNotify] = useState(false)

    const isDisabled = false;

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
        <div className='bg-green-800 w-64 text-gray-100 flex flex-col h-screen'>
            <div className='h-24 bg-green-900 flex items-center justify-center gap-1'>
                <div>
                    <img src={LogoSmartHosp} />
                </div>
            </div>

            <nav className='flex-1 px-4 py-4 space-y-2'>
                <NavLink
                    to={'/smarthosp-quest/user/prov-approve'}
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
                            to={'/smarthosp-quest/user/prov-approve'}
                            className=' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            onClick={handleClick}
                        >
                            <UserCog className='mr-2' />
                            จัดการ user รพ.ในจังหวัด
                        </NavLink>
                        <NavLink
                            to={'/smarthosp-quest/user/prov-approve'}
                            className=' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            onClick={handleClick}
                        >
                            <UserCog className='mr-2' />
                            Approve ด้านโครงสร้าง
                        </NavLink>
                        <NavLink
                            to={'/smarthosp-quest/user/prov-approve'}
                            className=' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            onClick={handleClick}
                        >
                            <UserCog className='mr-2' />
                            Approve ด้านบริหารจัดการ
                        </NavLink>
                        <NavLink
                            to={'/smarthosp-quest/user/prov-approve'}
                            className=' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            onClick={handleClick}
                        >
                            <UserCog className='mr-2' />
                            Approve ด้านการบริการ
                        </NavLink>
                        <NavLink
                            to={'/smarthosp-quest/user/prov-approve'}
                            className=' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            onClick={handleClick}
                        >
                            <UserCog className='mr-2' />
                            Approve ด้านบุคลากร
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink
                            to={'ssj-usermanagement'}
                            className={({ isActive }) =>
                                isActive
                                    ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                                    : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            }
                        >
                            <UserCog className='mr-2' />
                            จัดการ user รพ.ในจังหวัด
                        </NavLink>
                        <NavLink
                            to={'ssj-approve-infrastructure'}
                            className={({ isActive }) =>
                                isActive
                                    ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                                    : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            }
                        >
                            <ListTodo className='mr-2' />
                            Approve ด้านโครงสร้าง
                        </NavLink>
                        <NavLink
                            to={'ssj-approve-management'}
                            className={({ isActive }) =>
                                isActive
                                    ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                                    : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            }
                        >
                            <ListTodo className='mr-2' />
                            Approve ด้านบริหารจัดการ
                        </NavLink>
                        <NavLink
                            to={'ssj-approve-service'}
                            className={({ isActive }) =>
                                isActive
                                    ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                                    : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            }
                        >
                            <ListTodo className='mr-2' />
                            Approve ด้านการบริการ
                        </NavLink>
                        <NavLink
                            to={'ssj-approve-people'}
                            className={({ isActive }) =>
                                isActive
                                    ? ' text-sm bg-green-900 rounded-md text-white px-4 py-2 flex items-center'
                                    : ' text-sm text-gray-300 px-4 py-2 hover:bg-green-700 hover:text-white rounded flex items-center'
                            }
                        >
                            <ListTodo className='mr-2' />
                            Approve ด้านบุคลากร
                        </NavLink>

                    </>
                )}



                <NavLink
                    to={'report-prov'}
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
                        <ExclamationCircleFilled style={{ color: 'orange' }} /> &nbsp;
                        <span>แจ้งปิดปรับปรุงระบบ</span>
                    </div>
                }
                open={isOpenModalNotify}
                onCancel={cancelModal}
                footer={null}
                width={700}
                style={{ top: 20 }}
            >
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เรียนหน่วยบริการผู้ประเมินโรงพยาบาลอ้จฉริยะ คณะกรรมการระดับจังหวัด คณะกรรมการระดับเขตสุขภาพ ทุกท่าน
                    สำนักสุขภาพดิจิทัล <span className='text-red-600 font-bold'>ขอแจ้งปิดปรับปรุงระบบตั้งแต่วันที่ 1 พ.ค.68 ถึง 18 พ.ค.68</span> เพื่อให้สอดคล้องกับการเกณฑ์การประเมิน
                    <span className='text-green-600 font-bold'> และจะเปิดระบบอีกครั้งในวันที่ 19 พ.ค.68</span> จึงขออภัยในความไม่สะดวกมา ณ ที่นี้ครับผม </p>
                <div className="flex justify-end mt-4">
                    <Button color='danger' onClick={() => setIsOpenModalNotify(false)}>ปิด</Button>
                </div>
            </Modal>
        </div>


    )
}

export default SidebarProvApprover