import React, { useState } from 'react';
import useLogout from '../Hooks/Uselogout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function AddExpense() {
  let navigate=useNavigate()
  let logout = useLogout();
  const name=sessionStorage.getItem('name');
  const months = ["January",
   "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years=[2020, 2021, 2022, 2023, 2024,2025, 2026, 2027, 2028, 2029, 2030];
  const [expenseName, setExpenseName] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [amount, setAmount] = useState('');
  const [month,setmonth]=useState("January");
  const [year,setyear]=useState("2025");


  const expenseCategories = ["Household", "Medical", "Transport", "Education", "Food", "Others"];

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!expenseName || !expenseType || !amount || !month || !year) {
      toast.error("All fields are required");
      return;
    }
    try{
      let res=await axios.post('https://expense-management-15ro.onrender.com/exp/add',{
        name,expenseName,expenseType,amount,month,year
      })
      if(res.status===200){
        toast.success("Expense added");
        setExpenseName('');
        setExpenseType('');
        setAmount('');
        navigate('/Dashboard');
      }
      else if(res.status===400){
        toast.error("Check with your connection");
      }
    }
    catch(err){
            toast.error("Tryagain later");
    } 
  };

  return (
    <div className="main">
      <nav className="navbar">
        <div className="logo">SAFRAH EXPENSE</div>
        <ul className="nav-links">
          <li><button className="newbut" onClick={()=>{navigate('/Dashboard')}}>Home</button></li>
          <li><button className="newbut" onClick={() => { logout() }}>Logout</button></li>
        </ul>
      </nav>

      <div className="expense-form-container">
        <h2>Add Expense</h2>
        <form className="expense-form" >
          <label>Expense Name:</label>
          <input type="text" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} required />

          <label>Expense Type:</label>
          <select value={expenseType} onChange={(e) => setExpenseType(e.target.value)} required>
            <option value="">Select Expense Type</option>
            {expenseCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <label>Month</label>
          <select value={month} onChange={(e) => setmonth(e.target.value)} required>
            <option value={month}>{month}</option>
            {months.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <label>Year</label>
          <select value={year} onChange={(e) => setyear(e.target.value)} required>
            <option value={year}>{year}</option>
            {years.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>

          <label>Amount:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />

          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddExpense;
