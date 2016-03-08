import { h, VTree } from '../../framework/view';

import { State } from '../property-types/state';
import renderMapView from '../views/map-view';
import renderSpotFormView from '../views/spot-form-view';

export default function render(state: State, helpers: any): VTree {
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
    renderMapView(map, helpers),
    h('ul', state.spots.map(spot => {
      return h('li', [
        spot.id,
        spot.name,
        spot.tagline
      ]);
    })),
    renderSpotFormView(state.spotForm, helpers)
  ]);
}
