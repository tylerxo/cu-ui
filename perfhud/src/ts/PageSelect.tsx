/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import {components} from 'camelot-unchained';
let QuickSelect = components.QuickSelect;

export interface PageView {
  id: number,
  name?: string
}

export interface ActivePageViewProps {
  item: PageView;
};
export interface ActivePageViewState {};
class ActivePageView extends React.Component<ActivePageViewProps, ActivePageViewState> {
  render() {
    return (
      <div className='page-select quickselect-active'>
        <h5 className='page-name'>{this.props.item.name}</h5>
      </div>
    );
  }
}

export interface PageListViewProps {
  item: PageView;
};
export interface PageListViewState {};
class PageListView extends React.Component<PageListViewProps, PageListViewState> {
  render() {
    return (
      <div className='page-select quickselect-list'>
        <h6>{this.props.item.name}</h6>
      </div>
    );
  }
}

export interface PageSelectProps 
{
  pages: Array<PageView>;
  onSelectedPageChanged: (page: PageView) => void;
};

export interface PageSelectState {};

class PageSelect extends React.Component<PageSelectProps, PageSelectState> {
  public name: string = 'perfhud-page-select';
  
  onSelectedPageChanged = (page: any) => {
    this.props.onSelectedPageChanged(page);
  }
  
  generateActiveView = (item: any) => {
    return <ActivePageView item={item} />
  }
  
  generateListView = (item: any) => {
    return <PageListView item={item} />
  }
  
  render() {
    return (
      <div className={this.name}>
        <QuickSelect items={this.props.pages} activeViewComponentGenerator={this.generateActiveView}
          listViewComponentGenerator={this.generateListView} onSelectedItemChanged={this.onSelectedPageChanged} />
      </div>
    );
  }
}

export default PageSelect;
