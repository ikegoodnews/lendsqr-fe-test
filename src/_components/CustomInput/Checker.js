import React from 'react';
import {withFormsy} from 'formsy-react';
import classNames from 'classnames';

export const Checker = withFormsy((props) => {
   const changeValue = (e) => {
      // setValue() will set the value of the component, which in
      // turn will validate it and the rest of the form
      // Important: Don't skip this step. This pattern is required
      // for Formsy to work.
      props.setValue(e.currentTarget.checked);
   };
   return (
      <div className={classNames('checkbox form-check d-flex align-items-center', props.className)}>
         <input
            checked={props.value}
            onClick={props.onClick}
            onChange={props.onChange ?? changeValue}
            type="checkbox"
            className="me-2 form-check-input"
            name={props.name}
            required={props.required}
         />
         <label htmlFor={props.name} className="mt-1 form-check-label">
            {props.label}
         </label>
      </div>
   );
});
