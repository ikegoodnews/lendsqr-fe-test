import {useIsAuthRoute, useLocationCode} from '@/_helpers/hooks';
import ModalCenter, {useModalCenter} from '@/_controllers/ModalCenter';
import {numToString} from '@/_helpers/helpers';
import React, {memo, useCallback, useRef, useState} from 'react';
import {pageRoutes} from '@/_helpers/routes';
import {useMediaQuery} from 'react-responsive';
import classNames from 'classnames';
import Link from 'next/link';
import {useOnClickOutside} from '@/_components';

import ArrowDownIcon from '../../../public/_assets/icons/arrow-down-2.svg';
import BriefCaseIcon from '../../../public/_assets/icons/briefcase.svg';
import LogoutIcon from '../../../public/_assets/icons/sign-out.svg';

// eslint-disable-next-line react/display-name
const Sidebar = memo(() => {
   const ulRef = useRef(null);
   const sideRef = useRef(null);
   const auth = useIsAuthRoute();
   const code = useLocationCode();
   const [drop, setDrop] = useState(false);
   const {modalOpen} = useModalCenter();
   const view999 = useMediaQuery({query: '(max-width: 999px)'});

   useOnClickOutside(sideRef, () => {
      if (view999 && modalOpen) ModalCenter.closeModal();
   });

   useOnClickOutside(ulRef, () => {
      if (drop) setDrop(false);
   });

   const activeRoute = useCallback(
      (num: number) => {
         return code === num;
      },
      [code],
   );

   return !auth ? (
      <div
         ref={sideRef}
         className={classNames('sidebar p-0 pb-3', {
            hidden: view999 && !modalOpen,
            'position-fixed': view999,
         })}>
         {view999 && <i className="fa fa-times" id="sidebarIcon" onClick={ModalCenter.closeModal} aria-hidden="true"></i>}
         <div className="switch-organization">
            <div className={classNames('icon-wrapper h-100 d-flex align-items-center justify-content-center', {})}>
               <BriefCaseIcon />
            </div>
            <span onClick={() => setDrop((s) => !s)} className="">
               switch organization
            </span>
            <div onClick={() => setDrop((s) => !s)} className={classNames('icon-wrapper h-100 d-flex align-items-center justify-content-center', {})}>
               <ArrowDownIcon />
            </div>
            {drop && (
               <ul ref={ulRef} className="dropdown">
                  <li onClick={() => setDrop(false)} className="">
                     organization a
                  </li>
                  <li onClick={() => setDrop(false)} className="">
                     organization b
                  </li>
               </ul>
            )}
         </div>
         <ul className="sidebar_list position-relative">
            {pageRoutes?.map((item, i) => (
               <li key={i} className="">
                  {!item?.group ? (
                     <Link
                        href={item?.link as string}
                        className={classNames('h-100 d-flex align-items-center', {
                           active: activeRoute(item?.activeCode as number),
                        })}
                        onClick={ModalCenter.closeModal}>
                        {item?.icon && (
                           <div
                              className={classNames('icon-wrapper h-100 d-flex align-items-center justify-content-center', numToString(i + 1, true))}>
                              {item?.icon}
                           </div>
                        )}
                        <span className="text-nowrap">{item?.label}</span>
                     </Link>
                  ) : (
                     <>
                        <label htmlFor="" className="">
                           {item?.label}
                        </label>
                        {item?.group?.map((itm, i) => (
                           <Link
                              key={i}
                              href={itm?.link as string}
                              className={classNames('h-100 d-flex align-items-center', {
                                 active: activeRoute(itm?.activeCode as number),
                              })}
                              onClick={ModalCenter.closeModal}>
                              {itm?.icon && (
                                 <div
                                    className={classNames(
                                       'icon-wrapper h-100 d-flex align-items-center justify-content-center',
                                       numToString(i + 1, true),
                                    )}>
                                    {itm?.icon}
                                 </div>
                              )}
                              <span className="text-nowrap">{itm?.label}</span>
                           </Link>
                        ))}
                     </>
                  )}
               </li>
            ))}
            <hr className="mb-2" />
            <li className="last">
               <Link
                  href={'/' as string}
                  className={classNames('h-100 d-flex align-items-center', {
                     active: '',
                  })}
                  onClick={ModalCenter.closeModal}>
                  <div className={classNames('icon-wrapper h-100 d-flex align-items-center justify-content-center', {})}>
                     <LogoutIcon />
                  </div>
                  <span className="text-nowrap">Logout</span>
               </Link>
            </li>
         </ul>
         <div className="version">v1.2.0</div>
      </div>
   ) : null;
});

export default Sidebar;
