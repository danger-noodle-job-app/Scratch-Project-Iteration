import noteReducer, { syncData } from '../reducers/noteReducer.js';
import { store } from '../store.js'

// Test the reducer
describe('noteReducer', () => {
    it('syncData should provide updated state', () => {
      const initialState = {
        Interested: [],
        Applied: [],
        Interviewed: [],
        FollowedUp: [],
        Accepted: [],
        Rejected: [],
      };
  
      const action = {
        type: 'note/syncData',
        payload: {
          Interested: ['hello word'],
          Applied: [],
          Interviewed: [],
          FollowedUp: [],
          Accepted: [],
          Rejected: [],
        },
      };
  
      const nextState = noteReducer(initialState, action);
  
      expect(nextState).toEqual({
        Interested: ['hello word'],
        Applied: [],
        Interviewed: [],
        FollowedUp: [],
        Accepted: [],
        Rejected: [],
      });
    });
  });

  describe('syncData action creator', () => {
    it('should create an action to sync data', () => {
      const data = {
        Interested: [],
        Applied: ['hello world'],
        Interviewed: [],
        FollowedUp: [],
        Accepted: [],
        Rejected: [],
      };
  
      const expectedAction = {
        type: 'note/syncData',
        payload: data,
      };
  
      expect(syncData(data)).toEqual(expectedAction);
    });
  });