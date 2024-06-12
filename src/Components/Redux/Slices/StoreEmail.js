import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../../Firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";


export const SetEmail = createAsyncThunk(
    "emailSlice/setEmail",
    async (emailObj, { rejectWithValue, getState }) => {
      try {
        const state = getState();
        const user = auth.currentUser;
        const { to } = emailObj;
  
        if (user) {
          const docSendRef = doc(db, 'sendEmail', user.uid);
          const docReceivedRef = doc(db, 'receivedEmail', to);
          const SendDocSnap = await getDoc(docSendRef);
          const ReceivedDocSnap = await getDoc(docReceivedRef);
  
          let ReceivedEmails = [];
          let SendMails = [];
  
          if (SendDocSnap.exists()) {
            SendMails = SendDocSnap.data()?.emails || [];
           
          }
  
          if (ReceivedDocSnap.exists()) {
            ReceivedEmails = ReceivedDocSnap.data()?.emails || [];
           
          }
  
          const userReceivedEmails = [...ReceivedEmails, emailObj];
          const userSendEmails = [...SendMails, emailObj];
  
          await setDoc(docSendRef, { emails: userSendEmails });
          await setDoc(docReceivedRef, { emails: userReceivedEmails });
  
          alert("Email sent successfully!");
  
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  
  export const SetReadMail = createAsyncThunk(
    "ReadMailSlice/SetReadMail",
    async (emailObj, { rejectWithValue, getState }) => {
      try {
        const { to } = emailObj;
        const state = getState();
        const user = auth.currentUser;

  
        if (user) {
          const docRef = doc(db, 'receivedEmail', to);
          const docSnap = await getDoc(docRef);
  
          let existingEmails = [];
  
          if (docSnap.exists()) {
            existingEmails = docSnap.data()?.emails || [];
          }
  
          // Find the index of the email to update in the existingEmails array
          const indexToUpdate = existingEmails.findIndex((email) => email.id === emailObj.id);
  
          if (indexToUpdate !== -1) {
            // Update the isRead property of the email object
            existingEmails[indexToUpdate] = { ...emailObj };
          }
  
          await setDoc(docRef, { emails: existingEmails });
  
          alert("Email marked as read!");
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const deleteMail = createAsyncThunk(
    "deleteMailSlices/deleteMail",
    async (emailObj, { rejectWithValue, getState }) => {
      try {
        const state = getState();
        const user = auth.currentUser;
        const { to } = emailObj;
  
        if (user) {
          const docRef = doc(db, 'receivedEmail', to);
          const docSnap = await getDoc(docRef);
  
          let existingEmails = [];
  
          if (docSnap.exists()) {
            existingEmails = docSnap.data()?.emails || [];
          }
  
          // Find the  email to delete in the existingEmails array
          const filterToDelete = existingEmails.filter((email) => email.id != emailObj.id);
          console.log(filterToDelete);
  
        
          await setDoc(docRef, { emails: filterToDelete });
  
          alert("email delete successfully");
        } else {
          throw new Error("Something went wrong");
         }
       } catch (error) {
        return rejectWithValue(error.message);
       }
     }
  );


  export const deleteSendMail = createAsyncThunk(
    "deleteMailSlices/deleteMail",
    async (emailObj, { rejectWithValue, getState }) => {
      try {
        const state = getState();
        const user = auth.currentUser;
      
  
        if (user) {
          const docRef = doc(db, 'sendEmail', user.uid);
          const docSnap = await getDoc(docRef);
  
          let existingEmails = [];
  
          if (docSnap.exists()) {
            existingEmails = docSnap.data()?.emails || [];
          }
  
          // Find the  email to delete in the existingEmails array
          const filterToDelete = existingEmails.filter((email) => email.id != emailObj.id);
          console.log(filterToDelete);
  
        
          await setDoc(docRef, { emails: filterToDelete });
  
          alert("email delete successfully");
        } else {
          throw new Error("Something went wrong");
         }
       } catch (error) {
        return rejectWithValue(error.message);
       }
     }
  );
  

const StoreEmail = createSlice({
    name: "storeEmailSlices",
    initialState: {
        user:null,
        sendEmail :[],
        recievedEmail : [],
        portal : false,
        readMail : false,
        userClickMail :[]
    },
    reducers: {
        setUser: (state, action) => {
            const currUser = action.payload;
            state.user = currUser
          },
          SetEmailData: (state, action) => {
            state.sendEmail = action.payload;
            console.log(state.sendEmail);
          },
          SetReceivedEmailData: (state, action) => {
            state.recievedEmail = action.payload;
            //console.log(state.recievedEmail);
          },
          setPortal: (state, action)=> {
            state.portal = !state.portal;
          },
          setReadMail: (state, action)=> {
            const id = action.payload;
           const Obj =  state.recievedEmail.map((mailObj)=>{
              if(mailObj.id === id ){
                return mailObj
              }
          })
          console.log(Obj)
          },
          setUserClickMail: (state, action)=> {
            state.userClickMail = action.payload;
          },
          setEmptyArr:(state, action) =>{
              state.recievedEmail = []
              state.sendEmail =[]
          }
        
    },

    extraReducers: (builder) => {
        builder
            .addCase(SetEmail.pending, (state) => {
                state.error = null;
            })
            .addCase(SetEmail.fulfilled, (state, action) => {
                console.log("Successfully added expense");
            })
            .addCase(SetEmail.rejected, (state, action) => {
                console.log("Failed to add expense", action.payload);
            });
    },
});

export const { setEmptyArr,setUser,SetEmailData,setUserClickMail, setPortal, SetReceivedEmailData,setReadMail } = StoreEmail.actions;
export default StoreEmail.reducer;