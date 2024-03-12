import {useIsAuthRoute, useLocationCode} from '@/_helpers/hooks';
import useOnClickOutside from '@/_components/useOnClickOutside';
import ModalCenter from '@/_controllers/ModalCenter';
import React, {FormEvent, useRef, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Formsy from 'formsy-react';
import {TextInput} from '@/_components/CustomInput';
import {useMediaQuery} from 'react-responsive';

import LenSqrLogo from '../../../public/_assets/icons/lendsqr-logo.svg';
import DropdownIcon from '../../../public/_assets/icons/arrow-down.svg';
import BellIcon from '../../../public/_assets/icons/bell.svg';
import SearchIcon from '../../../public/_assets/icons/search.svg';
import Avatar from '../../../public/_assets/images/avataruser.png';
import {nanoid} from 'nanoid';

const Pill = () => {
   const dropRef = useRef();
   const [dropdown, setDropdown] = useState(false);

   useOnClickOutside(dropRef, () => {
      if (dropdown) setDropdown(false);
   });

   return (
      <div onClick={() => setDropdown(true)} className="user_profile d-flex align-items-center">
         <div className="img">
            <Image priority src={Avatar} alt="user_profile-artwork" height={100} width={100} />
         </div>
         <span className="name ms-2 me-1">adedeji</span>
         <DropdownIcon />
         {dropdown && ( // ref={dropRef}
            <ul className="drop">
               <li className="">dropdown item 1</li>
               <li className="">dropdown item 2</li>
            </ul>
         )}
      </div>
   );
};

const Header = () => {
   const auth = useIsAuthRoute();
   const view999 = useMediaQuery({query: '(max-width: 999px)'});

   const handleSearch = () => {};

   return !auth ? (
      <header className="w-100 d-flex align-items-center justify-content-between">
         <Link href="/dashboard" onClick={ModalCenter.closeModal} className="logo-link d-flex align-items-center">
            <div className="logo">
               <LenSqrLogo />
            </div>
         </Link>
         <div className="header__content d-none d-lg-flex">
            <Formsy onValidSubmit={handleSearch} className="">
               <TextInput
                  id="search"
                  type="text"
                  name="searchInput"
                  placeholder="Search for anything"
                  className="search"
                  useFocusedError
                  // onKeyPress={(e: FormEvent) => {
                  //    e.key === 'Enter' && handleSearch();
                  // }}
                  rightIcon={
                     <button type="submit" onClick={handleSearch} className="searchIcon">
                        <SearchIcon />
                     </button>
                  }
               />
            </Formsy>
            <div className="d-flex align-items-center">
               <p className="docs me-4 d-none d-lg-block">docs</p>
               <div className="bell mx-4 d-none d-lg-block">
                  <BellIcon />
               </div>
               <Pill />
            </div>
         </div>
         {view999 && <i className="fa fa-bars me-4" id="sidebarIcon" onClick={ModalCenter.openModal} aria-hidden="true"></i>}
      </header>
   ) : null;
};

export default Header;
