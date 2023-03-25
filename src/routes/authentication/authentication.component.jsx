// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth' 
import './authentication.styles.scss';
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

const Authentication = () => {

    // useEffect(() => {
    //     async function logGoogleRedirectUser(){
    //         const response = await getRedirectResult(auth);
    //         if(response){
    //             const userDocRef = await createUserDocumentFromAuth(response.user)
    //         }
    //     }
    //     logGoogleRedirectUser();
    // }, [])


    return (
        <div className="authentication-container">
            <SignInForm />
            {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
            <SignUpForm />
        </div>
    );  
}

export default Authentication;