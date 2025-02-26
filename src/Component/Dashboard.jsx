import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useLogout from '../Hooks/Uselogout';
import toast from 'react-hot-toast';

function Dashboard() {
    let navigate = useNavigate();
    let logout = useLogout();
    const name = sessionStorage.getItem('name');

    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

    let [sum, setSum] = useState(0);
    let [subsum, setSubsum] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState("January");
    const [selectedYear, setSelectedYear] = useState("2025");
    const [showModal, setShowModal] = useState(false); 

    const get = async () => {
        try {
            let res = await axios.get('https://dashboard.render.com/exp/get1', { params: { name } });
            if (res.status === 200) {
                let total = res.data.data.reduce((acc, item) => acc + parseInt(item.amount), 0);
                setSum(total);
            }
        } catch (err) {
            toast.error("Error occurring");
        }
    };

    const get1 = async () => {
        try {
            let params = { name: name, year: selectedYear, month: selectedMonth };
            let res = await axios.get('https://dashboard.render.com/exp/get2', { params });
            if (res.status === 200) {
                let total = res.data.data.reduce((acc, item) => acc + parseInt(item.amount), 0);
                setSubsum(total);
            }
        } catch (err) {
            toast.error("Error occurring");
        }
    };

    const deleteExpenses = async () => {
        try {
            let res = await axios.delete('https://dashboard.render.com/exp/delete2', { params: { name } });
            if (res.status === 200) {
                toast.success("Expenses deleted successfully");
                get();
                setShowModal(false); 
            }
        } catch (err) {
            toast.error("Error occurring");
        }
    };

    useEffect(() => {
        get();
    }, []);

    useEffect(() => {
        get1();
    }, [selectedMonth, selectedYear]);

    return (
        <>
            <div className="main">
                <nav className="navbar">
                    <div className="logo">SAFRAH EXPENSE</div>
                    <ul className="nav-links">
                        <li><button className='newbut' onClick={()=>{navigate('/over')}}>Overview</button></li>
                        <li><button className='newbut' onClick={() => { logout() }}>Logout</button></li>
                    </ul>
                </nav>
                <div className="filter-container1">
                    <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} required>
                        {years.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                    <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} required>
                        {months.map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                        ))}
                    </select>
                </div>

                <div className="middle">
                    <div className="balance-card">
                        <p className="balance-title">Total Expense</p>
                        <h1>RS:{sum}</h1>
                        <div className="income-expense">
                            <p className='new'> FILTERED EXPENSE: {subsum}</p>
                            <button className="addbut" onClick={() => { navigate('/add') }}>Add Expense</button>
                        </div>
                        <div className="income-expense">
                            <button className="addbut1" onClick={() => setShowModal(true)}>Delete Expenses</button>
                        </div>
                    </div>
                </div>

                <div className="expense-cards">
                    <div className="expense-card1 household" onClick={() => { navigate('/Household') }}>
                        <p className="expense-title">🏠 Household Expense</p>
                    </div>
                    <div className="expense-card1 medical" onClick={() => { navigate('/Medical') }}>
                        <p className="expense-title">🏥 Medical Expense</p>
                    </div>
                    <div className="expense-card1 transport" onClick={() => { navigate('/Transport') }}>
                        <p className="expense-title">🚗 Transport</p>
                    </div>
                    <div className="expense-card1 education" onClick={() => { navigate('/Education') }}>
                        <p className="expense-title">📚 Education</p>
                    </div>
                    <div className="expense-card1 food" onClick={() => { navigate('/food') }}>
                        <p className="expense-title">🍔 Food</p>
                    </div>
                    <div className="expense-card1 others" onClick={() => { navigate('/Others') }}>
                        <p className="expense-title">🎭 Others</p>
                    </div>
                </div>

                <footer className="footer">
                    <p>© 2025 SAFRAH EXPENSE. All rights reserved.</p>
                </footer>
                {showModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <span className="modal-close" onClick={() => setShowModal(false)}>×</span>    
              <div className="modal-header">⚠️ Confirm Deletion</div>
              <p>Are you sure you want to delete all expenses? This action cannot be undone.</p>
              <div className="modal-buttons">
                <button className="delete-btn" onClick={deleteExpenses}>Delete</button>
                <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
            </div>
        </>
    );
}

export default Dashboard;
