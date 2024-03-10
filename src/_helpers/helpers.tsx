export const numToString = (num: number, bool: boolean) => {
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
