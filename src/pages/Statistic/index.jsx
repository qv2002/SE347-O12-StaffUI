import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Listbox, Popover } from '@headlessui/react';
import clsx from 'clsx';
import { useEffect } from 'react';
import moment from 'moment';
import PriceFormat from '../../components/PriceFormat';
import { toast, ToastContainer } from 'react-toastify';
import Datepicker from 'react-tailwindcss-datepicker';
import { useSelector } from 'react-redux';
import { accountSelector } from '../../redux/selectors';
function Statistic() {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deletingOrderId, setDeletingOrderId] = useState(null);
    const [money, setMoney] = useState(0);
    const [number, setNumber] = useState(0);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const showDeleteNoti = () => toast.success('Xóa hoá đơn thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');
    const [value, setValue] = useState({
        startDate: moment(new Date()).format('YYYY-MM-DD'),
        endDate: moment(new Date()).format('YYYY-MM-DD'),
    });

    useEffect(() => {
        const newMoney = orders?.reduce((prevMoney, currOrder) => {
            if (isDateBetween(currOrder.createdAt, value.startDate, value.endDate)) {
                return prevMoney + currOrder.totalPrice;
            }
            return prevMoney;
        }, 0);
        const newNumber = orders?.filter((order) => {
            if (isDateBetween(order.createdAt, value.startDate, value.endDate)) {
                return true;
            }
            return false;
        })?.length;

        setMoney(newMoney);
        setNumber(newNumber);
    }, [value, orders]);

    function isDateBetween(createdAt, startDate, endDate) {
        const createdAtFormated = moment(createdAt).format('YYYY-MM-DD');
        if (moment(startDate) <= moment(createdAtFormated) && moment(endDate) >= moment(createdAtFormated)) {
            return true;
        }
        return false;
    }

    const account = useSelector(accountSelector);
    function isHiddenItem(functionName) {
        if (!account) {
            return true;
        }
        if (!functionName) {
            return false;
        }
        const findResult = account?.functions?.find((_func) => _func?.name === functionName);
        if (findResult) {
            return false;
        }
        return true;
    }
    useEffect(() => {
        getOrders();
    }, []);

    function getOrders() {
        fetch('http://localhost:5000/api/order')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setOrders(resJson.orders);
                } else {
                    setOrders([]);
                }
            })
            .catch((error) => {
                console.log(error);
                setOrders([]);
            });
    }

    function deleteOrder(id) {
        fetch('http://localhost:5000/api/order/' + id, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((resJson) => {
                setShowDeleteDialog(false);
                if (resJson) {
                    showDeleteNoti();
                    console.log('xóa');
                    getOrders();
                } else {
                    showErorrNoti();
                }
            })
            .catch(() => {
                showErorrNoti();
                setShowDeleteDialog(false);
            });
    }

    function linkToDetail(id) {
        navigate('/order/detail/' + id);
    }

    return (
        <>
            <div className="container">
                <div className="flex space-x-4">
                    {/* tite + reload btn */}
                    <div className="flex items-center">
                        <label className="text-2xl font-bold text-slate-800">Thống kê hóa đơn</label>
                        <button
                            type="button"
                            className="ml-3 text-gray-800 hover:underline"
                            onClick={() => getOrders()}
                        >
                            <span className="font-sm pr-1">
                                <i className="fa fa-refresh" aria-hidden="true"></i>
                            </span>
                            <span className="">Tải lại</span>
                        </button>
                    </div>

                    {/* Action group */}
                    <div className="flex grow items-center">
                        <div className="mr-2 flex grow">
                            <Datepicker
                                value={value}
                                i18n={'en'}
                                configs={{
                                    shortcuts: {
                                        today: 'Hôm nay',
                                        yesterday: 'Hôm qua',
                                        past: (period) => `${period} ngày trước`,
                                        currentMonth: 'Tháng này',
                                        pastMonth: 'Tháng trước',
                                    },
                                }}
                                inputClassName="border-2 border-gray-500 outline-none w-full text-base !py-1.5 hover:border-blue-500"
                                displayFormat={'DD/MM/YYYY'}
                                separator={'đến'}
                                onChange={(newValue) => setValue(newValue)}
                                showShortcuts={true}
                            />
                        </div>

                        <Link
                            to="/order/add"
                            className={clsx('btn btn-md btn-green', {
                                hidden: isHiddenItem('order/create'),
                            })}
                        >
                            <span className="pr-1">
                                <i className="fa fa-share"></i>
                            </span>
                            <span>Tạo hoá đơn</span>
                        </Link>
                    </div>
                </div>

                <div className="mt-8 flex w-full justify-center space-x-8">
                    <div className="flex min-w-[200px] flex-col items-center">
                        <div className="">Số hoá đơn</div>
                        <div className="text-6xl font-semibold text-blue-500">{number || 0}</div>
                    </div>
                    <div className="flex min-w-[200px] flex-col items-center">
                        <div className="">Tổng doanh thu (VNĐ)</div>
                        <div className="text-6xl font-semibold text-blue-500">
                            <PriceFormat>{money || 0}</PriceFormat>
                        </div>
                    </div>
                </div>

                {/* LIST */}
                <div className="flex flex-col">
                    <table className="mt-8 w-full border-b">
                        <thead className="w-full rounded bg-blue-500 text-white">
                            <tr className="flex h-11 w-full">
                                <th className="flex w-16 items-center justify-end px-2">Mã</th>
                                <th className="flex flex-[2] items-center justify-start px-4">Tên khách hàng</th>
                                <th className="flex w-60 items-center justify-start px-2">Số điện thoại</th>
                                <th className="flex w-44 items-center justify-end px-2">Tổng tiền (VNĐ)</th>
                                <th className="flex w-56 items-center justify-end px-2">Ngày</th>
                                <th className="flex w-[140px] items-center justify-center px-2"></th>
                            </tr>
                        </thead>

                        <tbody className="flex h-[50vh] w-full flex-col" style={{ overflowY: 'overlay' }}>
                            {orders
                                ?.filter((order) => {
                                    if (isDateBetween(order.createdAt, value.startDate, value.endDate)) {
                                        return true;
                                    }
                                    return false;
                                })
                                .reverse()
                                .map((order) => (
                                    <tr
                                        key={order.id}
                                        className="flex min-h-[56px] cursor-pointer border-b border-slate-200 hover:bg-slate-100"
                                        onClick={() => linkToDetail(order.id)}
                                    >
                                        <td className="flex w-16 items-center justify-end px-2 py-2">{order.id}</td>
                                        <td className="flex flex-[2] items-center justify-start px-4 py-2">
                                            {order.customer?.name}
                                        </td>
                                        <td className="flex w-60 items-center justify-start px-2 py-2">
                                            {order.customer?.phone}
                                        </td>
                                        <td className="flex w-44 items-center justify-end px-2 py-2">
                                            <PriceFormat>{order.totalPrice}</PriceFormat>
                                        </td>
                                        <td className="flex w-56 items-center justify-end px-2 py-2">
                                            {moment(order.createdAt).format('HH:mm:ss DD/MM/YYYY ')}
                                        </td>
                                        <td className="flex w-[140px] items-center justify-center px-2 py-2">
                                            <div className="flex justify-end">
                                                <button
                                                    className={clsx('btn btn-sm btn-red', {
                                                        hidden: isHiddenItem('order/delete'),
                                                    })}
                                                    onClick={(e) => {
                                                        {
                                                            e.stopPropagation();
                                                            setShowDeleteDialog(true);
                                                            setDeletingOrderId(order.id);
                                                        }
                                                    }}
                                                >
                                                    <span className="pr-1">
                                                        <i className="fa-solid fa-circle-xmark"></i>
                                                    </span>
                                                    <span>Xoá</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* DELETE DIALOG */}
            <div
                className={clsx(
                    'fixed inset-0 z-[99999] hidden items-center justify-center bg-black/20 opacity-0 transition-opacity',
                    {
                        '!flex !opacity-100': showDeleteDialog,
                    }
                )}
            >
                <div className="">
                    <div className="min-w-[160px] max-w-[400px] rounded-lg bg-white p-6">
                        <div className="text-clr-text-dark font-bold">Bạn có chắc chắn muốn xoá không?</div>
                        <p className="mt-4">Lưu ý: Bạn không thể không phục lại sau khi xoá!</p>
                        <div className="mt-4 flex">
                            <button
                                className="btn btn-blue btn-md"
                                onClick={() => {
                                    setDeletingOrderId(null);
                                    setShowDeleteDialog(false);
                                }}
                            >
                                Quay lại
                            </button>
                            <button className="btn btn-md btn-red" onClick={() => deleteOrder(deletingOrderId)}>
                                Xoá
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Statistic;
