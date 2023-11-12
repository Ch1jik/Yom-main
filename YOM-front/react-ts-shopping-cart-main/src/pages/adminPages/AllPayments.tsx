import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSideBar from '../../components/layout/AdminSideBar';
import '../../assets/css/AdminPages/adminPayments.css'

interface Payment {
  userId: string;
  paymentType: string;
  paymentTime: string;
  paidUntil: string;
  paymentAmount: number;
}

interface PaymentState {
  payments: Payment[];
  isLoading: boolean;
}

const AllPayments: React.FC = () => {
  const [state, setState] = useState<PaymentState>({
    payments: [],
    isLoading: true,
  });

  const [stateMonth, setStateMonth] = useState<PaymentState>({
    payments: [],
    isLoading: true,
  });

  const [allPaymentsPage, setAllPaymentsPage] = useState<number>();
  const [monthPaymentsPage, setMonthPaymentsPage] = useState<number>();
  const [totalAllPaymentPages, setTotalAllPaymentPages] = useState(1);
  const [totalMonthPaymentPages, setMonthAllPaymentPages] = useState(1);
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('https://localhost:7014/api/AdminPayment/AllPayments?pageNumber=1');
        setState(prevState => ({ ...prevState, payments: response.data.payments }));
        setAllPaymentsPage(1);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setState(prevState => ({ ...prevState, isLoading: false }));
      }
    };
    const fetchPaymentsbyMonth = async () => {
      try {
        console.log("Month fetching");

        const response = await axios.get('https://localhost:7014/api/AdminPayment/AllPayments/ByMonth?pageNumber=1');
        setStateMonth(prevState => ({ ...prevState, payments: response.data.payments }));
        setMonthPaymentsPage(1);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setStateMonth(prevState => ({ ...prevState, isLoading: false }));
      }
    };

    fetchPayments();
    fetchPaymentsbyMonth();
  }, []);

  const setAllPayments = async (page: number) => {
    try {
      const response = await axios.get(`https://localhost:7014/api/AdminPayment/AllPayments?pageNumber=${page}`);
      setState(prevState => ({ ...prevState, payments: response.data.payments }));
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setState(prevState => ({ ...prevState, isLoading: false }));
    }
  }

  const setMonthPayments = async (page: number) => {
    try {
      const response = await axios.get(`https://localhost:7014/api/AdminPayment/AllPayments?pageNumber=${page}`);
      setState(prevState => ({ ...prevState, payments: response.data.payments }));
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setState(prevState => ({ ...prevState, isLoading: false }));
    }
  }


  const handleAllPaymentsClickPage = async (pg: number) => {
    console.log(pg);
    if (allPaymentsPage) {
      setAllPaymentsPage(pg);
      setAllPayments(pg);
    }
  }

  const handleMonthPaymentsClickPage = async (pg: number) => {
    console.log(pg);
    if (monthPaymentsPage) {
      setMonthPaymentsPage(pg);
      setMonthPayments(pg);
    }
  }


  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
  };

  return (
    <div className="admin-flex">
      <AdminSideBar />
      <div className='admin-payments'>
        <div>
          <h2>Всі платежі</h2>
          {state.isLoading ? (
            <p>Загрузка...</p>
          ) : (
            <table className="admin-payments-table">
              <thead>
                <tr>
                  <th>ID користувача</th>
                  <th>Тип оплати</th>
                  <th>Час оплати</th>
                  <th>Сплачено до</th>
                  <th>Сума оплати</th>
                </tr>
              </thead>
              <tbody>
                {state.payments.map(payment => (
                  <tr key={payment.userId}>
                    <td>{payment.userId}</td>
                    <td>{payment.paymentType}</td>
                    <td>{formatDate(payment.paymentTime)}</td>
                    <td>{formatDate(payment.paidUntil)}</td>
                    <td>{payment.paymentAmount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
          }
          < div className='admin-pagination'>
            <button
              onClick={() => handleAllPaymentsClickPage(allPaymentsPage !== undefined ? allPaymentsPage - 1 : 1)}
              disabled={allPaymentsPage === 1}
            >
              Previous
            </button>
            <span>
              Сторінка {allPaymentsPage} of {totalAllPaymentPages}
            </span>
            <button
              onClick={() => handleAllPaymentsClickPage(allPaymentsPage !== undefined ? allPaymentsPage + 1 : 1)}
              disabled={allPaymentsPage === allPaymentsPage}
            >
              Next
            </button>
          </div>
        </div>

        <div>
          <h2>Платежі за місяць</h2>
          {stateMonth.isLoading ? (
            <p>Загрузка...</p>
          ) : (
            <table className="admin-payments-table">
              <thead>
                <tr>
                  <th>ID користувача</th>
                  <th>Тип оплати</th>
                  <th>Час оплати</th>
                  <th>Сплачено до</th>
                  <th>Сума оплати</th>
                </tr>
              </thead>
              <tbody>
                {stateMonth.payments.map(payment => (
                  <tr key={payment.userId}>
                    <td>{payment.userId}</td>
                    <td>{payment.paymentType}</td>
                    <td>{formatDate(payment.paymentTime)}</td>
                    <td>{formatDate(payment.paidUntil)}</td>
                    <td>{payment.paymentAmount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
          }
          <div className='admin-pagination'>
            <button
              onClick={() => handleMonthPaymentsClickPage(monthPaymentsPage !== undefined ? monthPaymentsPage - 1 : 1)}
              disabled={monthPaymentsPage === 1}
            >
              Previous
            </button>
            <span>
              Сторінка {monthPaymentsPage} of {totalMonthPaymentPages}
            </span>
            <button
              onClick={() => handleMonthPaymentsClickPage(monthPaymentsPage !== undefined ? monthPaymentsPage + 1 : 1)}
              disabled={monthPaymentsPage === monthPaymentsPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );

};
export default AllPayments;