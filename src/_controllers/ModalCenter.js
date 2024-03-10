import {useLayoutEffect, useState} from 'react';

class ModalController {
   constructor() {
      // DECLARE PROPERTIES
      this.modalOpen = false;
      this.listeners = [];
      this.values = [];
      this.data = null;
      this.type = null;
      this.img = null;
      this.title = '';
      this.fn = null;

      // BIND METHODS
      this.closeSelect = this.closeSelect.bind(this);
      this.addListener = this.addListener.bind(this);
      this.openSelect = this.openSelect.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.openModal = this.openModal.bind(this);
      this.getState = this.getState.bind(this);
      this.onEvent = this.onEvent.bind(this);
      this.select = this.select.bind(this);
   }

   onEvent() {
      if (this.listeners.length) {
         this.listeners.forEach((func) => func(this.getState()));
      }
   }

   select(val) {
      this.fn(val);
   }

   /**
    * @param {import("react-native-image-crop-picker").ImageOrVideo} val
    */
   set image(val) {
      this.img = val;
      this.onEvent();
   }

   closeSelect() {
      this.values = [];
      this.fn = null;
      this.onEvent();
   }

   openSelect(data) {
      this.values = data.values;
      this.title = data.title;
      this.type = data.type;
      this.fn = data.fn;
      this.onEvent();
   }

   openModal() {
      this.modalOpen = true;
      this.onEvent();
   }

   closeModal() {
      this.modalOpen = false;
      this.onEvent();
   }

   addListener(func) {
      this.listeners.push(func);
   }

   getState() {
      return {
         modalOpen: this.modalOpen,
         values: this.values,
         title: this.title,
         type: this.type,
         data: this.data,
         image: this.img,
      };
   }
}

const ModalCenter = new ModalController();

export const useModalCenter = () => {
   const [state, setState] = useState(ModalCenter.getState());

   useLayoutEffect(() => {
      let isMounted = true;
      ModalCenter.addListener((s) => isMounted && setState((p) => ({...p, ...s})));

      return () => (isMounted = false);
   }, []);

   return state;
};

export default ModalCenter;
