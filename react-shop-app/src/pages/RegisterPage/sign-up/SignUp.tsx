import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '../../../components/form/Form'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from '../../../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/user/user.slice';
import { setUserId } from '../../../store/cart/cart.slice';

const SignUp = () => {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");

  const dispatch = useDispatch();

  const handleSignupAndLogin = (email: string, password: string) => {
   
  }

  return (
    <Form
      title={"가입하기"}
      getDataForm={handleSignupAndLogin}
      firebaseError={firebaseError}
    />
  )
}

export default SignUp