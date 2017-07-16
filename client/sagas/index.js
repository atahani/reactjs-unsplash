import {fork, all} from 'redux-saga/effects';
import {getAccessTokenF, logOutF, getMyProfileF} from './user';
import {getPhotosF, likePhotoF, unLikePhotoF, searchInPhotosF} from './photo';
import {
  getUserCollectionsF,
  getCollectionF,
  getCollectionPhotosF,
  searchInCollectionsF,
  createCollectionF,
  updateCollectionF,
  deleteCollectionF
} from './collection';

export default function* root() {
  yield all([ // user saga flows
    fork(getAccessTokenF),
    fork(logOutF),
    fork(getMyProfileF),
    // photo saga flows
    fork(getPhotosF),
    fork(likePhotoF),
    fork(unLikePhotoF),
    fork(searchInPhotosF),
    // collection saga flow
    fork(getUserCollectionsF),
    fork(getCollectionF),
    fork(getCollectionPhotosF),
    fork(searchInCollectionsF),
    fork(createCollectionF),
    fork(updateCollectionF),
    fork(deleteCollectionF)
  ]);
}