/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import {client} from 'camelot-unchained';

export interface PerfHudFPSProps {
}

export interface PerfHudFPSState {
  fps: string;
}

class PerfHudFPS extends React.Component<PerfHudFPSProps, PerfHudFPSState> {

  private pollInterval: number = 10;
  private parser: DOMParser;

  constructor(props: any) {
    super(props);
    this.parser = new DOMParser();
    this.state = {
      fps: this.parseFps()
    };
    setInterval(this.tick.bind(this), this.pollInterval);
  }

  tick() {
    this.state = {
      fps: this.parseFps()
    };
    this.setState(this.state);
  }

  parseFps(): string {
    try {
      const perfhudDOM = this.parser.parseFromString(client.perfHUD, 'text/html').getElementsByTagName('body')[0];
      const fps: string = perfhudDOM.lastChild.firstChild.textContent.replace(' fps', '');
      return fps;
    } catch(e) {
      return client.fps.toFixed(0);
    }
  }

  render() {
    return (
      <h1 className="perfhud-fps cu-font-merriweather-sans"><span>{this.state.fps}</span>{' '}<small>fps</small></h1>
    );
  }
}

export default PerfHudFPS;
