import {nanoid} from 'nanoid';
import BriefCase from '../../public/_assets/icons/briefcase.svg';
import Home from '../../public/_assets/icons/home.svg';
import Users from '../../public/_assets/icons/users.svg';
import User from '../../public/_assets/icons/user.svg';
import SacMoney from '../../public/_assets/icons/sack-money.svg';
import HandShake from '../../public/_assets/icons/hand-shake.svg';
import PiggyBank from '../../public/_assets/icons/piggy-bank.svg';
import HandMoney from '../../public/_assets/icons/hand-money.svg';
import UserCheck from '../../public/_assets/icons/user-check.svg';
import UserTimes from '../../public/_assets/icons/user-times.svg';
import SafeHouse from '../../public/_assets/icons/safe-house.svg';
import Coins from '../../public/_assets/icons/coins.svg';
import InOut from '../../public/_assets/icons/in-out.svg';
import Galaxy from '../../public/_assets/icons/galaxy.svg';
import UserSettings from '../../public/_assets/icons/user-settings.svg';
import Scroll from '../../public/_assets/icons/scroll.svg';
import BarChart from '../../public/_assets/icons/bar-chart.svg';
import Sliders from '../../public/_assets/icons/sliders.svg';
import BadgePercent from '../../public/_assets/icons/badge-percent.svg';
import ClipList from '../../public/_assets/icons/clipboard-list.svg';

export const pageRoutes = [
   {id: nanoid(), label: 'dashboard', activeCode: 1, icon: <Home />, link: '/dashboard'},
   {
      id: nanoid(),
      label: 'customers',
      link: '/',
      group: [
         {id: nanoid(), label: 'users', activeCode: 2, icon: <Users />, link: '/users'},
         {id: nanoid(), label: 'guarantors', activeCode: 3, icon: <User />, link: '/guarantors'},
         {id: nanoid(), label: 'loans', activeCode: 4, icon: <SacMoney />, link: '/loans'},
         {id: nanoid(), label: 'decision models', activeCode: 5, icon: <HandShake />, link: '/decision_models'},
         {id: nanoid(), label: 'savings', activeCode: 6, icon: <PiggyBank />, link: '/savings'},
         {id: nanoid(), label: 'loan requests', activeCode: 7, icon: <HandMoney />, link: '/loan_requests'},
         {id: nanoid(), label: 'whitelist', activeCode: 8, icon: <UserCheck />, link: '/whitelist'},
         {id: nanoid(), label: 'karma', activeCode: 9, icon: <UserTimes />, link: '/karma'},
      ],
   },
   {
      id: nanoid(),
      label: 'businesses',
      link: '/',
      group: [
         {id: nanoid(), label: 'organizations', activeCode: 10, icon: <BriefCase />, link: '/organizations'},
         {id: nanoid(), label: 'loan products', activeCode: 11, icon: <HandMoney />, link: '/loan_products'},
         {id: nanoid(), label: 'savings products', activeCode: 12, icon: <SafeHouse />, link: '/savings_products'},
         {id: nanoid(), label: 'fees and charges', activeCode: 13, icon: <Coins />, link: '/fees_and_charges'},
         {id: nanoid(), label: 'transactions', activeCode: 14, icon: <InOut />, link: '/transactions'},
         {id: nanoid(), label: 'services', activeCode: 15, icon: <Galaxy />, link: '/services'},
         {id: nanoid(), label: 'service account', activeCode: 16, icon: <UserSettings />, link: '/service_account'},
         {id: nanoid(), label: 'settlements', activeCode: 17, icon: <Scroll />, link: '/settlements'},
         {id: nanoid(), label: 'reports', activeCode: 18, icon: <BarChart />, link: '/reports'},
      ],
   },
   {
      id: nanoid(),
      label: 'settings',
      link: '/',
      group: [
         {id: nanoid(), label: 'preferences', activeCode: 19, icon: <Sliders />, link: '/preferences'},
         {id: nanoid(), label: 'fees and pricing', activeCode: 20, icon: <BadgePercent />, link: '/fees_and_pricing'},
         {id: nanoid(), label: 'audit logs', activeCode: 21, icon: <ClipList />, link: '/audit_logs'},
      ],
   },
];
