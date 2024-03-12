export const updateObject = (oldObject, newValues) => {
   // Encapsulate the idea of passing a new object as the first parameter
   // to Object.assign to ensure we correctly copy data instead of mutating
   return Object.assign({}, oldObject, newValues);
};

export const updateItemInArray = (array, itemId, uuid = false, updateItemCallback) => {
   const updatedItems = array.map((item) => {
      const isUuid = uuid ? true : false;

      if (isUuid && item?.uuid !== itemId) {
         // Since we only want to update one item, preserve all others as they are now
         return item;
      } else if (!isUuid && item?.id !== itemId) {
         return item;
      }
      // Use the provided callback to create an updated item
      const updatedItem = updateItemCallback(item);
      return updatedItem;
   });
   return updatedItems;
};

export const updateObjectInArray = (array, action) => {
   return array.map((item, index) => {
      if (index !== action.index) {
         // This isn't the item we care about - keep it as-is
         return item;
      }

      // Otherwise, this is the one we want - return an updated value
      return {
         ...item,
         ...action.item,
      };
   });
};
