// @flow

import type { Action } from '../types';

/**
 * set array of items like
 * [
 *  {id:"192837", ...otherItemsFields},
 *  {id:"121230", ...otherItemsFields},
 * ]
 * @param {array} payload array of items
 * @param {string} entity entity like cards
 */
export const setItems = (entity: string, payload: Array<Object>): Action => ({type: 'items/SE_ITEMS', entity, payload});

/**
 * update item
 * payload is updated item object
 * @param {object} payload updated item object
 * @param {string} entity entity like cards
 */
export const updateItem = (entity: string, payload: Object): Action => ({type: 'items/UP_ITEM', entity, payload});

/**
 * remove item with item id
 * payload is item id
 * @param {string} payload item id
 * @param {string} entity entity like cards
 */
export const removeItem = (entity: string, id: string): Action => ({type: 'items/RM_ITEM', entity, id});

/**
 * clear items remove all of the items in entity
 * used in unMount component event
 * @param {string} entity entity like cards
 */
export const clearItems = (entity: string): Action => ({type: 'items/CL_ITEMS', entity});

/**
 * set items attr like total or links
 * @param {string} entity entity like cards
 * @param {object} attrObj object of attr like { total:20 }
 */
export const setItemsAttr = (entity: string, attrObj: ?Object): Action => ({type: 'items/SE_ITEMS_ATTR', entity, attrObj});

/**
 * update fields of item
 * @param {string} entity entity like 'liked-photos'
 * @param {*} id the id of itme
 * @param {*} fields updated fields { likes: 123, likedByUser: false }
 */
export const updateFieldsOfItem = (entity: string, id: string, fields: ?Object): Action => ({type: 'items/UP_FIELD_OF_ITEM', entity, id, fields});

/**
 * set one object in entity
 * @param {string} entity entity like 'liked-photos'
 * @param {object} payload one item object
 */
export const setItem = (entity: string, payload: Object): Action => ({type: 'items/SE_ITEM', entity, payload});