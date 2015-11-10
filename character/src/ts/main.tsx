// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Character Unit Frame

/// <reference path="../tsd/tsd.d.ts" />
import * as React from 'react';
import * as Reflux from 'reflux';
import events from 'cu-events';
import { CharacterStore } from 'cu-stores';
import { UnitFrame } from 'cu-components';

const character: any = CharacterStore.create();

const Character = React.createClass({

  // Hook store up to component.  Each time character data is changed,
  // our state is updated, triggering a render
  mixins: [
    Reflux.connect(character.store, 'character')
  ],

  // Provide an initial state (TODO: is there a better way to do this?)
  getInitialState: function() {
    return { character: character.store.info };
  },

  componentDidMount() {
    // client.exe cuAPI BUG:-
    // We should be able to start events in componentDidMount except for
    // a client bug, that means if the event registrations are triggered
    // too long after the client starts (or not suring oninitialised callback)
    // then registering for the events does not get sent the initial data.
    // This can be seen by doing /closeui character ; /openui character
    // it will not be given the initial character data.  The problem is not
    // seen on initial load of the client because the UI is opened before 
    // the character info is sent anyway.
    character.actions.start();              // no-op due to hack below
  },

  // Render the unit frame using character data
  render: function() {
    const state = this.state, character = state.character;
    return (
      <UnitFrame
        className="character"
        name={character.name} race={character.race}
        health={character.health} maxHealth={character.maxHealth}
        stamina={character.stamina} maxStamina={character.maxStamina} />
    );
  }
});

events.on("init", function() {
  character.actions.start();          // HACK: for cuAPI time limited events issue
  React.render(<Character/>, document.getElementById("cse-ui-character"));
});
