import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSideBar from '../../components/layout/AdminSideBar';

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

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get<Payment[]>('https://localhost:7014/api/AdminPayment/AllPayments');
        setState(prevState => ({ ...prevState, payments: response.data }));
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setState(prevState => ({ ...prevState, isLoading: false }));
      }
    };
    const fetchPaymentsbyMonth = async () => {
        try {
          const response = await axios.get<Payment[]>('/api/AdminPayment/AllPayments/ByMonth');
          setState(prevState => ({ ...prevState, payments: response.data }));
        } catch (error) {
          console.error("Error fetching payments:", error);
        } finally {
          setState(prevState => ({ ...prevState, isLoading: false }));
        }
      };

    fetchPayments();
  }, []);

  return (
    <div className="admin-flex">
      <AdminSideBar />
        <div className='payments-table-section'>

        <h2>All Payments</h2>
        {state.isLoading ? (
            <p>Loading...</p>
        ) : (
            <table className="payments-table">
            <thead>
                <tr>
                <th>User ID</th>
                <th>Payment Type</th>
                <th>Payment Time</th>
                <th>Paid Until</th>
                <th>Payment Amount</th>
                </tr>
            </thead>
            <tbody>
                {state.payments.map(payment => (
                <tr key={payment.userId}>
                    <td>{payment.userId}</td>
                    <td>{payment.paymentType}</td>
                    <td>{new Date(payment.paymentTime).toLocaleString()}</td>
                    <td>{new Date(payment.paidUntil).toLocaleString()}</td>
                    <td>${payment.paymentAmount.toFixed(2)}</td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    </div>
  );
  
};
export default AllPayments;