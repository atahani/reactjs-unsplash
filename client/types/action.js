// @flow

import {
  SE_LAST_PATH_NAME, 
  CL_STORE, 
  CH_JOB_ST, 
  SE_ACTION_DATA,
  GE_ACCESS_TOKEN, 
  SE_ACCESS_TOKEN, 
  LOGOUT, 
  GE_USER_PROFILE, 
  SE_USER_PROFILE,
  GE_USER_COLLECTIONS,
  GE_COLLECTION,
  GE_COLLECTION_PHOTOS,
  SEARCH_COLLECTIONS,
  CREATE_COLLECTION,
  UPDATE_COLLECTION,
  DELETE_COLLECTION,
  ADD_PHOTO_TO_COLLECTION,
  REMOVE_PHOTO_FROM_COLLECTION,
  GE_PHOTOS, 
  LIKE_PHOTO, 
  UNLIKE_PHOTO, 
  SEARCH_PHOTOS, 
  GE_PHOTO,
  SE_ITEMS,
  UP_ITEM,
  RM_ITEM,
  CL_ITEMS,
  SE_ITEMS_ATTR,
  UP_FIELD_OF_ITEM,
  SE_ITEM
} from '../constants/action-types';
import type { AuthorizeToken, UserProfile, Collection } from './data';

// ------------------------------------
// App Actions
// ------------------------------------
type SetLastPathName = {
  type: SE_LAST_PATH_NAME,
  pathName: string,
};

type ClearStore = {
  type: CL_STORE,
};

type ChangeJobStatus = {
  type: CH_JOB_ST,
  status: boolean,
};

type SetActionData = {
  type: SE_ACTION_DATA,
  actionType: string,
  data: any,
};

// ------------------------------------
// User Actions
// ------------------------------------
type GetAccessToken = {
  type: GE_ACCESS_TOKEN,
  code: string,
};

type SetAccessToken = {
  type: SE_ACCESS_TOKEN,
  payload: AuthorizeToken,
};

type Logout = {
  type: LOGOUT,
};

type GetProfile = {
  type: GE_USER_PROFILE,
};

type SetProfile = {
  type: SE_USER_PROFILE ,
  payload: UserProfile,
};

// ------------------------------------
// Collection Actions
// ------------------------------------

type GetUserCollections = {
  type: GE_USER_COLLECTIONS,
  url: string,
};

type GetCollection = {
  type: GE_COLLECTION,
  url: string,
  loadPhotos: boolean,
};

type GetCollectionPhotos = {
  type: GE_COLLECTION_PHOTOS,
  url: string,
};

type SearchInCollections = {
  type: SEARCH_COLLECTIONS,
  url: string,
};

type CreateCollection = {
  type: CREATE_COLLECTION,
  collection: Collection,
};

type UpdateCollection = {
  type: UPDATE_COLLECTION,
  collection: Collection,
};

type DeleteCollection = {
  type: DELETE_COLLECTION,
  id: string,
};

type AddPhotoToCollection = {
  type: ADD_PHOTO_TO_COLLECTION,
  collectionId: string,
  photoId: string,
};

type RemovePhotoFromCollection = {
  type: REMOVE_PHOTO_FROM_COLLECTION,
  collectionId: string,
  photoId: string,
};

// ------------------------------------
// Photo Actions
// ------------------------------------

type GetPhoto = {
  type: GE_PHOTO,
  id: string,
};

type GetPhotos = {
  type: GE_PHOTOS,
  url: string,
};

type LikePhoto = {
  type: LIKE_PHOTO,
  id: string,
};

type UnlikePhoto = {
  type: UNLIKE_PHOTO,
  id: string,
};

type SearchInPhotos = {
  type: SEARCH_PHOTOS,
  url: string,
};

// ------------------------------------
// Item Actions
// ------------------------------------

type SetItem = {
  type: SE_ITEM,
  entity: string,
  payload: Object,
};

type SetItems = {
  type: SE_ITEMS,
  entity: string,
  payload: Array<Object>,
};

type UpdateItem = {
  type: UP_ITEM,
  entity: string,
  payload: Object,
};

type RemoveItem = {
  type: RM_ITEM,
  entity: string,
  id: string,
};

type ClearItems = {
  type: CL_ITEMS,
  entity: string,
};

type SetItemsAttr = {
  type: SE_ITEMS_ATTR,
  entity: string,
  attrObj: Object,
};

type UpdateFieldsOfItem = {
  type: UP_FIELD_OF_ITEM,
  entity: string,
  id: string,
  fields: Object,
}

export type Action = 
  | SetLastPathName
  | ClearStore
  | ChangeJobStatus
  | SetActionData
  | GetAccessToken
  | SetAccessToken
  | Logout
  | GetProfile
  | SetProfile
  | GetUserCollections
  | GetCollection
  | GetCollectionPhotos
  | SearchInCollections
  | CreateCollection
  | UpdateCollection
  | DeleteCollection
  | AddPhotoToCollection
  | RemovePhotoFromCollection
  | GetPhoto
  | GetPhotos
  | LikePhoto
  | UnlikePhoto
  | SearchInPhotos
  | SetItem
  | SetItems
  | UpdateItem
  | RemoveItem
  | ClearItems
  | SetItemsAttr
  | UpdateFieldsOfItem;