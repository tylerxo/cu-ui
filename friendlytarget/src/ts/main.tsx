/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

 /// <reference path="../tsd/tsd.d.ts" />
import * as React from 'react';
import * as Reflux from 'reflux';
import {events, stores, components} from 'camelot-unchained';

const friendlyTarget : any = stores.FriendlyTargetStore.create();

const FriendlyTarget = React.createClass({

  // Hook store up to component.  Each time FriendlyTarget data is changed,
  // our state is updated, triggering a render
  mixins: [
    Reflux.connect(friendlyTarget.store, 'friendlyTarget')
  ],

  // Provide an initial state (TODO: is there a better way to do this?)
  getInitialState: function() {
    return { friendlyTarget: friendlyTarget.store.info };
  },

  componentDidMount() {
    // Start listening for FriendlyTarget events
    // FIXME: broken, currently no-op
    friendlyTarget.actions.start();
  },

  // Render the unit frame using FriendlyTarget data
  render: function() {
    var state = this.state, friendlyTarget = state.friendlyTarget;
    return (<components.UnitFrame
        name={friendlyTarget.name} race={friendlyTarget.race}
        health={friendlyTarget.health} maxHealth={friendlyTarget.maxHealth}
        stamina={friendlyTarget.stamina} maxStamina={friendlyTarget.maxStamina}
        injuries={friendlyTarget.injuries}
        />
      );
  }
});

events.on("init", function() {
  friendlyTarget.actions.start();     // HACK for cuAPI bug
  React.render(<FriendlyTarget/>, document.getElementById("cse-ui-friendlytarget"));
});
