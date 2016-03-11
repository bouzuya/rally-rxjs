import { h, VTree } from '../../framework/view';

import { State } from '../property-types/state';
import { view as mapView } from '../view/map-view';
import { view as spotFormView } from '../view/spot-form-view';

const view = (state: State, helpers: any): VTree => {
  const { e } = helpers;
  const map = {
    markers: state.spots.map(spot => {
      const { lat, lng, id } = spot;
      return {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        id: parseInt(id, 10)
      };
    })
  };

  return h('div.stamp-rally-show-page', [
    (
      state.stampRally
        ? h('h1', [state.stampRally.name])
        : h('h1', ['loading...'])
    ),
    mapView(map, helpers),
    h('ul', state.spots.map(spot => {
      return h('li', [
        spot.id,
        spot.name,
        spot.tagline
      ]);
    })),
    spotFormView(state.spotForm, helpers)
  ]);
};

export { view };
