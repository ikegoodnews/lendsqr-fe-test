import Layout from '@/_components/Layout';
import Image from 'next/image';
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {numberWithCommas} from '@/_helpers';
import {tabLists} from '@/_constants';
import StarRating from 'react-svg-star-rating'; // /dist/StarRating

import ArrowBackIcon from '../../../../public/_assets/icons/go-back-arrow.svg';
import Avatar from '../../../../public/_assets/images/avataruser.png';
import AvatarIcon from '../../../../public/_assets/icons/user-details-avatar.svg';

const UserDetails = () => {
   const router = useRouter();
   const [starRating, setStarRating] = useState(1);

   const handleGoBack = () => {
      router.back();
   };

   const handleStarClick = (rating: number) => {
      setStarRating(rating);
   };

   return (
      <Layout className="users user__details">
         <div onClick={handleGoBack} className="back__to__prev__page">
            <ArrowBackIcon />
            <span className="ms-2">Back to Users</span>
         </div>

         <div className="w-100 d-flex align-items-center justify-content-between">
            <h4 className="pb-3">User Details</h4>
            <div className="my-4 py-3 d-flex align-items-center">
               <button className="blacklist__user">blacklist user</button>
               <button className="ms-3 activate__user">activate user</button>
            </div>
         </div>

         <div className="w-100 details">
            <div className="p-4 pb-5 d-flex align-items-center">
               <div className="image">
                  <AvatarIcon />
                  {/* <Image priority src={Avatar} alt="user_profile-artwork" height={100} width={100} /> */}
               </div>
               <div className="name mx-3">
                  <h4 className="">grace effiom</h4>
                  <span className="">lsqff587g90</span>
               </div>
               <div className="user__tier">
                  <p className="">user&apos;s tier</p>
                  <StarRating
                     unit="full"
                     size={28}
                     count={3}
                     initialRating={starRating}
                     activeColor="#E9B200"
                     hoverColor="#E9B200"
                     emptyColor="rgba(255, 255, 255, .3)"
                     roundedCorner={true}
                     handleOnClick={handleStarClick}
                     innerRadius={20}
                     outerRadius={45}
                     // isReadOnly={true}
                     starClassName="mx-2 each-star"
                     containerClassName=""
                  />
               </div>
               <div className="bank__details mx-3">
                  <h4 className="">&#8358;{numberWithCommas(200000)}.00</h4>
                  <small className="account__details">
                     9912345678/<span className="">Providus bank</span>
                  </small>
               </div>
            </div>
            <ul className="d-flex align-items-center justify-content-around">
               {tabLists?.map((list, i) => (
                  <li key={i} className="">
                     {list.label}
                  </li>
               ))}
            </ul>
         </div>
      </Layout>
   );
};

export default UserDetails;
