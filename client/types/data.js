// @flow

export type AuthorizeToken = {
  accessToken: string,
  createdAt: Date,
  refreshToken: string,
  scope: string,
  tokenType: string,
};

export type UserLinks = {
  slef: string,
  html: string,
  photos: string,
  likes: string,
  portfolio: string,
  following: string,
  followers: string,
};

export type ImageLinks = {
  large: string,
  medium: string,
  small: string,
};

export type PhotoUrls = {
  raw: string,
  full: string,
  regular: string,
  small: string,
  thumb: string,
};

export type PhotoLinks = {
  self: string,
  html: string,
  download: string,
  downloadLocation: string,
};

export type CollectionLinks = {
  self: string,
  html: string,
  photos: string,
};

export type UserProfile = {
  uid: string,
  updatedAt: string,
  username: string,
  firstName: string,
  lastName: string,
  name: string,
  numericId: string,
  twitterUsername: string,
  portfolioUrl: ?string,
  bio: ?string,
  badge: ?number,
  completedOnboarding: boolean,
  location: ?string,
  totalLikes: number,
  totalPhotoes: number,
  totalCollections: number,
  followedByUser: boolean,
  followersCount: number,
  followingCount: number,
  downloads: number,
  uploadsRemaining: number,
  instagramUsername: string,
  email: string,
  links: UserLinks,
  profileImage: ImageLinks,
  tags: any,// since we don't use it
};

export type User = {
  bio: ?string,
  firstName: string,
  followedByUser: false,
  id: string,
  lastName: string,
  links: UserLinks,
  location: ?string,
  name: string,
  portfolioUrl: ?string,
  profileImage: ImageLinks,
  totalCollections: number,
  totalLikes: number,
  totalPhotoes: number,
  twitterUsername: ?string,
  updatedAt: string,
  username: string,
};

export type Photo = {
  id: string,
  createdAt: string,
  updatedAt: string,
  width: number,
  height: number,
  color: string,
  downloads: number,
  likes: number,
  likedByUser: boolean,
  description: string,
  exif: Object,// since we don't use it
  location: ?Object,// since we don't use it
  currentUserCollections: Array<Object>,//TODO: change it
  user: User,
  urls: PhotoUrls,
  categories: Array<any>, // we don't use it
  links: PhotoLinks,
  user: User,
};

export type Collection = {
  id?: string,
  title: string,
  description: ?string,
  publishedAt?: string,
  updatedAt?: string,
  curated?: boolean,
  featured?: boolean,
  totalPhotos?: number,
  private: boolean,
  shareKey?: string,
  coverPhoto?: Photo,
  user?: User,
  links?: CollectionLinks
};
