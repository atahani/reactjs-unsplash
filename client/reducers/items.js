import mapKeys from 'lodash/mapKeys';
import omit from 'lodash/omit';
import { SE_ITEMS, CL_ITEMS, UP_ITEM, RM_ITEM, SE_ITEMS_ATTR, UP_FIELD_OF_ITEM, SE_ITEM, } from '../constants/action-types';

const initialState = {
  photos: {},
  photos_attr: {},
  user_collections: {},
  user_collections_attr: {},
  collections: {},
  collections_attr: {},
};

/**
 * items reducer 
 * this is object base on item id and entity
 * state.items.photos = {
 *  "1239048": { ...itemObject },
 *  "0918203": { ...anotherItem },
 * }
 * @param {object} state state current state
 * @param {*} action pure action object
 */
export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    // action > setItem
    case SE_ITEM: {
      // NOTE: in SE_ITEM added to first
      const newObj = mapKeys([action.payload], 'id');
      return Object.assign({}, state, {
        [action.entity]: {
          ...newObj,
          ...state[action.entity],
        }
      });
    }
    // action > setItems
    case SE_ITEMS: {
      // the payload === array of entity items
      const newItems = mapKeys(action.payload, 'id');
      // like > state.items.photos
      return Object.assign({}, state, {
        [action.entity]: {
          ...state[action.entity], ...newItems,
        }
      });
    }
    // action > updateItem(entity,payload)
    case UP_ITEM:
      // the payload === item object
      return Object.assign({}, state, {
        [action.entity]: {
          ...state[action.entity],
          [action.payload.id]: action.payload
        }
      });
    // action > updateFieldOfItem
    case UP_FIELD_OF_ITEM: {
      // first get items
      const items = state[action.entity];
      // get item by id
      const item = items[action.id];
      // if dosn't have any item with this id
      if (!item) {
        return state;
      }
      const obj = Object.assign({}, item, {
        ...action.fields,
      });
      return Object.assign({}, state, {
        [action.entity]: {
          ...state[action.entity],
          [action.id]: obj,
        }
      });
    }
    // action > deleteItem(entity,payload)
    case RM_ITEM:
      // action.payload === id of item to delete
      return Object.assign({}, state, {
        [action.entity]: omit(state[action.entity], action.payload),
      });
    // action > clearItems()
    case CL_ITEMS:
      // clear both items entity and entity_attr
      return Object.assign({}, state, {
        [action.entity]: {},
        [`${action.entity}_attr`]: {},
      });
    // action > setItemsAttr(entity,attrObj)
    case SE_ITEMS_ATTR: {
      // like > state.items.photos_attr.total
      return Object.assign({}, state, {
        [`${action.entity}_attr`]: action.attrObj,
      });
    }
    default:
      return state;
  }
}