import useOnClickOutside from '@/_components/useOnClickOutside';
import {useIsAuthRoute, useLocationCode} from '@/_helpers/hooks';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useCallback, useRef, useState} from 'react';

import LenSqrLogo from '../../../public/_assets/icons/lendsqr-logo.svg';
import ModalCenter from '@/_controllers/ModalCenter';

const Pill = () => {
   const dropRef = useRef<HTMLElement | null | undefined>();
   const router = useRouter();
   // const dispatch = useDispatch();
   // const {bio} = useSelector((s) => s.user);
   // const {loginSuccess} = useSelector((s) => s.auth);
   const [dropdown, setDropdown] = useState(false);

   useOnClickOutside(dropRef, () => {
      if (dropdown) setDropdown(false);
   });

   const handleClick = () => {
      router.push('/settings');
      setDropdown(false);
   };

   // const handleLogout = useCallback(() => {
   //    if (bio !== undefined) {
   //       dispatch(authActions.logout());
   //    } else {
   //       router.push('/login');
   //    }
   //    setDropdown(false);

   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, [bio, router]);

   // useEffect(() => {
   //    const listener = AppEmitter.addListener(authConstants.LOGOUT_SUCCESS, (event) => {
   //       router.push('/');
   //    });

   //    return () => listener.remove();
   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, []);

   return (
      <div onClick={() => setDropdown(true)} className="user_profile">
         <div className="img">
            <Image
               priority
               src={`https://ui-avatars.com/api/?background=random&font-size=0.33&length=3&name=name}`}
               alt="zyonel-tech-artwork"
               height={100}
               width={100}
            />
         </div>
         {dropdown && (
            <ul className="drop">
               <li onClick={handleClick} className="">
                  settings
               </li>
               <li className="">logout</li>
            </ul>
         )}
      </div>
   );
};

const Header = () => {
   const auth = useIsAuthRoute();
   const code = useLocationCode();

   const getPageName = useCallback(
      (type: number) => {
         switch (type) {
            case 1:
               return 'Dashboard';
            case 2:
               return 'Students';
            default:
               return '';
         }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
   );

   return !auth ? (
      <header className="w-100 d-flex align-items-center justify-content-between">
         <Link href="/dashboard" onClick={ModalCenter.closeModal} className="logo-link d-flex align-items-center">
            <div className="logo">
               <LenSqrLogo />
            </div>
         </Link>
         <h5 className="pageName fs-5">name{getPageName(code)}</h5>
         <div className="d-flex align-items-center">here...{/* <Pill /> */}</div>
      </header>
   ) : null;
};

export default Header;
