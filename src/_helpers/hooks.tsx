import {useRouter} from 'next/router';

export const useMatch = (path: string) => {
   const {pathname} = useRouter();

   return pathname === path;
};

export const useLocationCode = () => {
   const {pathname, asPath, query} = useRouter();

   const home = asPath === '/';
   const dashboard = asPath === '/dashboard';
   const users = asPath === '/users';
   const guarantors = asPath === '/guarantors';
   const loans = asPath === '/loans';
   const decision_models = asPath === '/decision_models';
   const savings = asPath === '/savings';
   const loan_requests = asPath === '/loan_requests';
   const whitelist = asPath === '/whitelist';
   const karma = asPath === '/karma';
   const organizations = asPath === '/organizations';
   const loan_products = asPath === '/loan_products';
   const savings_products = asPath === '/savings_products';
   const fees_and_charges = asPath === '/fees_and_charges';
   const transactions = asPath === '/transactions';
   const services = asPath === '/services';
   const service_amount = asPath === '/service_amount';
   const settlements = asPath === '/settlements';
   const reports = asPath === '/reports';
   const preferences = asPath === '/preferences';
   const fees_and_pricing = asPath === '/fees_and_pricing';
   const audit_logs = asPath === '/audit_logs';
   // const studentsView = pathname === '/students/[profileUuid]';

   if (home || dashboard) {
      return 1;
   } else if (users) {
      return 2;
   } else if (guarantors) {
      return 3;
   } else if (loans) {
      return 4;
   } else if (decision_models) {
      return 5;
   } else if (savings) {
      return 6;
   } else if (loan_requests) {
      return 7;
   } else if (whitelist) {
      return 8;
   } else if (karma) {
      return 9;
   } else if (organizations) {
      return 10;
   } else if (loan_products) {
      return 11;
   } else if (savings_products) {
      return 12;
   } else if (fees_and_charges) {
      return 13;
   } else if (transactions) {
      return 14;
   } else if (services) {
      return 15;
   } else if (service_amount) {
      return 16;
   } else if (settlements) {
      return 17;
   } else if (reports) {
      return 18;
   } else if (preferences) {
      return 19;
   } else if (fees_and_pricing) {
      return 20;
   } else if (audit_logs) {
      return 21;
   } else {
      return 22;
   }
};

export const useIsAuthRoute = () => {
   const {pathname} = useRouter();

   const routes = ['/login', '/forgot-password', '/user/reset/token/:token', '/update-password', '/users/[email]/verify/[verification_code]'];

   const checker = (route: string) => routes.indexOf(route) !== -1;

   return checker(pathname);
};
