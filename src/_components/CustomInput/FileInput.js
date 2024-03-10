import React, {useState} from 'react';
import {withFormsy} from 'formsy-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/// ICON IMPORTS ///
import ErrorIcon from '../../../public/_assets/icons/Error.svg';

export const FileInput = withFormsy((props) => {
   const [focused, setFocused] = useState(false);
   const changeValue = (e) => {
      // setValue() will set the value of the component, which in
      // turn will validate it and the rest of the form
      // Important: Don't skip this step. This pattern is required
      // for Formsy to work.
      props.setValue(e.currentTarget.value);
      typeof props.onValueChange === 'function' && props.onValueChange(e.currentTarget.value);
   };

   // props.errorMessage comes only if the component is invalid
   const errorMessage = props.errorMessage || props.valError;

   return (
      <div className={classNames('file-input', props.className)}>
         <div className={classNames('wrapper', {focus: focused})}>
            <input
               id={props.id}
               name={props.name}
               type={props.type}
               className="w-100"
               onFocus={() => setFocused(true)}
               onBlur={() => setFocused(false)}
               value={props.value || ''}
               placeholder={props.placeholder}
               onChange={changeValue}
               required={props.required}
               disabled={props.disabled}
               autoFocus={props.autoFocus}
               autoComplete={props.autoComplete}
            />
            {!props.textarea && props.rightIcon}
         </div>
         {!!errorMessage && !props.isPristine && (
            <div className="error d-flex align-items-center">
               <ErrorIcon />
               <p>{errorMessage}</p>
            </div>
         )}
      </div>
   );
});

FileInput.propTypes = {
   id: PropTypes.string,
   name: PropTypes.string.isRequired,
   className: PropTypes.string,
   type: PropTypes.string,
   value: PropTypes.string,
   placeholder: PropTypes.string,
   required: PropTypes.bool,
   disabled: PropTypes.bool,
   autoFocus: PropTypes.bool,
   autoComplete: PropTypes.string,
};
