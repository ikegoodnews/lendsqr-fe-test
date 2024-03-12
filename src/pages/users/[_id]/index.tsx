import Layout from '@/_components/Layout';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {numberWithCommas} from '@/_helpers';
import {tabLists} from '@/_constants';
import classNames from 'classnames';
import StarRating from 'react-svg-star-rating'; // /dist/StarRating

import ArrowBackIcon from '../../../../public/_assets/icons/go-back-arrow.svg';
import Avatar from '../../../../public/_assets/images/avataruser.png';
import AvatarIcon from '../../../../public/_assets/icons/user-details-avatar.svg';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from '@/_actions';

const UserDetails = () => {
   const router = useRouter();
   const dispatch = useDispatch();
   const {_id} = router.query;
   const {IsRequestingAllUsers, allUsers} = useSelector((s: any) => s.user);
   const [activeTab, setActiveTab] = useState(1);
   const [starRating, setStarRating] = useState(1);

   useEffect(() => {
      dispatch(userActions.getAllUsers());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const user = allUsers?.find((obj: any) => obj._id === _id);
   console.log(`user=====>`, user);

   const personalInformation = [
      {label: 'full name', value: user?.username},
      {label: 'phone number', value: user?.phone_number},
      {label: 'email address', value: user?.email},
      {label: 'bvn', value: user?.bvn},
      {label: 'gender', value: user?.gender},
      {label: 'marital status', value: user?.marital_status},
      {label: 'children', value: user?.children},
      {label: 'type of residence', value: user?.residence_type},
   ];
   const educationAndEmployment = [
      {label: 'level of education', value: user?.education_level},
      {label: 'employment status', value: user?.employment_status},
      {label: 'sector of employment', value: user?.employment_sector},
      {label: 'duration of employment', value: user?.employment_duration},
      {label: 'office email', value: user?.office_email},
      {label: 'monthly income', value: numberWithCommas(user?.monthly_income)},
      {label: 'loan repayment', value: numberWithCommas(user?.loan_repayment)},
   ];
   const socials = [
      {label: 'twitter', value: user?.twitter},
      {label: 'facebook', value: user?.facebook},
      {label: 'instagram', value: user?.instagram},
   ];
   const guarantor = [
      {label: 'full name', value: user?.username},
      {label: 'phone number', value: user?.phone_number},
      {label: 'email address', value: user?.email},
      {label: 'relationship', value: user?.email},
   ];
   // const guarantor2 = [
   //    {label: 'full name', value: user?.username},
   //    {label: 'phone number', value: user?.phone_number},
   //    {label: 'email address', value: user?.email},
   //    {label: 'relationship', value: user?.email},
   // ];

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

         <div className="w-100 details mb-4">
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
                     emptyColor="#E9B20056"
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
                  <li
                     key={i}
                     onClick={() => setActiveTab(list.tab_number)}
                     className={classNames('text-nowrap', {active: activeTab === list.tab_number})}>
                     {list.label}
                  </li>
               ))}
            </ul>
         </div>

         {activeTab === 1 && (
            <div className="complete__details px-4 w-100">
               <div className="personal__information py-4">
                  <h5 className="">Personal Information</h5>
                  <div className="d__grid d-flex flex-wrap">
                     {personalInformation?.map((info, i) => (
                        <div key={i} className="my-3 me-5 pe-4">
                           <p className="pb-2">{info?.label}</p>
                           <h6 className="">{info?.value}</h6>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="personal__information py-4">
                  <h5 className="">education and employment</h5>
                  <div className="d__grid d-flex flex-wrap">
                     {educationAndEmployment?.map((edu, i) => (
                        <div key={i} className="my-3 me-5 pe-4">
                           <p className="pb-2">{edu?.label}</p>
                           <h6 className="">{edu?.value}</h6>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="personal__information py-4">
                  <h5 className="">socials</h5>
                  <div className="d-flex align-items-center">
                     {socials?.map((social, i) => (
                        <div key={i} className="my-3 me-5 pe-4">
                           <p className="pb-2">{social?.label}</p>
                           <h6 className="">{social?.value}</h6>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="personal__information py-4">
                  <h5 className="">guarantor</h5>
                  <div className="d-flex align-items-center">
                     {/* {user?.guarantors?.slice(0, 1)?.map((guarantor, i) => (
                     <div key={i} className="">
                        <p className="">{guarantor?.}</p>
                        <h6 className=""></h6>
                  </div>
               ))} */}
                  </div>
               </div>
               <div className="personal__information py-4">
                  <h5 className=""></h5>
                  <div className="d-flex align-items-center">
                     <div className="">
                        <p className=""></p>
                        <h6 className=""></h6>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {activeTab === 2 && <div className="p-4 details">documents</div>}
         {activeTab === 3 && <div className="p-4 details">bank details</div>}
         {activeTab === 4 && <div className="p-4 details">loans</div>}
         {activeTab === 5 && <div className="p-4 details">savings</div>}
         {activeTab === 6 && <div className="p-4 details">app and system</div>}
      </Layout>
   );
};

export default UserDetails;
