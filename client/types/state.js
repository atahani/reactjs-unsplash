// @flow

export type AppState = {
  actionData: Object,
  lastPathname: string,
  jobRunning: number,
  searchValues: {
    query: string,
    title: string,
    value: string,
  },
};

export type ItemsState = {
  photos: Object,
  photosAttr: Object,
  userCollections: Object,
  userCollectionsAttr: Object,
  collections: Object,
  collectionsAttr: Object,
};

export type UserState = {
  isAuthorized: boolean,
  userProfile: Object,
  token: Object
};