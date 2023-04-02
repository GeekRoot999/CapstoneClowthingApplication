import { useState } from "react";
import { Form } from "react-router-dom";
import {
  signInWithGooglePopup  ,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';  
import Button from "../button/button.component";


const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;


  const SignInWithGoogle = async() => {
    const {user} = await signInWithGooglePopup();
    // console.log({user}, "user");
    await createUserDocumentFromAuth(user)
  };

  // console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);   
      console.log(response, "sign-in response");
      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case 'auth/wrong-password':
          alert('Incorrect Passwords or Email ID'); 
          break
        case 'auth/user-not-found': 
          alert('User not found');
          break;
        default:
          alert(err.message);
      }
    }
  };

  const handlechange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container ">
      <h2>Already  Have an account?</h2>
      <span>Sign in    with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handlechange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handlechange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" type="button" onClick={SignInWithGoogle }>Google Sign In</Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
