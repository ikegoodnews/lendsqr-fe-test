import React from 'react';
import classNames from 'classnames';

// import Start from '../../../public/_assets/icons/start.svg';
import Prev from '../../../public/_assets/icons/prev.svg';
import Next from '../../../public/_assets/icons/next2.svg';
// import End from '../../../public/_assets/icons/end.svg';

const Pagination = (props) => {
   const {from, count, to, page, lastPage, rowsPerPage} = props;

   // const handleFirstPageButtonClick = (event) => {
   //    if (page !== 0) {
   //       props.onChangePage(event, 0);
   //    }
   // };
   const handleBackButtonClick = (event) => {
      if (page !== 0) {
         props.onChangePage(event, page - 1);
      }
   };
   const handleNextButtonClick = (event) => {
      if (page + 1 !== lastPage) {
         props.onChangePage(event, page + 1);
      }
   };
   // const handleLastPageButtonClick = (event) => {
   //    if (page !== lastPage) {
   //       props.onChangePage(event, lastPage);
   //    }
   // };

   const handlePageClick = (i) => {
      props.onChangePage(i, Number(i.target.innerHTML) - 1);
   };

   const buttons = [];
   const button = [];
   const pages = page + 5;

   for (var i = 0; i < lastPage; i++) {
      buttons.push(
         <li key={i} onClick={(i) => handlePageClick(i)} className={classNames('pages mx-2', {active: page === i})}>
            {i + 1}
         </li>,
      );
   }

   for (var j = page; j < pages; j++) {
      button.push(
         <li key={j} onClick={(j) => handlePageClick(j)} className={classNames('pages mx-2', {active: page === j})}>
            {j + 1}
         </li>,
      );
   }

   return (
      <ul className={`pagination p-4 w-100 ${props.className}`}>
         <li className="">
            {from} - {to} of {count}
         </li>
         <div className="lines d-flex align-items-center">
            {/* <li onClick={page === 0 ? null : handleFirstPageButtonClick} className={classNames('mx-3', {disabled: page === 0})}>
               <Start />
            </li> */}
            <li onClick={page === 0 ? null : handleBackButtonClick} className={classNames('d-flex align-items-center me-3', {disabled: page === 0})}>
               <Prev />
               <span className="ms-1">Previous</span>
            </li>
            {lastPage > 5 ? button : buttons}
            <li
               onClick={page >= Math.ceil(count / rowsPerPage) - 1 ? null : handleNextButtonClick}
               className={classNames('ms-3 d-flex align-items-center', {disabled: page >= Math.ceil(count / rowsPerPage) - 1})}>
               <span className="me-1">Next</span>
               <Next />
            </li>
            {/* <li
               onClick={page >= Math.ceil(count / rowsPerPage) - 1 ? null : handleLastPageButtonClick}
               className={classNames('mx-3', {disabled: page >= Math.ceil(count / rowsPerPage) - 1})}>
               <End />
            </li> */}
         </div>
      </ul>
   );
};

export default Pagination;
