
import React from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../Firebase';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setEmptyArr, setPortal } from '../Redux/Slices/StoreEmail';


export default function Navbar({setSidebar,sidebar}) {
    const user = auth.currentUser;
    const portal = useSelector(state => state.StoreEmail.portal);
    const recievedEmail = useSelector(state => state.StoreEmail.recievedEmailrecievedEmail);
    const sendEmail = useSelector(state => state.StoreEmail.sendEmail);
    const dispatch = useDispatch();

 

    const navigate = useNavigate()
    const loginhandler = () => {
        navigate("/login")
    }
    const signuphandler = () => {
        navigate("/signup")
    }
    const logoutHandler = async () => {
        try {
            await signOut(auth)
             navigate("/login")
             dispatch(setEmptyArr())
             alert("signout")
        } catch (err) {
            alert(err)
        }

    }
    const modalHandler = () => {
        dispatch(setPortal())

    }
    
    return (
        <nav className='container_nav'>
            <div className='div_nav'>
                <h1 className='mailbox'>Mail Box</h1>
            </div>
            <ul className="cartBtn_main" >
                {
                   
                       user ? 
                    <>
                       <button onClick={logoutHandler} style={{ color: "white", background: "black", cursor: "pointer", marginRight:"0.5rem" }} className="cartBtn"  >logout</button>
                       <span>{user.email}</span>
                    </>
                        : <>
                            <button onClick={loginhandler} style={{ color: "white", background: "black", cursor: "pointer",marginRight:"0.5rem" }} className="cartBtn" >Login</button>
                            <button onClick={signuphandler} style={{ color: "white", background: "black", cursor: "pointer",marginRight:"0.5rem" }} className="cartBtn"  >Signup</button>
                          </>
                }


            </ul>

        </nav>
    )
}