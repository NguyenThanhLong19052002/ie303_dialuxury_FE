import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";

import Cart from "../Pages/Cart";
import PaymentInfo from "../Pages/Payment/PaymentInfo";
import PaymentFinish from "../Pages/Payment/PaymentFinish";
import Blog from "../Pages/Blog/Blog";
import ProductsPage from "../Pages/Products/Screens/ProductsPage";
import ProductsPage1 from "../Pages/Products/Screens/ProductsPage1";
import ProductsPage2 from "../Pages/Products/Screens/ProductsPage2";
import ProductsDetail from "../Pages/Products/Components/ProductDetail";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Book from "../Pages/Book/Book";
import HomeAdmin from "../admin/pages/home/home_admin";

import Login from "../Pages/Login1/components/login.js";
import Account from "../Pages/Login1/components/profile.js";
import Register from "../Pages/Login1/components/register.js";
import Forgot from "../Pages/Login1/components/forgot";
import Reset from "../Pages/Login1/components/otpForgot";
import Orders from "../Pages/Orders/Orders.js";
import Recovery from "../Pages/Login1/components/recovery";
import { AuthorizedUser, LoggedUser } from "../Pages/Login1/authenticate";
import OrderDetailProducts from "../Pages/Orders/OrderDetailProduct";

import Service from "../admin/pages/service/service_admin";

import ViewService from "../admin/pages/service/viewService/viewService";
import AdjustService from "../admin/pages/service/adjustService/adjustService";
import AddTypeInService from "../admin/pages/service/viewService/add/add";
import WareHouse from "../admin/pages/Warehouse/warehouse_admin";

import ViewPayment from "../admin/pages/paymentVerification/viewPayment/viewPayment";
import VerifyOrder from "../admin/pages/orderVerification/orderVerification";
import ViewOrderVerification from "../admin/pages/orderVerification/viewOrderVerification/viewOrderVerification";
import ConfirmationNotification from "../admin/pages/verfiedPage";
import Hoadon from "../admin/pages/Hoadon";
import ChitietHoadon from "../admin/Components/ChitietHoadon";
import AdjustServiceType from "../admin/pages/service/adjustServiceType/adjustServiceType";
import VouchersPageAdmin from "../admin/pages/VouchersPage/Screens/vouchersPage";
import VouchersDetailsAdmin from "../admin/pages/VouchersDetails/Screens/vouchersDetails";
import ProductsPageAdmin from "../admin/pages/ProductsPage/Screens/productsPage";
import AddProduct from "../admin/pages/ProductsPage/Screens/addProduct";
import EditProduct from "../admin/pages/ProductsPage/Screens/editProduct";
import AddVoucher from "../admin/pages/VouchersPage/Screens/addVoucher";
import EditVoucher from "../admin/pages/VouchersPage/Screens/editVoucher";
import AddServiceType from "../admin/pages/service/addServiceType/addServiceType";
import ChangePassword from "../Pages/Login1/components/changePassword";
import Users from "../admin/pages/users/user";
import ViewUser from "../admin/pages/users/viewUser";
import OrderView from "../admin/pages/users/OderView";
import ViewOrder from "../admin/pages/orderVerification/ViewOrder";
import ConfirmationServiceNotification from "../admin/pages/service/viewService/verifiedService";
import PaymentAdmin from "../admin/pages/Payment/Screens/paymentPage";
const publicRoutes = [
  { path: "/", component: <Home /> },
  { path: "*", component: <NotFound />, layout: null },
  { path: "/cart", component: <Cart /> },
  { path: "/paymentinfo", component: <PaymentInfo /> },
  { path: "/paymentfinish", component: <PaymentFinish /> },

  {
    path: "/blog",
    component: <Blog />,
  },
  { path: "/products/nhan", component: <ProductsPage /> },
  {
    path: "/products/bong-tai",
    component: <ProductsPage1 />,
  },
  {
    path: "/products/day-chuyen",
    component: <ProductsPage2 />,
  },
  {
    path: "/productsdetail/:id",
    component: <ProductsDetail />,
  },
  {
    path: "/aboutus",
    component: <AboutUs />,
  },
  {
    path: "/book/:_id",
    component: (
      <AuthorizedUser>
        <Book></Book>
      </AuthorizedUser>
    ),
  },
  {
    path: "/login",
    component: (
      <LoggedUser>
        <Login></Login>
      </LoggedUser>
    ),
  },
  {
    path: "/register",
    component: <Register></Register>,
  },
  {
    path: "/account/:_id",
    component: (
      <AuthorizedUser>
        <Account></Account>
      </AuthorizedUser>
    ),
  },
  {
    path: "/forgot",
    component: <Forgot></Forgot>,
  },
  {
    path: "/recovery/:_id",
    component: <Recovery></Recovery>,
  },
  {
    path: "/reset/:_id",
    component: <Reset></Reset>,
  },

  {
    path: "/orders/:_id",
    component: (
      <AuthorizedUser>
        <Orders></Orders>
      </AuthorizedUser>
    ),
  },
  {
    path: "/orders/detail/:_orderid",
    component: <OrderDetailProducts></OrderDetailProducts>,
  },
  {
    path: "/account/changePassword/:_id",
    component: (
      <AuthorizedUser>
        <ChangePassword></ChangePassword>
      </AuthorizedUser>
    ),
  },
];
export { publicRoutes };
// component: (
//   <AuthorizedUser>
//     <Account></Account>
//   </AuthorizedUser>
// ),
const adminRoutes = [
  {
    path: "*",
    component: (
      <AuthorizedUser>
        <NotFound />
      </AuthorizedUser>
    ),
    layout: null,
  },
  {
    path: "/users",
    component: (
      <AuthorizedUser>
        <Users />
      </AuthorizedUser>
    ),
  },
  {
    path: "/users/:_id",
    component: (
      <AuthorizedUser>
        <ViewUser />
      </AuthorizedUser>
    ),
  },
  {
    path: "/user/order/detail/:_orderid",
    component: (
      <AuthorizedUser>
        <OrderView />
      </AuthorizedUser>
    ),
  },
  {
    path: "/order/detail/:_orderid",
    component: (
      <AuthorizedUser>
        <ViewOrder />
      </AuthorizedUser>
    ),
  },
  {
    path: "/service",
    component: (
      <AuthorizedUser>
        <Service />
      </AuthorizedUser>
    ),
  },
  {
    path: "/service/addTypeInService",
    component: (
      <AuthorizedUser>
        <AddTypeInService />
      </AuthorizedUser>
    ),
  },

  {
    path: "/service/view/:_id",
    component: (
      <AuthorizedUser>
        <ViewService />
      </AuthorizedUser>
    ),
  },
  // {
  //   path: "/serviceType/view/:svt_id",
  //   component: <ViewService />,
  // },
  {
    path: "/service/adjustService",
    component: (
      <AuthorizedUser>
        <AdjustService />
      </AuthorizedUser>
    ),
  },

  {
    path: "/serviceType/addServiceType",
    component: (
      <AuthorizedUser>
        <AddServiceType />
      </AuthorizedUser>
    ),
  },
  {
    path: "/serviceType/adjustServiceType/:svt_id",
    component: (
      <AuthorizedUser>
        <AdjustServiceType />
      </AuthorizedUser>
    ),
  },
  {
    path: "/homeAdmin",
    component: (
      <AuthorizedUser>
        <HomeAdmin />{" "}
      </AuthorizedUser>
    ),
  },

  {
    path: "/warehouse",
    component: <WareHouse />,
  },

  {
    path: "/paymentVerfication",
    component: <PaymentAdmin />,
  },
  {
    path: "/paymentView",
    component: <ViewPayment />,
  },
  {
    path: "/orderVerification",
    component: <VerifyOrder />,
  },
  {
    path: "/viewOrderVerification",
    component: <ViewOrderVerification />,
  },

  {
    path: "/HoadonAdmin",
    component: <Hoadon />,
  },
  {
    path: "/admin/vouchersPage",
    component: <VouchersPageAdmin />,
  },
  {
    path: "/admin/vouchersPage/:id",
    component: <VouchersDetailsAdmin />,
  },
  {
    path: "/admin/productsPage",
    component: <ProductsPageAdmin />,
  },
  {
    path: "/admin/productsPage/add",
    component: <AddProduct />,
  },
  {
    path: "/admin/productsPage/edit/:id",
    component: <EditProduct />,
  },
  {
    path: "/admin/vouchersPage/add",
    component: <AddVoucher />,
  },
  {
    path: "/admin/vouchersPage/edit/:id",
    component: <EditVoucher />,
  },

  {
    path: "/ConfirmationNotification",
    component: <ConfirmationNotification />,
  },
  {
    path: "/veriedService",
    component: <ConfirmationServiceNotification />,
  },

  {
    path: "/ChitietHoadonAdmin/:mahd",
    component: <ChitietHoadon />,
  },
];
export { adminRoutes };
