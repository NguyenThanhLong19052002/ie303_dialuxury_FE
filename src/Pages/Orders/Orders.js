import React from 'react';
import { toast } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './style.css';
import 'bootstrap';
import { useNavigate  } from 'react-router-dom';
import {
  cancelOrderbyId,
  deliveredOrderbyId,
  getAllOrders,
  getUserbyId,
  getAllOrdersByUserId
} from '../Login1/helpers/helper';
import {
  CancelModal,
  CancelSuccessModal,
  DeliveredModal,
} from './Modals/OrderModal';
import moment from 'moment';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'green',
};

const Orders = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState();
  const [ordersClone, setOrdersClone] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [showCancel, setShowCancel] = useState(false);
  const [showCancelSuccess, setShowCancelSuccess] = useState(false);
  const [showDelivered, setShowDelivered] = useState(false);
  const [currentOrder, setCurrentOrder] = useState('');

  const handleCancelClose = () => setShowCancel(false);

  const handleCancelSuccessClose = () => {
    setShowCancelSuccess(false);
    window.location.reload();
  };

  const handleDeliveredClose = () => setShowDelivered(false);

  const handleCancelShow = (_orderid) => {
    setShowCancel(true);
    setCurrentOrder(_orderid);
  };

  const handleCancelSuccessShow = () => {
    setShowCancelSuccess(true);
  };

  const handleDeliveredShow = (_orderid) => {
    setShowDelivered(true);
    setCurrentOrder(_orderid);
  };

  const handleCancelOrder = async () => {
    let cancelPromise = cancelOrderbyId(currentOrder);
    cancelPromise
      .then(function (res) {
        console.log(res.data);
        setShowCancel(false);
        handleCancelSuccessShow();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDelivered = async () => {
    let deliveredPromise = deliveredOrderbyId(currentOrder);
    deliveredPromise
      .then(function (res) {
        console.log(res.data)
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  useEffect(() => {
    // This function will run once when the component mounts.
    let forgotPromise = getAllOrdersByUserId(_id);
    forgotPromise.then(function (res) {
      const uniqueOrderIds = [];
      const uniqueData = [];
      res.forEach(item => {
        if (!uniqueOrderIds.includes(item._id)) {
          uniqueOrderIds.push(item._id);
          uniqueData.push(item);
        }
      });
      setOrders(uniqueData);
      setIsLoading(false);
    });
  }, []); // The empty array as the second argument means this effect will only run once.

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  }

  return (
    <main>
      <ClipLoader
        color="#36d7b7"
        loading={isLoading}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <CancelModal
        showCancel={showCancel}
        handleCancelClose={handleCancelClose}
        handleCancelOrder={handleCancelOrder}
      />
      <CancelSuccessModal
        showCancelSuccess={showCancelSuccess}
        handleCancelSuccessClose={handleCancelSuccessClose}
      />
      <DeliveredModal
        showDelivered={showDelivered}
        handleDeliveredClose={handleDeliveredClose}
        handleDelivered={handleDelivered}
      />
      {isLoading ? (
        <div className="w-40 h-40"></div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col"> Đơn hàng </th>
              <th scope="col"> Ngày đặt hàng </th>{' '}
              <th scope="col"> Tổng tiền </th>{' '}
              <th scope="col"> Tình trạng đơn hàng </th>
              <th scope="col" className="text-end">
                Thao tác{' '}
              </th>{' '}
            </tr>{' '}
          </thead>{' '}
          <tbody>
            {orders?.map((order, index) => (
              <tr key={order._id}>
                <td style={{ paddingLeft: '2rem' }}>
                  <b>{(index + 1) < 10 ? '0' + (index + 1) : (index + 1)}</b>{' '}
                </td>{' '}
                <td>{formatDate(order.createdAt)}</td>{' '}
                <td>{order.totalPriceOrder.toLocaleString()} VND </td>{' '}
                <td>
                  {' '}
                  <span
                    className={
                      order.status === 'Đã giao hàng'
                        ? 'text-success'
                        : order.status === 'Đang xử lý'
                        ? 'text-info'
                        : order.status === 'Đang giao hàng'
                        ? 'text-warning'
                        : 'text-danger'
                    }
                  >
                    {order.status}{' '}
                  </span>{' '}
                </td>{' '}
                <td className="d-flex justify-content-end align-item-center">
                  <div>
                    {order.status === 'Đang giao hàng' ? (
                      <i
                        className=" fa fa-check-square"
                        style={{
                          marginRight: '20px',
                          cursor: 'pointer',
                          color: 'blue',
                          fontSize: '20px',
                        }}
                        onClick={() => handleDeliveredShow(order._id)}
                      >
                        {' '}
                      </i>
                    ) : (
                      <i
                        className=" fa fa-check-square"
                        style={{
                          marginRight: '20px',
                          color: '#6c757d',
                          fontSize: '20px',
                        }}
                      >
                        {' '}
                      </i>
                    )}
                  </div>{' '}
                  <Link
                    to={`/orders/detail/${order._id}`}
                    className="text-success"
                  >
                    <i className="fas fa-eye" style={{ fontSize: '20px' }}>
                      {' '}
                    </i>{' '}
                  </Link>{' '}
                  <div>
                    {order.status === 'Đang giao hàng' ||
                    order.status === 'Đã hủy' ||
                    order.status === 'Đã giao hàng' ? (
                      <i
                        className=" fa fa-cart-arrow-down"
                        style={{
                          marginLeft: '20px',
                          color: '#6c757d',
                          fontSize: '20px',
                        }}
                      >
                        {' '}
                      </i>
                    ) : (
                      <i
                        className=" fa fa-cart-arrow-down"
                        style={{
                          marginLeft: '20px',
                          color: 'red',
                          fontSize: '20px',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleCancelShow(order._id)}
                      >
                        {' '}
                      </i>
                    )}
                  </div>{' '}
                </td>{' '}
              </tr>
            ))}
          </tbody>{' '}
        </table>
      )}
    </main>
  );
};

export default Orders;
