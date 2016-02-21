import { State } from '../models/state';

export default function initializer(): Promise<State> {
  return Promise.resolve({
    currentPage: 'stamp-rally-list',
    signIn: {
      email: null,
      password: null
    },
    stampRallies: [],
    token: {
      token: null,
      userId: null
    }
  });
};
