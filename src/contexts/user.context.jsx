import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth} from "../utils/firebase/firebase.utils";

// as the actual value you want to access
export const UserContext = createContext({ 
    currentUser : null,
    setCurrentUser : () => null, 
 });
  

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser}

    useEffect(() => {
       const unSubscribe =  onAuthStateChangedListener((user) => {
        console.log(user, "user")
        if(user){
            createUserDocumentFromAuth(user)
        }else{
            setCurrentUser(user)
        }   
       }) 
       console.log(unSubscribe, "unSubscribe");
       return unSubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}