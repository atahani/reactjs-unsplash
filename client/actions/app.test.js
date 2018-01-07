import {clearStore, jobStatus, setActionData, setLastPathName} from './app';

describe('app actions', () => {
  describe('clearStore', () => {
    it('should have a type of "CL_STORE"', () => {
      expect(clearStore().type).toEqual('app/CL_STORE');
    });
  });
  describe('jobStatus', () => {
    it('should have a type of "CH_JOB_ST"', () => {
      expect(jobStatus().type).toEqual('app/CH_JOB_ST');
    });
    it('should have status payload', () => {
      expect(jobStatus(true).status).toEqual(true);
    });
  });
  describe('setActionData', () => {
    it('should have a type of "SE_ACTION_DATA"', () => {
      expect(setActionData().type).toEqual('app/SE_ACTION_DATA');
    });
    it('should have actionType payload', () => {
      const actionType = 'ge_collection';
      expect(setActionData(actionType).actionType).toEqual(actionType);
      expect(setActionData(actionType).actionType)
        .not
        .toBeNull();
    });
    it('should have data payload, can be any type', () => {
      const collection = {
        id: '123',
        name: 'Nice'
      };
      expect(setActionData('ge_collection', collection).data).toMatchObject(collection);
    });
  });
  describe('setLastPathName', () => {
    it('it should have a type of "SE_LAST_PATH_NAME"', () => {
      expect(setLastPathName('/').type).toEqual('app/SE_LAST_PATH_NAME');
    });
    it('it should have pathName', () => {
      expect(setLastPathName('/auth').pathName).toEqual('/auth');
    });
  });
});