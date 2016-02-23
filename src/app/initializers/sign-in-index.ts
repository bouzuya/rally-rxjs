import { State } from '../models/state';

export default function initializer(): Promise<State> {
  return Promise.resolve({
    currentPage: 'sign-in',
    signIn: {
      email: null,
      password: null
    },
    spots: [],
    spotForm: null,
    stampRallies: [],
    stampRally: null,
    token: {
      token: null,
      userId: null
    }
  });
};
