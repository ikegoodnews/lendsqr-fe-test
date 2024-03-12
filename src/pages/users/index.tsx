import {numberWithCommas, setObjectInStorage, summaryCards} from '@/_helpers';
import React, {useEffect, useState} from 'react';
import Layout from '@/_components/Layout';
import axios from 'axios';

import FilterIcon from '../../../public/_assets/icons/filter.svg';
import DotsIcon from '../../../public/_assets/icons/3-dots.svg';
import {format} from 'date-fns';
import classNames from 'classnames';
import {Pagination} from '@/_components';
import {userConstants} from '@/_constants';

const Users = () => {
   const [data, setData] = useState<any[]>([]);
   const [isFetchingData, setIsFetchingData] = useState(false);

   useEffect(() => {
      (async () => {
         try {
            setIsFetchingData(true);
            await axios({
               url: `https://run.mocky.io/v3/8140500f-f58d-49de-a3e5-798437cb162d`,
               method: 'GET',
               headers: {
                  // Authorization: `Bearer ${bio?.token}`,
               },
            })
               .then((res) => {
                  console.log('data?.data', res?.data);
                  setIsFetchingData(false);
                  setObjectInStorage(userConstants.USER_STORE_KEY, res?.data);
                  setData(res?.data);
               })
               .catch((e) => {
                  console.log('error fetching data', e);
                  setIsFetchingData(false);
               });
         } catch (e) {
            // error reading value
            console.log('Something went wrong', e);
            setIsFetchingData(false);
         }
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <Layout className="users">
         <h4 className="pb-3">Users</h4>
         <div className="row my-4">
            {summaryCards?.map((card, i) => (
               <div key={i} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <div className="cards p-4 h-100">
                     <div className="icon">{card.icon}</div>
                     <p className="my-2">{card.label}</p>
                     <h5 className="">{numberWithCommas(card.value)}</h5>
                  </div>
               </div>
            ))}
         </div>

         <div className="table-responsive p-4">
            {isFetchingData ? (
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
                     {data?.length ? (
                        data?.slice(0, 10)?.map((user, i) => (
                           <tr key={i} className="d-table-row">
                              <td className="ps-0">{user?.organization}</td>
                              <td>{user?.username}</td>
                              <td>{user?.email}</td>
                              <td>{user?.phone}</td>
                              <td>{user?.registered ? format(new Date(user?.registered), 'MMM dd, yyyy p') : '-'}</td>
                              <td className="text-capitalize">
                                 <div
                                    className={classNames('', {
                                       active: user?.status === 'active',
                                       inactive: user?.status === 'inactive',
                                       pending: user?.status === 'pending',
                                       blacklisted: user?.status === 'blacklisted',
                                    })}>
                                    {user?.status}
                                 </div>
                              </td>
                              <td className="p-0">
                                 <DotsIcon />
                              </td>
                           </tr>
                        ))
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
            {!isFetchingData && (
               <Pagination
                  rowsPerPageOptions={[]}
                  // colSpan={2}
                  // count={total}
                  // rowsPerPage={rowsPerPage}
                  // page={page}
                  // from={from}
                  // to={to}
                  // onChangePage={handleChangePage}
                  // lastPage={lastPage}
               />
            )}
         </div>
      </Layout>
   );
};

export default Users;
