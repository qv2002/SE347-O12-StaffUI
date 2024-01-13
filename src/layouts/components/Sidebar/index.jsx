import GroupMenu from "./GroupMenu";
import { useDispatch, useSelector } from "react-redux";
import { accountActions } from "../../../redux/slices/accountSlide";
import { accountSelector } from "../../../redux/selectors";
import { toast } from "react-toastify";

const groupMenus = [
  {
    main: {
      iconClassname: "fa-solid fa-house",
      text: "Trang chủ",
      link: "/",
    },
  },
  {
    main: {
      iconClassname: "fa-solid fa-clipboard",
      text: "Hoá đơn",
      link: "/order",
    },
    children: [
      {
        iconClassname: "fa-solid fa-list",
        text: "Danh sách",
        link: "/",
        functionName: "order/read",
      },
      {
        iconClassname: "fa-solid fa-circle-plus",
        text: "Thêm",
        link: "/add",
        functionName: "order/create",
      },
      {
        iconClassname: "fa-solid fa-table",
        text: "Thống kê",
        link: "/statistic",
        functionName: "order/statistc",
      },
    ],
  },
  {
    main: {
      iconClassname: "fa-solid fa-box-open",
      text: "Sản phẩm",
      link: "/product",
    },
    children: [
      {
        iconClassname: "fa-solid fa-list",
        text: "Danh sách",
        link: "/",
        functionName: "product/read",
      },
      {
        iconClassname: "fa-solid fa-circle-plus",
        text: "Thêm",
        link: "/add",
        functionName: "product/create",
      },
    ],
  },

  {
    main: {
      iconClassname: "fa-solid fa-boxes-stacked",
      text: "Loại sản phẩm",
      link: "/product-type",
    },
    children: [
      {
        iconClassname: "fa-solid fa-list",
        text: "Danh sách",
        link: "/",
        functionName: "product-type/read",
      },
      {
        iconClassname: "fa-solid fa-circle-plus",
        text: "Thêm",
        link: "/add",
        functionName: "product-type/create",
      },
    ],
  },
  {
    main: {
      iconClassname: "fa-solid fa-users",
      text: "Khách hàng",
      link: "/customer",
    },
    children: [
      {
        iconClassname: "fa-solid fa-list",
        text: "Danh sách",
        link: "/",
        functionName: "customer/read",
      },
      {
        iconClassname: "fa-solid fa-circle-plus",
        text: "Thêm",
        link: "/add",
        functionName: "customer/create",
      },
    ],
  },

  {
    main: {
      iconClassname: " fa-solid fa-user",
      text: "Tài khoản",
      link: "/account",
    },
    children: [
      {
        iconClassname: "fa-solid fa-list",
        text: "Danh sách",
        link: "/",
        functionName: "account/read",
      },
      {
        iconClassname: "fa-solid fa-circle-plus",
        text: "Thêm",
        link: "/add",
        functionName: "account/create",
      },
    ],
  },

  {
    main: {
      iconClassname: "fa-solid fa-clipboard",
      text: "Chức vụ",
      link: "/role",
    },
    children: [
      {
        iconClassname: "fa-solid fa-list",
        text: "Danh sách",
        link: "/",
        functionName: "role/read",
      },
      {
        iconClassname: "fa-solid fa-circle-plus",
        text: "Thêm",
        link: "/add",
        functionName: "role/create",
      },
    ],
  },
];

function Sidebar() {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const showLogoutNoti = () => toast.info("Đã đăng xuất!");

  return (
    <div className="flex h-full min-w-[280px] flex-col bg-blue-500">
      <header className="mt-2 grid h-32 w-full select-none grid-cols-10 items-center justify-center gap-0 text-white">
        <div className="col-span-3 flex items-center justify-end">
          <div className="rounded-full  bg-slate-50 p-3">
            <img className="h-auto w-12  object-cover" src="/thegreen.png" alt="Logo" />
          </div>
        </div>
        <div className="col-span-7 flex flex-col items-center justify-start">
          <div className="text-lg font-extrabold">QUẢN LÝ</div>
          <div className="font-bold">CỬA HÀNG CÂY XANH</div>
        </div>
      </header>

      <ul className="flex flex-1 select-none flex-col space-y-0.5 px-2 " style={{ overflowY: "overlay" }}>
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
