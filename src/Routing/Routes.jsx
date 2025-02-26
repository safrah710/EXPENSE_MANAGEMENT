import Login from "../Component/Login"
import Signup from "../Component/Signup"
import Dashboard from "../Component/Dashboard"
import Addexpense from "../Component/Addexpense"
import Food from "../Component/Food"
import Household from "../Component/Household"
import Medical from "../Component/Medical"
import Transport from "../Component/Transport"
import Education from "../Component/Education"
import Others from "../Component/Others"
import Overview from "../Component/Overview"
const route=[
    {
        path:'/',
        element:<><Login/></>
    },
    {
        path:'/signup',
        element:<><Signup/></>
    },
    {
        path:'/Dashboard',
        element:<><Dashboard/></>
    },
    {
        path:'/food',
        element:<><Food/></>
    },
    {
        path:'/Household',
        element:<><Household/></>
    },
    {
        path:'/Medical',
        element:<><Medical/></>
    },
    {
        path:'/Transport',
        element:<><Transport/></>
    },
    {
        path:'/Education',
        element:<><Education/></>
    },
    {
        path:'/others',
        element:<><Others/></>
    },
    {
        path:'/add',
        element:<><Addexpense/></>
    },
    {
        path:'/over',
        element:<><Overview/></>
    }
]
export default route