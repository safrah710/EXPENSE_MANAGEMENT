import React, { useEffect, useState } from 'react';
import useLogout from '../Hooks/Uselogout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Transport() {
    let navigate = useNavigate();
    let logout = useLogout();
    const name = sessionStorage.getItem('name');

    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

    const [selectedMonth, setSelectedMonth] = useState("January");
    const [selectedYear, setSelectedYear] = useState("2025");
    const [expenses, setExpenses] = useState([]);

    const get = async () => {
        try {
            const params = {
                name: name,
                year: selectedYear,
                month: selectedMonth,
                expenseType: "Transport"
            };
            let res = await axios.get('https://dashboard.render.com/exp/get', { params });
            if (res.status === 200) {
                setExpenses(res.data.data);
            }
        } catch (err) {
            toast.error("Error occurring");
        }
    };

    const handleDelete = async (name1) => {
        const params1 = { expenseName: name1 };
        try {
            let res = await axios.delete('https://dashboard.render.com/exp/delete', { params: params1 });
            if (res.status === 200) {
                toast.success("Deleted successfully");
                setExpenses(expenses.filter(expense => expense.expenseName !== name1));
            }
        } catch (err) {
            toast.error("Try again");
        }
    };

    useEffect(() => {
        get();
    }, [selectedMonth, selectedYear, name]);

    return (
        <div>
            <nav className="navbar">
                <div className="logo">SAFRAH EXPENSE</div>
                <ul className="nav-links">
                    <li><button className="newbut" onClick={() => { navigate('/Dashboard') }}>Home</button></li>
                    <li><button className="newbut" onClick={() => { logout() }}>Logout</button></li>
                </ul>
            </nav>

            <div className="expense-container">
                <div className="filter-container">
                    <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} required>
                        {years.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                    <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} required>
                        {months.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                {expenses.length === 0 ? (
                    <p className="no-expenses">No expenses found</p>
                ) : (
                    expenses.map(expense => (
                        <div key={expense.expenseName} className="expense-card">
                            <div className="expense-details">
                                <h3>NAME: {expense.expenseName}</h3>
                                <p>TYPE: {expense.expenseType}</p>
                                <p>AMOUNT: {expense.amount}</p>
                                <p>MONTH: {expense.month}</p>
                                <p>YEAR: {expense.year}</p>
                            </div>
                            <button className="delete-btn" onClick={() => handleDelete(expense.expenseName)}>Delete</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Transport;
