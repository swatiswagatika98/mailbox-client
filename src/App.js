import React, { useEffect, useState } from "react";
import JoditEditor from "jodit-react";
import EmailComposer from "./Components/EmailComposer/EmailComposer";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Signup/Signup";
import Login from "./Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Firebase";
import { useDispatch, useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import Modal from "./Components/Modal/Modal";
import { SetEmailData, SetReceivedEmailData } from "./Components/Redux/Slices/StoreEmail";
import Portal from "./Components/Modal/Portal";
import Sidebar from "./Components/Sidebar/Sidebar";
import PrivateRoutes from "./Components/PrivateRoutes";
import SendEmail from "./Components/SendEmail/SendEmail";
import EmailBody from "./Components/EmailBody/EmailBody";
import ReceivedEmail from "./Components/ReceivedEmail/ReceivedEmail";
import ReadEmail from "./Components/ReadEmail/ReadEmail";


function App() {
  const dispatch = useDispatch();
  const [user1, setUser1] = useState(null);


  const user = auth.currentUser
  const emails = useSelector(state => state.StoreEmail.SendEmail);
  const portal = useSelector(state => state.StoreEmail.portal);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser1(user);
        console.log(user1); 
        console.log(emails); 
      } else {
        setUser1(null)
      }
    });

    return () => unsubscribe();
  }, [user]);


  useEffect(() => {
    if (user1) {
      const docRef = doc(db, "sendEmail", user.uid);
      const ReceivedDocRef = doc(db, "receivedEmail", user.email);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          dispatch(SetEmailData(docSnap.data().emails));
          console.log(user)
        } else {
          console.log("no doc");
        }
      });
      return () => unsubscribe();
    } else {
      console.log("not user");
    }
  }, [dispatch, user])

  useEffect(() => {
    if (user1) {
      const ReceivedDocRef = doc(db, "receivedEmail", user.email);
      const unsubscribe = onSnapshot(ReceivedDocRef, (docSnap) => {
        if (docSnap.exists()) {
          dispatch(SetReceivedEmailData(docSnap.data().emails));
          console.log(docSnap.data().emails)
        } else {
          console.log("no doc");
        }
      });
      return () => unsubscribe();
    } else {
      console.log("not user");
    }
  }, [dispatch, user])



  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/emailcompose" element={portal ? <PrivateRoutes component={Portal} alt={Login} /> : null} />
          <Route path="/email" element={portal ? <PrivateRoutes component={EmailComposer} alt={Login} /> : null} />
          <Route path="/sendemail" element={<PrivateRoutes component={SendEmail} alt={Login} />} />
          <Route path="/reademail" element={<PrivateRoutes component={ReadEmail} alt={Login} />} />
          <Route path="/receivedemails" element={<PrivateRoutes component={ReceivedEmail} alt={Login} />} />
          <Route path="/emailbody" element={<PrivateRoutes component={EmailBody} alt={Login} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
