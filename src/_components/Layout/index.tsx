import classNames from 'classnames';
import {useIsAuthRoute} from '@/_helpers';
import {Header, Sidebar} from '@/_navigation';
import React, {PropsWithChildren, memo} from 'react';

type classNameProps = {
   className: string | undefined;
};

// eslint-disable-next-line react/display-name
const Layout = memo((props: PropsWithChildren<classNameProps>) => {
   const auth = useIsAuthRoute();

   return (
      <main>
         <div className={classNames('layout__wrapper vh-100 w-100 position-relative', {bgLayoutImg: !!auth})}>
            <div className="bgOverlay position-absolute start-0 end-0 top-0 bottom-0"></div>
            <div className="h-100 w-100 contents position-relative">
               <Header />
               <div className="contents__inner p-0 d-flex">
                  <Sidebar />
                  <section className={`layout__wrapper__section ${props.className}`}>{props.children}</section>
               </div>
            </div>
         </div>
      </main>
   );
});

export default Layout;
