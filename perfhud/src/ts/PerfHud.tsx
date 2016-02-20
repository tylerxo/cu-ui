/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {client, events} from 'camelot-unchained';
import * as React from 'react';

import PageSelect, {PageView} from './PageSelect';

export interface PerfPage extends PageView {
  id: number;
  shouldRemove?: boolean;
  name?: string;
  html?: string;
}

export interface PerfHudProps {};
export interface PerfHudState {
  pages: Array<PerfPage>;
  minimized: boolean;
  currentPage: PerfPage;
};

declare const cuAPI: any;

class PerfHud extends React.Component<PerfHudProps, PerfHudState> {
  public name: string = 'perfhud';
  
  constructor(props: PerfHudProps) {
    super(props);
    this.state = {
      pages: [],
      minimized: false,
      currentPage: null
    };
  }
  
  componentDidMount() {
    cuAPI.OnPerfUpdate(() => {
      this.updatePages();
    });
  }
  
  minMaxWindow = () => {
    console.log('minmax');
    this.setState({
      pages: this.state.pages,
      minimized: !this.state.minimized,
      currentPage: null
    });
  }
  
  updatePages = () => {
    let updates = JSON.parse(client.perfHUD);
    let pages = this.state.pages.filter((t: PerfPage) => updates.filter((ut: PerfPage) => ut.id == t.id) == []).concat(updates) as Array<PerfPage>;
    
    // is our current still here?
    let current: any = null;
    if (this.state.currentPage == null) {
      current = pages[0];
    } else {
      current = pages.filter((p: PerfPage) => p.id == this.state.currentPage.id)[0];
      if (typeof current == 'undefined') {
        current = pages[0];
      }
    }
    
    this.setState({
      pages: pages,
      minimized: this.state.minimized,
      currentPage: current
    });
  }
  
  onSelectedPageChanged = (page: PerfPage) => {
    this.setState({
      pages: this.state.pages,
      minimized: this.state.minimized,
      currentPage: page
    });
  }
  
  selectChanged = (evt: any) => {
    let current = this.state.pages.filter((p: PerfPage) => p.id == parseInt(evt.target.value, 10))[0];
      if (typeof current == 'undefined') {
        current = this.state.pages[0];
      }
    this.setState({
      pages: this.state.pages,
      minimized: this.state.minimized,
      currentPage: current
    });
  }
  
  render() {
    
    if (this.state.pages.length == 0) {
      return (
        <div id={this.name} className={`${this.name} cu-window cu-window-transparent cu-window-auto-size`}>
        <div className='cu-window-content'>
          <p>No pages provided to PerfHud</p>
        </div>
      </div>
      )
    }
    
    return (
      <div className={`${this.name} cu-window cu-window-transparent cu-window-auto-size`}>
        <div className='cu-window-content'>
          <p>
            <select onChange={this.selectChanged} value={this.state.currentPage.id + ''}>
              {this.state.pages.map((page, index) => <option value={page.id + ''} key={index}>{page.name}</option>)}
            </select>
          </p>
          <div className='html-content' dangerouslySetInnerHTML={{__html: this.state.currentPage.html}} />
        </div>
      </div>
    );
  }
}

export default PerfHud;
