import {
  SE_ITEMS,
  UP_ITEM,
  RM_ITEM,
  CL_ITEMS,
  SE_ITEMS_ATTR,
  UP_FIELD_OF_ITEM,
  SE_ITEM
} from '../constants/action-types';

/**
 * set array of items like
 * [
 *  {id:"192837", ...otherItemsFields},
 *  {id:"121230", ...otherItemsFields},
 * ]
 * @param {array} payload array of items
 * @param {string} entity entity like photos
 */
export const setItems = (entity, payload) => ({type: SE_ITEMS, entity, payload});

/**
 * update item
 * payload is updated item object
 * @param {object} payload updated item object
 * @param {string} entity entity like photos
 */
export const updateItem = (entity, payload) => ({type: UP_ITEM, entity, payload});

/**
 * remove item with item id
 * payload is item id
 * @param {string} payload item id
 * @param {string} entity entity like photos
 */
export const removeItem = (entity, payload) => ({type: RM_ITEM, entity, payload});

/**
 * clear items remove all of the items in entity
 * used in unMount component event
 * @param {string} entity entity like photos
 */
export const clearItems = entity => ({type: CL_ITEMS, entity});

/**
 * set items attr like total or links
 * @param {string} entity entity like photos
 * @param {object} attrObj object of attr like { total:20 }
 */
export const setItemsAttr = (entity, attrObj = {}) => ({type: SE_ITEMS_ATTR, entity, attrObj});

/**
 * update fields of item
 * @param {string} entity entity like photos
 * @param {*} id the id of itme
 * @param {*} fields updated fields { likes: 123, liked_by_user: false }
 */
export const updateFieldsOfItem = (entity, id, fields = {}) => ({type: UP_FIELD_OF_ITEM, entity, id, fields});

/**
 * set one object in entity
 * @param {string} entity entity like photos
 * @param {object} payload one item object
 */
export const setItem = (entity, payload) => ({type: SE_ITEM, entity, payload});