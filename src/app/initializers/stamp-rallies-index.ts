import { State } from '../models/state';

export default function initializer(): Promise<State> {
  return Promise.resolve({
    currentPage: 'stamp-rally-list',
    signIn: {
      email: null,
      password: null
    },
    spots: [],
    stampRallies: [],
    stampRally: null,
    token: {
      token: null,
      userId: null
    }
  });
};
