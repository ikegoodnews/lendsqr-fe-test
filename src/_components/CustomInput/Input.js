import React, {useState} from 'react';
import {withFormsy} from 'formsy-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {debounce} from '@/_helpers';

/// ICON IMPORTS ///
import ErrorIcon from '../../../public/_assets/icons/Error.svg';

export const TextInput = withFormsy((props) => {
   const [focused, setFocused] = useState(false);

   const changeValue = (e) => {
      // setValue() will set the value of the component, which in
      // turn will validate it and the rest of the form
      // Important: Don't skip this step. This pattern is required
      // for Formsy to work.
      if (props.valError !== '') {
         typeof props.clearError === 'function' && props.clearError();
      }
      props.setValue(e.currentTarget.value);
      typeof props.onValueChange === 'function' && props.onValueChange(e.currentTarget.value);
   };

   // const changeValue = debounce((e) => _changeValue(e), 1000);

   // props.errorMessage comes only if the component is invalid
   const errorMessage = props.errorMessage || props.valError;

   return (
      <div className={classNames('text-input', props.className)}>
         <div className={classNames('wrapper position-relative', {focus: focused, filled: !!props.value})}>
            <label htmlFor={props.name}>{props.label}</label>
            {props.prefix}
            {props.leftIcon}
            <input
               id={props.id}
               type={props.type}
               name={props.name}
               className="w-100"
               onChange={changeValue}
               required={props.required}
               disabled={props.disabled}
               value={props.value || ''}
               autoFocus={props.autoFocus}
               placeholder={props.placeholder}
               onBlur={() => setFocused(false)}
               onFocus={() => setFocused(true)}
               autoComplete={props.autoComplete}
               onKeyDown={props.onKeyPress}
            />
            {props.rightIcon}
         </div>
         {!!errorMessage && !props.isPristine && (
            <div className="error mt-1 d-flex align-items-center">
               <ErrorIcon />
               <p style={{marginLeft: '.3rem', color: 'red'}}>{errorMessage}</p>
            </div>
         )}
      </div>
   );
});

TextInput.propTypes = {
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
