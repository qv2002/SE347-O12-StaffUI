import GroupMenu from './GroupMenu';
import { useDispatch, useSelector } from 'react-redux';
import { accountActions } from '../../../redux/slices/accountSlide';
import { accountSelector } from '../../../redux/selectors';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';

const groupMenus = [
    {
        main: {
            iconClassname: 'fa-solid fa-house',
            text: 'Trang chủ',
            link: '/',
        },
    },
    {
        main: {
            iconClassname: 'fa-solid fa-clipboard',
            text: 'Hoá đơn',
            link: '/order',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'order/read',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'order/create',
            },
            {
                iconClassname: 'fa-solid fa-table',
                text: 'Thống kê',
                link: '/statistic',
                functionName: 'order/statistc',
            },
        ],
    },
    {
        main: {
            iconClassname: 'fa-solid fa-box-open',
            text: 'Sản phẩm',
            link: '/product',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'product/read',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'product/create',
            },
        ],
    },

    {
        main: {
            iconClassname: 'fa-solid fa-boxes-stacked',
            text: 'Loại sản phẩm',
            link: '/product-type',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'product-type/read',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'product-type/create',
            },
        ],
    },
    {
        main: {
            iconClassname: 'fa-solid fa-users',
            text: 'Khách hàng',
            link: '/customer',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'customer/read',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'customer/create',
            },
        ],
    },

    {
        main: {
            iconClassname: ' fa-solid fa-user',
            text: 'Tài khoản',
            link: '/account',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'account/read',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'account/create',
            },
        ],
    },

    {
        main: {
            iconClassname: 'fa-solid fa-clipboard',
            text: 'Chức vụ',
            link: '/role',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'role/read',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'role/create',
            },
        ],
    },
];

function Sidebar() {
    const dispatch = useDispatch();
    const account = useSelector(accountSelector);
    const showLogoutNoti = () => toast.info('Đã đăng xuất!');
    const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return isSmallScreen ? (
        <>
        <header className="flex h-16 items-center justify-between bg-blue-500 px-2">
            <div className="text-lg font-extrabold text-white">QUẢN LÝ</div>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className="h-6 w-6 text-white cursor-pointer" 
                onClick={() => setIsSidebarOpen(true)}
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                />
            </svg>
        </header>
        {isSidebarOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-blue-500">
                <div className="sm:w-16 md:w-64 flex flex-col bg-blue-500">
                    <header className="mb-8 flex h-16 w-full select-none flex-col items-center justify-center text-white">
                        <div className="text-lg font-extrabold">QUẢN LÝ</div>
                        <div className="font-bold">CỬA HÀNG CÂY XANH</div>
                    </header>

                    <ul className="flex flex-1 select-none flex-col space-y-0.5 p-2 " style={{ overflowY: 'overlay' }}>
                    {groupMenus.map((groupMenu, index) => (
                        <GroupMenu key={index} groupMenu={groupMenu} setIsSidebarOpen={setIsSidebarOpen} />
                    ))}
                    </ul>

                    <div className="w-full border-t border-white p-3 text-white">
                        <div className="mb-2">
                            <p className="font-bold">{account?.name}</p>
                            <p className="text-sm">{account?.role?.name}</p>
                        </div>
                        <button
                            className="btn btn-md w-full border border-white hover:bg-blue-400"
                            onClick={() => {
                                dispatch(accountActions.logout());
                                showLogoutNoti();
                            }}
                        >
                            Đăng xuất
                        </button>
                    </div>
                    <button
                        className="absolute top-0 right-0 m-2 btn btn-md hover:bg-blue-400"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        )}
        
        </>
    ) : (
        <div className="md:min-w-16 lg:min-w-[240px] flex flex-col bg-blue-500">
            <header className="mb-8 flex h-16 w-full select-none flex-col items-center justify-center text-white">
                <div className="text-lg font-extrabold">QUẢN LÝ</div>
                <div className="font-bold">CỬA HÀNG CÂY XANH</div>
            </header>

            <ul className="flex flex-1 select-none flex-col space-y-0.5 p-2 " style={{ overflowY: 'overlay' }}>
                {groupMenus.map((groupMenu, index) => (
                    <GroupMenu key={index} groupMenu={groupMenu} />
                ))}
            </ul>

            <div className="w-full border-t border-white p-3 text-white">
                <div className="mb-2">
                    <p className="font-bold">{account?.name}</p>
                    <p className="text-sm">{account?.role?.name}</p>
                </div>
                <button
                    className="btn btn-md w-full border border-white hover:bg-blue-400"
                    onClick={() => {
                        dispatch(accountActions.logout());
                        showLogoutNoti();
                    }}
                >
                    Đăng xuất
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
