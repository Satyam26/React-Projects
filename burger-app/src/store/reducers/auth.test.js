import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('testing auth reducer ', () => {
  it('it should return default state initial', () => {
    expect(reducer(undefined, {})).toEqual({
      error: null,
      loading: null,
      userId: null,
      token: null,
      authRedirectPath: "/"
    });
  });

  it('it should return userId and tokenId', () => {
    expect(reducer({
      error: null,
      loading: null,
      userId: null,
      token: null,
      authRedirectPath: "/"
    }, {
      type: actionTypes.AUTH_SUCCESS,
      userId: 'userid',
      token: 'tokenid',
    })).toEqual({
      error: null,
      loading: false,
      userId: 'userid',
      token: 'tokenid',
      authRedirectPath: "/"
    });
  });

  it('it should return auth start', () => {
    expect(reducer({
      error: null,
      loading: null,
      userId: null,
      token: null,
      authRedirectPath: "/"
    }, {
      type: actionTypes.AUTH_START,
      error: null,
      loading: true
    })).toEqual({
      error: null,
      loading: true,
      userId: null,
      token: null,
      authRedirectPath: "/"
    });
  });


});