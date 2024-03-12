import localForage from 'localforage';
import CryptoJS from 'crypto-js';

localForage.setDriver([localForage.INDEXEDDB, localForage.LOCALSTORAGE, localForage.WEBSQL]);
const passphrase = process.env.NEXT_PUBLIC_GLOBAL_PASSPHRASE;

export const getObjectFromStorage = async (key) => {
   try {
      return localForage.getItem(key).then((data) => {
         if (passphrase && !!data) {
            data = CryptoJS.AES.decrypt(data, passphrase);
            data = data.toString(CryptoJS.enc.Utf8);
            return JSON.parse(data);
         }
         return data;
      });
   } catch (error) {
      throw error;
   }
};

export const clearObjectFromStorage = async (key) => {
   try {
      await localForage.removeItem(key);
      return true;
   } catch (error) {
      throw error;
   }
};

export const setObjectInStorage = async (key, data) => {
   try {
      if (passphrase) {
         data = CryptoJS.AES.encrypt(JSON.stringify(data), passphrase).toString();
      }
      await localForage.setItem(key, data);

      return true;
   } catch (error) {
      throw error;
   }
};

export const checkStatus = (response) => {
   if (response.status >= 200 && response.status < 300) {
      return response;
   } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;

      throw error;
   }
};

export const parseResponse = async (response) => {
   try {
      const contentType = response.headers.get('content-type');
      if (contentType?.indexOf('application/json') !== -1) {
         return await response.json();
      } else {
         const text = await response.text();
         return {message: text};
      }
   } catch (err) {
      return {message: err.message};
   }
};

export const createRequest = (url = '', config, token = '') => {
   const validMethods = ['GET', 'POST', 'HEAD', 'PUT', 'DELETE', 'PATCH'];
   const defaultconfig = {
      mode: 'cors',
      cache: 'default',
      credentials: 'same-origin',
   };
   const defaultHeaders = new Headers();
   defaultHeaders.set('Content-Type', 'application/json');
   defaultHeaders.set('Authorization', `Bearer ${token}`);
   defaultHeaders.set('Accept', `application/json`);

   if (typeof config.method !== 'string') {
      throw new TypeError('config method property must be a string.');
   }
   if (validMethods.indexOf(config.method.toUpperCase()) === -1) {
      throw Error("config method property value most be one of ['GET','POST','HEAD','PUT','DELETE']");
   }

   config.headers = config.headers || defaultHeaders;

   if (config.headers && (!config.headers) instanceof Headers) {
      throw new TypeError('config headers property must be of type Headers.');
   }

   const requestConfig = {
      ...defaultconfig,
      ...config,
   };
   return new Request(url, requestConfig);
};

export const createRequestWithToken =
   (url = '', config) =>
   (token) => {
      const validMethods = ['GET', 'POST', 'HEAD', 'PUT', 'DELETE', 'PATCH'];
      const defaultconfig = {
         mode: 'cors',
         cache: 'default',
         credentials: 'same-origin',
      };
      const defaultHeaders = new Headers();

      defaultHeaders.set('Content-Type', 'application/json');
      defaultHeaders.set('Authorization', `Bearer ${token}`);
      defaultHeaders.set('Accept', 'application/json');

      if (typeof config.method !== 'string') {
         throw new TypeError('config method property must be a string.');
      }
      if (validMethods.indexOf(config.method.toUpperCase()) === -1) {
         throw Error("config method property value most be one of ['GET','POST','HEAD','PUT','DELETE']");
      }

      config.headers = config.headers || defaultHeaders;

      if (config.headers && (!config.headers) instanceof Headers) {
         throw new TypeError('config headers property must be of type Headers.');
      }

      const requestConfig = {
         ...defaultconfig,
         ...config,
      };
      return new Request(url, requestConfig);
   };

export function numberWithCommas(num) {
   if (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   }
   return 0;
}

export const numToString = (num, bool) => {
   switch (num) {
      case 1:
         return bool ? 'first' : 'one';
      case 2:
         return bool ? 'second' : 'two';
      case 3:
         return bool ? 'third' : 'three';
      case 4:
         return bool ? 'fourth' : 'four';
      case 5:
         return bool ? 'fifth' : 'five';
      case 6:
         return bool ? 'sixth' : 'six';
      case 7:
         return bool ? 'seventh' : 'seven';
      case 8:
         return bool ? 'eighth' : 'eight';
      case 9:
         return bool ? 'ninth' : 'nine';
      case 10:
         return bool ? 'tenth' : 'ten';
      default:
         return '';
   }
};
