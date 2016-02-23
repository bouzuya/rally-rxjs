import { SignIn } from '../models/sign-in';
import { Spot } from '../models/spot';
import { StampRally } from '../models/stamp-rally';
import { Token } from '../models/token';

type State = {
  currentPage: string;
  signIn: SignIn;
  spots: Spot[];
  stampRallies: StampRally[];
  stampRally: StampRally;
  token: Token;
};

export { State };