import { State } from '../property-types/state';

export default function initializer(_: any): Promise<State> {
  // `Promise.reject` is type error
  return new Promise((_, reject) => {
    const error: any = new Error('redirect');
    error.status = 302;
    error.path = '/sign_in';
    reject(error);
  });
};
