import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Chart from 'chart.js/auto';
import '../../assets/css/adminStyle.css';
import AdminSideBar from '../../components/layout/AdminSideBar';
import axios from 'axios';
const Dashboard: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [blockedUserCount, setBlockedUserCount] = useState<number | null>(null);
  const [profitMonth, setProfitMonth] = useState<number | null>(null);
  const [profitAllTime, setProfitAllTime] = useState<number | null>(null);
  const [profitBanner, setProfitBanner] = useState<number | null>(null);
  const [profitPromotion, setProfitPromotion] = useState<number | null>(null);
  const [profitCountOfPurchases, setCountOfPurchases] = useState<number | null>(null);
  const [chart, setChart] = useState<Chart | null>(null);
  useEffect(() => {
    // Simulating the fetch of data
    // setUserCount(dummyData.userCount);
    // setBlockedUserCount(dummyData.blockedUserCount);

    // Commented axios calls
    
    axios.all([
      axios.get('https://localhost:7014/api/Admin/User/UserCount'),
      axios.get('https://localhost:7014/api/Admin/User/BlockedUserCount')
    ]).then(axios.spread((userResponse, blockedUserResponse) => {
      setUserCount(userResponse.data);
      setBlockedUserCount(blockedUserResponse.data);
    })).catch(error => {
      console.error('Error fetching data:', error);
    });
    
  }, []);
  useEffect(() => {
    axios.all([
      axios.get('https://localhost:7014/api/AdminPayment/Profit/Month'),
      axios.get('https://localhost:7014/api/AdminPayment/Profit/AllTime'),
      axios.get('https://localhost:7014/api/AdminPayment/Profit/Month/Banner'),
      axios.get('https://localhost:7014/api/AdminPayment/Profit/Month/Promotion'),
      axios.get('https://localhost:7014/api/AdminPurchase/CountOfPurchases')
    ]).then(axios.spread((
      profitMonthResponse,
      profitAllTimeResponse,
      profitBannerResponse,
      profitPromotionResponse,
      CountOfPurchasesResponse
    ) => {
      setProfitMonth(profitMonthResponse.data.profit);
      setProfitAllTime(profitAllTimeResponse.data.profit);
      setProfitBanner(profitBannerResponse.data.profit);
      setProfitPromotion(profitPromotionResponse.data.profit);
      setCountOfPurchases(CountOfPurchasesResponse.data)
    })).catch(error => {
      console.error('Error fetching data:', error);
    });
    
  }, []);

  useEffect(() => {
    if (userCount !== null && blockedUserCount !== null && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) { // Check if ctx is not null
        const data = {
          labels: ['Total Users', 'Blocked Users'],
          datasets: [{
            label: 'User Counts',
            data: [userCount, blockedUserCount],
            backgroundColor: ['blue', 'red'],
            borderColor: ['blue', 'red'],
            borderWidth: 1
          }]
        };

        const chartInstance = new Chart(ctx, {
          type: 'bar',
          data: data,
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

        setChart(chartInstance);
      }
    }
}, [userCount, blockedUserCount]);

 return (
    <div className='admin-flex'>
      <AdminSideBar />
      <div className='admin-content'>
        <h1>Website Information</h1>
        <canvas ref={chartRef} width="1200" height="400"></canvas>

        <div className="profit-sections">
          <div className="profit-card">
            <h3>Monthly Profit</h3>
            <p>{profitMonth}</p>
          </div>

          <div className="profit-card">
            <h3>All Time Profit</h3>
            <p>{profitAllTime}</p>
          </div>

          <div className="profit-card">
            <h3>Banner Monthly Profit</h3>
            <p>{profitBanner}</p>
          </div>

          <div className="profit-card">
            <h3>Promotion Monthly Profit</h3>
            <p>{profitPromotion}</p>
          </div>
          <div className="profit-card">
            <h3>Count Of Purchases</h3>
            <p>{profitCountOfPurchases}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
