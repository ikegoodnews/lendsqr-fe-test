import {useEffect, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '@/_actions';
import {useRouter} from 'next/router';
import {parseJwt} from '@/_helpers';
import {format} from 'date-fns';
import Lottie from 'react-lottie';

import screenLoader from '../../../public/_assets/animations/screen_loader.json';

const LoadingGif = {
   loop: true,
   autoplay: true,
   animationData: screenLoader,
   rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
   },
};

const HOME_ROUTE = '/dashboard';
const LOGIN_ROUTE = '/login';

const withAuth = (Component, routeRole) => {
   const ComponentWithAuth = (props) => {
      const router = useRouter();
      const dispatch = useDispatch();
      const {bio} = useSelector((s) => s.user);
      const [isLoading, setIsLoading] = useState(true);
      const [isAuthenticated, setIsAuthenticated] = useState(false);

      const logout = useCallback(() => {
         setIsAuthenticated(false);
         dispatch(authActions.logout());
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const getStatus = useCallback(async () => {
         const token = bio?.token;

         if (token === '' || token === null) {
            setIsLoading(false);
            isAuthenticated && logout();
            return;
         }

         if (token) {
            const decodedJwt = parseJwt(token);
            // console.log('file: Auth.js:37  decodedJwt=====>', decodedJwt);
            // console.log('file: Auth.js:38  decodedJwt?.nbf * 1000=====>', format(new Date(decodedJwt?.exp * 1000), 'HH:mm:ss'));
            // console.log('file: Auth.js:47  token_expires_in=====>', format(new Date(decodedJwt?.iat * 1000 - Date.now()), 'HH:mm:ss'));
            // console.log('file: Auth.js:47  token_expires_in=====>', format(new Date((decodedJwt?.iat < Date.now()) / 1000), 'HH:mm:ss'));

            // if (decodedJwt?.exp * 1000 > Date.now()) {
            // if (Date.now() >= decodedJwt?.exp * 1000 - 60000) {
            // if ((decodedJwt?.exp > Date.now()) / 1000) {
            if (decodedJwt) {
               setIsLoading(false);
               setIsAuthenticated(true);
               return;
            }

            setIsLoading(false);
            setIsAuthenticated(false);
            console.log(`file: Auth.js:53  token expired then log user out=====>`);
            // logout();
         }
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [bio?.user?.token]);

      useEffect(() => {
         getStatus();

         window.addEventListener('focus', getStatus);
         return () => {
            window.removeEventListener('focus', getStatus);
         };
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      useEffect(() => {
         // if (isLoading) return;
         // if (!isAuthenticated) return;
         // if (routeRole === 'auth') {
         //    if (router.query?.redirect) {
         //       router.replace(router.query.redirect);
         //    } else {
         //       router.replace(HOME_ROUTE);
         //    }
         // }
         // if (routeRole !== 'auth' && routeRole !== 'optional') {
         //    console.log(`file: Auth.js:49  TOKEN EXPIRED <=====> log user out=====>`);
         //    // router.replace(`${LOGIN_ROUTE}?redirect=${router.asPath}`, `${LOGIN_ROUTE}`);
         //    // logout();
         // }

         if (!isLoading) {
            if (isAuthenticated === true) {
               if (routeRole === 'auth') {
                  if (router.query?.redirect) {
                     router.replace(router.query.redirect);
                  }
                  // else
                  // {
                  //    router.replace(HOME_ROUTE);
                  // }
               }
            } else {
               if (routeRole !== 'auth' && routeRole !== 'optional') {
                  // router.replace(`${LOGIN_ROUTE}?redirect=${router.asPath}`, `${LOGIN_ROUTE}`);
               }
            }
         }
      }, [isAuthenticated, isLoading, router]);

      if (
         // If unauthenticated user want to access protected pages
         (isLoading || !isAuthenticated) &&
         // auth pages and optional pages are allowed to access without login
         routeRole !== 'auth' &&
         routeRole !== 'optional'
      ) {
         return (
            <div className="d-flex vh-100 vw-100 align-items-center justify-content-center bg-black">
               <div className="text-white">
                  <Lottie options={LoadingGif} height={200} width={200} />
               </div>
            </div>
         );
      }

      return <Component {...props} />;
   };

   return ComponentWithAuth;
};

export default withAuth;

// import {getObjectFromStorage, parseJwt} from '@/_helpers';
// import {useEffect, useCallback, useState} from 'react';
// import {userConstants} from '@/_constants';
// import {useDispatch} from 'react-redux';
// import {authActions} from '@/_actions';
// import {useRouter} from 'next/router';
// import {format} from 'date-fns';

// const HOME_ROUTE = '/dashboard';
// const LOGIN_ROUTE = '/login';

// const withAuth = (Component, routeRole) => {
//    const ComponentWithAuth = (props) => {
//       const router = useRouter();
//       const {query} = router;
//       const dispatch = useDispatch();
//       const [token, setToken] = useState('');
//       const [isLoading, setIsLoading] = useState(true);
//       const [isAuthenticated, setIsAuthenticated] = useState(false);
//       // console.log('file: Auth.js:20  isLoadingTOP=====>', isLoading);
//       // console.log('file: Auth.js:21  isAuthenticatedTOP=====>', isAuthenticated);
//       // console.log('file: Auth.js:22  token=====>', token);

//       const logout = useCallback(() => {
//          setIsAuthenticated(false);
//          dispatch(authActions.logout());
//          // eslint-disable-next-line react-hooks/exhaustive-deps
//       }, []);

//       useEffect(() => {
//          (async () => {
//             const user = typeof window !== undefined && (await getObjectFromStorage(userConstants.USER_KEY));
//             setToken(user?.user?.token);
//             setIsLoading(false);
//          })();
//       }, []);

//       const getStatus = useCallback(() => {
//          if (!token) {
//             setIsLoading(false);
//             isAuthenticated && logout();
//             // clearObjectFromStorage(userConstants.USER_KEY);
//             return;
//          }

//          if (token) {
//             const decodedJwt = parseJwt(token);
//             // console.log('file: Auth.js:37  decodedJwt=====>', decodedJwt);
//             // console.log('file: Auth.js:38  new Date()=====>', format(Math.floor(new Date().getTime()), 'HH:mm:ss'));
//             // console.log('file: Auth.js:38  decodedJwt?.nbf * 1000=====>', format(new Date(decodedJwt?.nbf * 1000), 'HH:mm:ss'));
//             // console.log('file: Auth.js:38  token_expires_in=====>', format(new Date(decodedJwt?.iat * 1000 - Date.now()), 'HH:mm:ss'));

//             // if (decodedJwt?.iat * 1000 > Date.now()) {
//             if (decodedJwt) {
//                setIsLoading(false);
//                setIsAuthenticated(true);
//             }
//          }
//       }, [isAuthenticated, logout, token]);

//       useEffect(() => {
//          getStatus();

//          window.addEventListener('focus', getStatus);
//          return () => {
//             window.removeEventListener('focus', getStatus);
//          };
//       }, [getStatus]);

//       useEffect(() => {
//          if (!isLoading) {
//             if (isAuthenticated === true) {
//                if (routeRole === 'auth') {
//                   if (query?.redirect) {
//                      router.replace(query.redirect);
//                   }
//                   // else
//                   // {
//                   //    router.replace(HOME_ROUTE);
//                   // }
//                }
//             } else {
//                if (routeRole !== 'auth' && routeRole !== 'optional') {
//                   // router.replace(`${LOGIN_ROUTE}?redirect=${router.asPath}`, `${LOGIN_ROUTE}`);
//                }
//             }
//          }
//       }, [isAuthenticated, isLoading, query, router]);

//       if (
//          // If unauthenticated user want to access protected pages
//          (isLoading || !isAuthenticated) &&
//          // auth pages and optional pages are allowed to access without login
//          routeRole !== 'auth' &&
//          routeRole !== 'optional'
//       ) {
//          return (
//             <div className="d-flex vh-100 vw-100 align-items-center justify-content-center bg-black">
//                <p className="text-white">Loading...</p>
//             </div>
//          );
//       }

//       return <Component {...props} />;
//    };

//    return ComponentWithAuth;
//    // return <div></div>;
// };

// export default withAuth;
// // export default withRouter(AuthVerify);
