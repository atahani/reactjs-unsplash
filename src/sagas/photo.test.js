import { take, put, call, fork, all } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import {
  likePhotoF,
  unLikePhotoF,
  getPhotosF,
  searchInPhotosF,
  getPhotoF,
} from '../sagas/photo';
import { handleCommonErr } from '../sagas/app';
import {
  LIKE_PHOTO,
  UNLIKE_PHOTO,
  GE_PHOTOS,
  SEARCH_PHOTOS,
  GE_PHOTO,
} from '../constants/action-types';
import {
  likePhoto,
  unLikePhoto,
  getPhotos,
  searchInPhotos,
  getPhoto,
} from '../actions/photo';
import {
  updateFieldsOfItem,
  setItems,
  setItemsAttr,
  setItem,
} from '../actions/items';
import { jobStatus } from '../actions/app';
import {
  likePhoto as likeAPI,
  unLikePhoto as unLikeAPI,
  getPhotos as getPhotosAPI,
  getPhoto as getPhotoAPI,
} from '../api/photo';
import { getReq } from '../api/rest-helper';

/**
 * redux-saga Testing
 * https://redux-saga.js.org/docs/advanced/Testing.html
 */
describe('Photos Sagas Flow', () => {
  describe('get Photos flow', () => {
    const data = {};
    data.gen = cloneableGenerator(getPhotosF)();
    it('first ready to take GE_PHOTOS action', () => {
      expect(data.gen.next().value).toEqual(take(GE_PHOTOS));
    });

    it('pass action and then jobStatus(true) should run', () => {
      expect(data.gen.next(getPhotos('/')).value).toEqual(put(jobStatus(true)));
    });

    it('call the api', () => {
      expect(data.gen.next().value).toEqual(call(getPhotosAPI, '/'));
    });

    it('pass fake API and then jobStatus(false) should run', () => {
      const fakeAPI = () => ({ response: [], error: void 0 });
      expect(data.gen.next(fakeAPI()).value).toEqual(put(jobStatus(false)));
    });

    it('run two actions setItems() and setItemsAttr()', () => {
      expect(data.gen.next().value).toEqual(
        all([put(setItems('photos', [])), put(setItemsAttr('photos'))])
      );
    });
  });

  describe('Like Photo Flow', () => {
    const data = {};
    data.gen = cloneableGenerator(likePhotoF)();
    it('first ready to take LIKE_PHOTO action', () => {
      expect(data.gen.next().value).toEqual(take(LIKE_PHOTO));
    });

    it('pass likePhoto action then run jobStatus action', () => {
      expect(data.gen.next(likePhoto('123')).value).toEqual(
        put(jobStatus(true))
      );
    });

    it('after jobStatus(true) call the API to get response and error', () => {
      expect(data.gen.next().value).toEqual(call(likeAPI, '123'));
    });

    it('call fakeAPI and then run jobStatus(false) action', () => {
      const fakeAPI = () => ({ response: true, error: null });
      expect(data.gen.next(fakeAPI()).value).toEqual(put(jobStatus(false)));
    });

    it(
      'after jobStatus(false) and since the response is true run updateFieldsOfItem act' +
        'ion',
      () => {
        expect(data.gen.next().value).toEqual(
          put(updateFieldsOfItem('photos', '123'))
        );
      }
    );

    //NOTE: since we have while loop don't have done !
    it('again ready to take LIKE_PHOTO action', () => {
      expect(data.gen.next().value).toEqual(take(LIKE_PHOTO));
    });

    it('should fork error when error happend in API request', () => {
      data.gen.next(likePhoto('123')); // run jobStatus(true)
      data.gen.next(); // call the likeAPI
      const fakeAPI = () => ({
        response: false,
        error: {
          code: 404,
        },
      });
      data.gen.next(fakeAPI());
      expect(data.gen.next().value).toEqual(
        fork(
          handleCommonErr,
          {
            code: 404,
          },
          LIKE_PHOTO,
          { id: '123' }
        )
      );
    });
  });

  describe('Un Like Photo Flow', () => {
    const data = {};
    data.gen = cloneableGenerator(unLikePhotoF)();
    it('first ready to take UNLIKE_PHOTO action', () => {
      expect(data.gen.next().value).toEqual(take(UNLIKE_PHOTO));
    });

    it('pass unLikePhoto action then run jobStatus(true)', () => {
      expect(data.gen.next(unLikePhoto('123')).value).toEqual(
        put(jobStatus(true))
      );
    });

    it('after jobStatus(true) call unLikedAPI', () => {
      expect(data.gen.next().value).toEqual(call(unLikeAPI, '123'));
    });

    it('call fake API and then run jobStatus(false)', () => {
      const fakeAPI = () => ({ response: true, error: void 0 });
      expect(data.gen.next(fakeAPI()).value).toEqual(put(jobStatus(false)));
    });

    it('after that should updateFieldsOfItem for photos collection', () => {
      expect(data.gen.next().value).toEqual(
        put(updateFieldsOfItem('photos', '123'))
      );
    });
  });

  describe('search in photos flow', () => {
    const data = {};
    data.gen = cloneableGenerator(searchInPhotosF)();
    const fakeAPI = {
      response: {
        result: void 0,
        total: 0,
        total_pages: 0,
      },
      error: void 0,
      attr: {
        last: void 0,
        next: void 0,
      },
    };
    it('ready to take SEACH_PHOTOS action', () => {
      expect(data.gen.next().value).toEqual(take(SEARCH_PHOTOS));
    });

    it('run action and then jobsStats(true)', () => {
      expect(data.gen.next(searchInPhotos('/search&q=iran')).value).toEqual(
        put(jobStatus(true))
      );
    });

    it('after that call API', () => {
      expect(data.gen.next().value).toEqual(call(getReq, '/search&q=iran'));
    });

    it('pass fakeAPI and then jobStats(false) should run', () => {
      expect(data.gen.next(fakeAPI).value).toEqual(put(jobStatus(false)));
    });

    it('after that all actions like setItems() and setItemsAttr() should run', () => {
      expect(data.gen.next().value).toEqual(
        all([
          put(setItems('photos', fakeAPI.response.result)),
          put(
            setItemsAttr('photos', {
              last: fakeAPI.attr.last,
              next: fakeAPI.attr.next,
              total: fakeAPI.response.total,
              total_pages: fakeAPI.response.total_pages,
            })
          ),
        ])
      );
    });
  });

  describe('get photo flow', () => {
    const data = {};
    data.gen = cloneableGenerator(getPhotoF)();
    const fakeAPI = {
      response: {},
      error: void 0,
    };
    it('ready to take GE_PHOTO action ', () => {
      expect(data.gen.next().value).toEqual(take(GE_PHOTO));
    });

    it('run getPhoto action then jobStatus(true) should run', () => {
      expect(data.gen.next(getPhoto('123')).value).toEqual(
        put(jobStatus(true))
      );
    });

    it('should call getPhotoAPI', () => {
      expect(data.gen.next().value).toEqual(call(getPhotoAPI, '123'));
    });

    it('pass fakeAPI and then jobStatus(false) should run', () => {
      expect(data.gen.next(fakeAPI).value).toEqual(put(jobStatus(false)));
    });

    it('setItem() action should run', () => {
      expect(data.gen.next().value).toEqual(
        put(setItem('photos', fakeAPI.response))
      );
    });
  });
});
