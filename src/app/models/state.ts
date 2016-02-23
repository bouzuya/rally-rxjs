import { SignIn } from '../models/sign-in';
import { Spot } from '../models/spot';
import { SpotForm } from '../models/spot-form';
import { StampRally } from '../models/stamp-rally';
import { Token } from '../models/token';

type State = {
  currentPage: string;
  signIn: SignIn;
  spots: Spot[];
  spotForm: SpotForm;
  stampRallies: StampRally[];
  stampRally: StampRally;
  token: Token;
};

export { State };