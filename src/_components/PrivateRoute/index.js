/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Router from 'next/router';
import {getObjectFromStorage, parseJwt} from '@/_helpers';
import {userConstants} from '@/_constants';
import {format} from 'date-fns';

const login = '/login'; // Define your login route address.

/**
 * Check user authentication and authorization
 * It depends on you and your auth service provider.
 * @returns {{auth: null}}
 */

const checkUserAuthentication = async () => {
   const user = typeof window !== 'undefined' && (await getObjectFromStorage(userConstants.USER_KEY));
   // console.log('file: index.js:17  user=====>', user?.user);

   if (user) {
      const decodedJwt = parseJwt(user?.user?.token);
      console.log('PrivateRoute: index.js:20 token_expires_in=====>', format(new Date(decodedJwt?.exp * 1000 - Date.now()), 'HH:mm:ss'));
      if (decodedJwt?.exp * 1000 < Date.now()) {
         return {auth: null};
      } else return {auth: true};
   }
};

export default (WrappedComponent) => {
   const hocComponent = ({...props}) => <WrappedComponent {...props} />;

   hocComponent.getInitialProps = async (context) => {
      const userAuth = await checkUserAuthentication();

      const loginPath = `/login?from=${encodeURIComponent(context.asPath)}`;
      // console.log('file: index.js:41  loginPath=====>', loginPath);

      // Are you an authorized user or not?
      if (!userAuth?.auth) {
         // console.log('file: index.js:44  userAuth?.auth=====>', userAuth?.auth);

         // Handle server-side and client-side rendering.
         if (context.res) {
            context.res?.writeHead(302, {
               Location: loginPath,
            });
            context.res?.end();
         } else {
            // Router.replace(loginPath);
            Router.replace({
               pathname: '/login',
               query: {from: Router.pathname},
            });
         }
      } else if (WrappedComponent.getInitialProps) {
         const wrappedProps = await WrappedComponent.getInitialProps({...context, auth: userAuth});
         return {...wrappedProps, userAuth};
      }

      // console.log('file: index.js:65  userAuth=====>', userAuth);

      return {userAuth};
   };

   return hocComponent;
};
