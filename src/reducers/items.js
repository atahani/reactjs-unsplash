//@flow

import omit from 'lodash/omit';
import camelCaseKeys from 'camelcase-keys-deep';
import type { Action } from '../types';
import type { ItemsState } from '../types/state';

const initialState = {
  photos: {},
  photosAttr: {},
  userCollections: {},
  userCollectionsAttr: {},
  collections: {},
  collectionsAttr: {},
};

/**
 * items reducer
 * this is object base on item id and entity
 * @param {object} state state current state
 * @param {*} action pure action object
 */
export default (
  state: ItemsState = initialState,
  action: Action
): ItemsState => {
  switch (action.type) {
    // action > setItem
    case 'items/SE_ITEM': {
      // NOTE: in SE_ITEM added to first
      const element = camelCaseKeys(action.payload);
      const newObj = Object.assign(
        {},
        {
          [action.payload.id]: { ...element },
        }
      );
      return Object.assign({}, state, {
        [action.entity]: {
          ...newObj,
          ...state[action.entity],
        },
      });
    }
    // action > setItems
    case 'items/SE_ITEMS': {
      // the payload === array of entity items
      let newItems: Object = {};
      for (let i = 0; i < action.payload.length; i++) {
        let element = action.payload[i];
        element = camelCaseKeys(element);
        newItems = Object.assign({}, newItems, {
          [element.id]: { ...element },
        });
      }
      // like > state.items.photos
      return Object.assign({}, state, {
        [action.entity]: {
          ...state[action.entity],
          ...newItems,
        },
      });
    }
    // action > updateItem(entity,payload)
    case 'items/UP_ITEM':
      // the payload === item object
      return Object.assign({}, state, {
        [action.entity]: {
          ...state[action.entity],
          [action.payload.id]: camelCaseKeys(action.payload),
        },
      });
    // action > updateFieldOfItem
    case 'items/UP_FIELD_OF_ITEM': {
      // first get items
      const items = state[action.entity];
      // get item by id
      const item = items[action.id];
      // if dosn't have any item with this id
      if (!item) {
        return state;
      }
      const fields = camelCaseKeys(action.fields);
      const obj = Object.assign({}, item, {
        ...fields,
      });
      return Object.assign({}, state, {
        [action.entity]: {
          ...state[action.entity],
          [action.id]: obj,
        },
      });
    }
    // action > deleteItem(entity,payload)
    case 'items/RM_ITEM':
      // action.payload === id of item to delete
      return Object.assign({}, state, {
        [action.entity]: omit(state[action.entity], action.id),
      });
    // action > clearItems()
    case 'items/CL_ITEMS':
      // clear both items entity and entityAttr
      return Object.assign({}, state, {
        [action.entity]: {},
        [`${action.entity}Attr`]: {},
      });
    // action > setItemsAttr(entity,attrObj)
    case 'items/SE_ITEMS_ATTR': {
      // like > state.items.photosAttr.total
      return Object.assign({}, state, {
        [`${action.entity}Attr`]: action.attrObj,
      });
    }
    default:
      return state;
  }
};
