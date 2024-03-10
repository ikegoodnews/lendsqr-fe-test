import Link from 'next/link';
import {useRouter} from 'next/router';
import Layout from '@/_components/Layout';
import React, {useCallback, useState} from 'react';
import {TextInput} from '@/_components/CustomInput';
import Formsy, {addValidationRule} from 'formsy-react';

import LendSqrLogo from '../../../public/_assets/icons/lendsqr-logo.svg';
import LendSqrLoginArtwork from '../../../public/_assets/icons/lendsqr-login-artwork.svg';

const errors = {
   isAlpha: 'You can only type letters',
   equalsField: 'Passwords do not match',
   isEmail: 'You have to type a valid email',
   minLength: 'You must type more than 8 characters',
   maxLength: 'You cannot type more than 35 characters',
   isStrong: 'Your password is not strong, at least one uppercase letter, one number and one special character',
};

const Login = () => {
   const router = useRouter();
   const [password, setPassword] = useState(true);
   const [canSubmit, setCanSubmit] = useState(false);

   addValidationRule('isStrong', function (values, value) {
      const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
      return regex.test(value as any);
   });

   const disableButton = useCallback(() => setCanSubmit(false), []);
   const enableButton = useCallback(() => setCanSubmit(true), []);
   const toggleSecure = useCallback(() => setPassword((prev) => !prev), []);

   const handleSubmit = () => {
      router.push('/dashboard');
   };

   return (
      <Layout className="login__page h-100 w-100">
         <div className="row h-100">
            <div className="col-md-6">
               <div className="left">
                  <div className="lendsqr__logo">
                     <LendSqrLogo className="w-100 h-100" />
                  </div>
                  <div className="lendsqr_login_artwork">
                     <LendSqrLoginArtwork className="w-100 h-100" />
                  </div>
               </div>
            </div>
            <div className="col-md-6 welcome">
               <div className="right">
                  <Formsy onValidSubmit={handleSubmit} className="login__form w-100 pe-5" onValid={enableButton} onInvalid={disableButton}>
                     <h3 className="text-capitalize mb-2 pb-1">welcome!</h3>
                     <p className="mb-5">Enter details to login.</p>
                     {/* <p style={{color: 'red'}}>{errorMessage?.error}</p> */}
                     <TextInput
                        className="my-4"
                        name="email"
                        type="text"
                        label="Email"
                        autoComplete="email"
                        autoFocus
                        // valError={emailError}
                        validations="maxLength:35,isEmail"
                        validationErrors={errors}
                        required
                     />
                     <TextInput
                        className="mb-4 pass"
                        name="password"
                        type={password ? 'password' : 'text'}
                        label="Password"
                        autoComplete="current-password"
                        // valError={passwordError}
                        // validationError="Required!"
                        validations="minLength:8,isStrong"
                        validationErrors={errors}
                        // clearError={clearPasswordError}
                        required
                        rightIcon={
                           <div
                              onClick={toggleSecure}
                              className="pass_toggle text-uppercase position-absolute d-flex align-items-center justify-content-center">
                              {password ? 'show' : 'hide'}
                           </div>
                        }
                     />
                     <Link href="/forgot-password" className="forgot-pass my-3 text-uppercase">
                        forgot password?
                     </Link>
                     <button type="submit" disabled={!canSubmit} className="submit w-100 mt-4 text-uppercase">
                        log in
                     </button>
                  </Formsy>
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default Login;
