import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import useLogout from '../Hooks/Uselogout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4444","#FF442"];

const Overview = () => {
    let navigate = useNavigate();   
    let logout = useLogout();
     const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
    
        const [selectedMonth, setSelectedMonth] = useState("January");
        const [selectedYear, setSelectedYear] = useState("2025");
        const [expenses, setExpenses] = useState([]);
        const [expenses1, setExpenses1] = useState([]);

        const name = sessionStorage.getItem('name');


        const get3 = async () => {
            try {
                let params = { name: name, year: selectedYear, month: selectedMonth };
                let res = await axios.get('https://expense-management-15ro.onrender.com/exp/get3', { params });
        
                if (res.status === 200) {
                    const formattedExpenses = res.data.data.map(exp => ({
                        ...exp,
                        amount: Number(exp.amount) 
                    }));
                    setExpenses(formattedExpenses); 
                }
            } catch (err) {
                toast.error("Error occurring");
            }
        };
        const get4 = async (type) => {
            try {
                let params = { name: type };
                console.log(type);
                let res = await axios.get('https://expense-management-15ro.onrender.com/exp/get4', { params });
        
                if (res.status === 200) {
                    setExpenses1(res.data.data);
                  
                }
            } catch (err) {
                toast.error("Error occurring");
            }
        };
        const generatePDF = () => {
            if (expenses1.length === 0) {
                return;
            }
        
            const doc = new jsPDF();
        
            doc.setFillColor(41, 128, 185);
            doc.rect(0, 0, 210, 30, "F");
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(16);
            doc.text("Safrah Expenses Private Limited", 15, 15);
        
            const headers = [["Expense Name", "Amount (₹)"]];
            const data = expenses1.map(exp => [exp.expenseName, exp.amount]);
        
            const totalAmount = expenses1.reduce((sum, exp) => sum + Number(exp.amount), 0);
            data.push(["Total", totalAmount]);
        
            // ✅ Make sure to call autoTable like this
            autoTable(doc, {
                head: headers,
                body: data,
                startY: 40,
                theme: "grid",
                styles: { halign: "center", cellPadding: 3 },
                headStyles: { fillColor: [41, 128, 185], textColor: 255 },
                footStyles: { fillColor: [200, 200, 200] }
            });
        
            doc.save("Expenses_Report.pdf");
        };
        
        
        useEffect(()=>{
            get3();
        },[])
        useEffect(() => {
            if (expenses1.length > 0) {
                generatePDF();
            }
        }, [expenses1]);
        

    return (
        <div>
              <nav className="navbar">
                <div className="logo">SAFRAH EXPENSE</div>
                <ul className="nav-links">
                    <li><button className="newbut" onClick={() => { navigate('/Dashboard') }}>Home</button></li>
                    <li><button className="newbut" onClick={() => { logout() }}>Logout</button></li>
                </ul>
            </nav>
            <div className="filter-container12">
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
            
            <div className="charts">
            <div style={{ width: "45%", height: "250px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={expenses} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <XAxis dataKey="expenseType" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#8884d8" barSize={50} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div style={{ width: "30%", height: "400px", display: "flex", justifyContent: "center" }}>
                <ResponsiveContainer width={400} height={400}>
                    <PieChart>

                        <Pie
                            data={expenses}
                            dataKey="amount"
                            nameKey="expenseType"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            fill="#8884d8"
                            label
                        >
                            {expenses.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            </div>
            <div className="expense-cards">
                    <div className="expense-card1 household" onClick={() => { get4("Household") }}>
                        <p className="expense-title">🏠 Household Expense </p>
                    </div>
                    <div className="expense-card1 medical" onClick={() => { get4("Medical") }}>
                        <p className="expense-title">🏥 Medical Expense</p>
                    </div>
                    <div className="expense-card1 transport" onClick={() => { get4("Transport") }}>
                        <p className="expense-title">🚗 Transport</p>
                    </div>
                    <div className="expense-card1 education" onClick={() => {get4("Education") }}>
                        <p className="expense-title">📚 Education</p>
                    </div>
                    <div className="expense-card1 food" onClick={() => { get4("Food") }}>
                        <p className="expense-title">🍔 Food</p>
                    </div>
                    <div className="expense-card1 others" onClick={() => { get4("Others") }}>
                        <p className="expense-title">🎭 Others</p>
                    </div>
                </div>
                <footer className="footer">
                    <p>© 2025 SAFRAH EXPENSE. All rights reserved.</p>
                </footer>
        </div>
    );
};

export default Overview;
