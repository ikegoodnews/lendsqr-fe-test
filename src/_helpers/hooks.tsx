import {useRouter} from 'next/router';

export const useMatch = (path: string) => {
   const {pathname} = useRouter();

   return pathname === path;
};

export const useLocationCode = () => {
   const {pathname, asPath, query} = useRouter();

   const home = asPath === '/';
   const studentsView = pathname === '/students/[profileUuid]';

   if (home) {
      return 1;
   } else if (studentsView) {
      return 2;
   } else {
      return 12;
   }
};

export const useIsAuthRoute = () => {
   const {pathname} = useRouter();

   const routes = ['/login', '/forgot-password', '/user/reset/token/:token', '/update-password', '/users/[email]/verify/[verification_code]'];

   const checker = (route: string) => routes.indexOf(route) !== -1;

   return checker(pathname);
};
