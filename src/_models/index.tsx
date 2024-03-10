import {ReactNode} from 'react';

export interface PropsWithChildren {
   className: string | undefined;
   children?: ReactNode;
}

export interface RefObject<T> {
   readonly current: T | null;
}

export interface pageRouteProps {
   id: number | string;
   label: string;
   activeCode?: number;
   icon?: JSX.Element | string;
   link?: string;
   group?: [string | number];
   // id: number;
   // label: string;
   // link: string;
   // active: number;
   // icon?: JSX.Element | string;
}
