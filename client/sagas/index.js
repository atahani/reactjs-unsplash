import {fork, all} from 'redux-saga/effects';
import {getAccessTokenF, logOutF, getMyProfileF} from './user';
import {getPhotosF, likePhotoF, unLikePhotoF} from './photo';
import {getUserCollectionsF, getCollectionF, getCollectionPhotosF} from './collection';

export default function* root() {
  yield all([ // user saga flows
    fork(getAccessTokenF),
    fork(logOutF),
    fork(getMyProfileF),
    // photo saga flows
    fork(getPhotosF),
    fork(likePhotoF),
    fork(unLikePhotoF),
    // collection saga flow
    fork(getUserCollectionsF),
    fork(getCollectionF),
    fork(getCollectionPhotosF)
  ]);
}