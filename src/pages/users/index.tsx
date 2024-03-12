import {numberWithCommas, setObjectInStorage, summaryCards} from '@/_helpers';
import React, {useEffect, useRef, useState} from 'react';
import Layout from '@/_components/Layout';
// import axios from 'axios';
import {format} from 'date-fns';
import classNames from 'classnames';
import {Pagination, useOnClickOutside} from '@/_components';
// import {userConstants} from '@/_constants';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from '@/_actions';

import FilterIcon from '../../../public/_assets/icons/filter.svg';
import DotsIcon from '../../../public/_assets/icons/3-dots.svg';
import EyeIcon from '../../../public/_assets/icons/eye.svg';
import UserTimesIcon from '../../../public/_assets/icons/user-times-2.svg';
import UserCheckIcon from '../../../public/_assets/icons/user-check-2.svg';
import {useRouter} from 'next/router';

const Users = () => {
   const dispatch = useDispatch();
   const {IsRequestingAllUsers, allUsers} = useSelector((s: any) => s.user);

   useEffect(() => {
      dispatch(userActions.retrieveAllUsers());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <Layout className="users">
         <h4 className="pb-3">Users</h4>
         <div className="row my-4">
            {summaryCards?.map((card, i) => (
               <div key={i} className="col-xl-3 col-md-4 col-sm-6 mb-4">
                  <div className="cards p-4 h-100">
                     <div className="icon">{card.icon}</div>
                     <p className="my-2">{card.label}</p>
                     <h5 className="">{numberWithCommas(card.value)}</h5>
                  </div>
               </div>
            ))}
         </div>

         <div className="table-responsive p-4">
            {IsRequestingAllUsers ? (
               'loading...'
            ) : (
               <table className="">
                  <thead className="">
                     <tr className="d-table-row">
                        <th className="ps-0 align-middle text-nowrap text-uppercase">
                           organization <FilterIcon />
                        </th>
                        <th className="align-middle text-nowrap text-uppercase">
                           username <FilterIcon />
                        </th>
                        <th className="align-middle text-nowrap text-uppercase">
                           email <FilterIcon />
                        </th>
                        <th className="align-middle text-nowrap text-uppercase">
                           phone number <FilterIcon />
                        </th>
                        <th className="align-middle text-nowrap text-uppercase">
                           date joined <FilterIcon />
                        </th>
                        <th className="align-middle text-nowrap text-uppercase">
                           status <FilterIcon />
                        </th>
                        <th className="align-middle p-0"></th>
                     </tr>
                  </thead>
                  <tbody className="">
                     {allUsers?.length ? (
                        allUsers?.slice(0, 10)?.map((user: any, i: number) => <TableRow key={user?.id} i={i} user={user} />)
                     ) : (
                        <tr className="d-table-row">
                           <td align="center" className="pt-5" colSpan={6}>
                              <p>No payments have been added</p>
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            )}
         </div>
         {!IsRequestingAllUsers && (
            <Pagination
               rowsPerPageOptions={[]}
               // colSpan={2}
               count={allUsers?.length}
               // rowsPerPage={rowsPerPage}
               // page={page}
               // from={from}
               // to={to}
               // onChangePage={handleChangePage}
               // lastPage={lastPage}
            />
         )}
      </Layout>
   );
};

export default Users;

const TableRow = ({user, i}: any) => {
   const ulRef = useRef<HTMLUListElement>(null);
   const router = useRouter();
   const [drop, setDrop] = useState(false);

   useOnClickOutside(ulRef, () => {
      if (drop) setDrop(false);
      // switch (drop) {
      //    case open:
      //       return setDrop(true);
      //    case deleteModal:
      //       return setDrop(true);
      //    default:
      //       return setDrop(false);
      // }
   });

   const handleClick = () => {
      router.push(
         {
            pathname: `/users/[_id]`,
            query: {
               _id: user?._id,
               // username: user?.username,
            },
         },
         `/users/[_id]`,
      );
   };

   return (
      <tr key={i} className="d-table-row">
         <td className="ps-0">{user?.organization}</td>
         <td>{user?.username}</td>
         <td>{user?.email}</td>
         <td>{user?.phone_number}</td>
         <td>{user?.date_registered ? format(new Date(user?.date_registered), 'MMM dd, yyyy p') : '-'}</td>
         <td className="text-capitalize">
            <div
               className={classNames('colors', {
                  active: user?.status === 'active',
                  inactive: user?.status === 'inactive',
                  pending: user?.status === 'pending',
                  blacklisted: user?.status === 'blacklisted',
               })}>
               {user?.status}
            </div>
         </td>
         <td className="p-0">
            <div className="options">
               <DotsIcon onClick={() => setDrop((s) => !s)} />
               {drop && (
                  <ul ref={ulRef} className="drop">
                     <li onClick={handleClick} className="">
                        <EyeIcon className="me-1" /> view details
                     </li>
                     <li className="">
                        <UserTimesIcon className="me-1" /> blacklist user
                     </li>
                     <li className="">
                        <UserCheckIcon className="me-1" /> activate user
                     </li>
                  </ul>
               )}
            </div>
         </td>
      </tr>
   );
};
