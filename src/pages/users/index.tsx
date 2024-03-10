import {numberWithCommas, summaryCards} from '@/_helpers';
import React, {useEffect, useState} from 'react';
import Layout from '@/_components/Layout';

import FilterIcon from '../../../public/_assets/icons/filter.svg';
import axios from 'axios';

const Users = () => {
   const [data, setData] = useState(null);
   const [isFetchingData, setIsFetchingData] = useState(false);

   useEffect(() => {
      (async () => {
         try {
            setIsFetchingData(true);
            await axios({
               url: `https://run.mocky.io/v3/47bc4013-6c41-4d2a-8c94-54fde6a6af1a`,
               method: 'GET',
               headers: {
                  // Authorization: `Bearer ${bio?.token}`,
               },
            })
               .then((res) => {
                  console.log('data?.data', res?.data);
                  setIsFetchingData(false);
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
               <div key={i} className="col-md-3">
                  <div className="cards p-4 h-100">
                     <div className="icon">{card.icon}</div>
                     <p className="text-nowrap my-2">{card.label}</p>
                     <h5 className="">{numberWithCommas(card.value)}</h5>
                  </div>
               </div>
            ))}
         </div>

         <table className="">
            <thead className="">
               <tr className="d-table-row">
                  <th className="align-middle text-nowrap text-uppercase d-flex align-items-center">
                     organization <FilterIcon />
                  </th>
                  <th className="align-middle text-nowrap text-uppercase d-flex align-items-center">
                     username <FilterIcon />
                  </th>
                  <th className="align-middle text-nowrap text-uppercase d-flex align-items-center">
                     email <FilterIcon />
                  </th>
                  <th className="align-middle text-nowrap text-uppercase d-flex align-items-center">
                     phone number <FilterIcon />
                  </th>
                  <th className="align-middle text-nowrap text-uppercase d-flex align-items-center">
                     date joined <FilterIcon />
                  </th>
                  <th className="align-middle text-nowrap text-uppercase d-flex align-items-center">
                     status <FilterIcon />
                  </th>
                  <th className="align-middle"></th>
               </tr>
            </thead>
            <tbody className="">
               <tr className="d-table-row">
                  <th scope="row"></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
               </tr>
            </tbody>
         </table>
      </Layout>
   );
};

export default Users;
