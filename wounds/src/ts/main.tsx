/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/// <reference path="../tsd/tsd.d.ts" />

import * as React from 'react';
import {Player, events, stores} from 'camelot-unchained';
import { Doll } from './components/Doll';
import { Stats } from './components/Stats';
import { Buffs } from './components/Buffs';
import { WoundColors } from './classes/WoundColors';

const character : any = stores.CharacterStore.create();

class WoundsUIState { 
  public character: any;
  constructor() {
    this.character = null;
  }
}
class WoundsUIProps { }

class WoundsUI extends React.Component<WoundsUIProps, WoundsUIState> {
  private colors: WoundColors = new WoundColors();
  constructor(props: WoundsUIProps) {
    super(props);
    character.store.listen(this.oncharacter.bind(this));
  }
  componentWillMount() {
    this.oncharacter(character.store.info);
  }
  oncharacter(character:Player) {
    this.setState({ character: character });
  }
  render() {
    const character = this.state.character;
    return (
      <div>
        <Doll injuries={character.injuries} colors={this.colors}/>
        <Buffs type="boon"/>
        <Buffs type="bane"/>
        <Stats
          blood={character.health} bloodMax={character.maxHealth}
          stamina={character.stamina} staminaMax={character.maxStamina}
          panic={15} panicMax={55}
          temp={72} tempMax={96}
          />
      </div>
    );
  }
}

events.on('init', () => {
  character.actions.start();
  React.render(<WoundsUI/>, document.getElementById("cse-ui-wounds"));
});
