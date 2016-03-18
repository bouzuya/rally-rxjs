import { SignIn } from '../property-type/sign-in';
import { Spot } from '../property-type/spot';
import { SpotForm } from '../property-type/spot-form';
import { StampRally } from '../property-type/stamp-rally';
import { StampRallyForm } from '../property-type/stamp-rally-form';
import { Token } from '../property-type/token';

type State = {
  googleApiKey: string;
  currentPage: string;
  signIn: SignIn;
  spots: Spot[];
  spotForm: SpotForm;
  stampRallies: StampRally[];
  stampRally: StampRally;
  stampRallyForm: StampRallyForm;
  token: Token;
};

export { State };
