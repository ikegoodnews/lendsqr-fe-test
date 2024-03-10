import Formsy from 'formsy-react';
import React from 'react';
import {TextInput} from '../CustomInput';
import Pagination from '../Pagination';

import SearchIcon from '../../../public/_assets/icons/search__icon.svg';
import FilterIcon from '../../../public/_assets/icons/filterIcon.svg';

const CustomTable = (props) => {
   return (
      <div className="custom-table scroll pb-0 px-0">
         <div className="table-values w-100">
            <div className="bar p-4">
               <div className="search-form d-flex align-items-center">
                  <Formsy className="search">
                     <TextInput
                        type="text"
                        name="search"
                        placeholder="Search"
                        className=""
                        autoComplete
                        leftIcon={
                           <button type="submit" className="icon-wrap">
                              <SearchIcon />
                           </button>
                        }
                     />
                  </Formsy>
                  <div className="filter px-3">
                     <FilterIcon />
                     <span className="ms-2">Filters</span>
                  </div>
               </div>
               <button className="dwnld me-3">Download CSV</button>
            </div>
            {props.children}
         </div>
         <Pagination className="sticky-bottom" />
      </div>
   );
};

export default CustomTable;
