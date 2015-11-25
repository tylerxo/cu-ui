/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/// <reference path="../tsd/tsd.d.ts" />

import * as cu from 'cu-core';
import events from 'cu-events';
import * as React from 'react/addons';

declare const cuAPI: any;

class ErrorMessage extends React.Component<any, any> {

  render() {
       
    var commentNodes = this.props.messageList.map(function (comment: string, index: number) {
      return (
        <li className='message' key={index}>{comment}</li>
      );
    });

    return (
      <ul id='messages'>
        {commentNodes}
      </ul>
    );
  }
}

/* 
*  Trying to set the state as a Array<string> was throwing errors so I
*  wrapped the array in a class (like the KOS example) and it worked.
*  Not sure why but I'll go with this for now
*/
class ErrorMessagesAppState {
  public items: Array<string>;

  constructor() {
    this.items = new Array<string>();
  }
}

class ErrorMessagesApp extends React.Component<any, ErrorMessagesAppState> {

  constructor(props: any) {
    super(props);

    this.state = new ErrorMessagesAppState();

    this.init = this.init.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    events.on('init', this.init);
  }

  init() {
    //todo: event-ize OnAbilityError
    cuAPI.OnAbilityError((message: any) => {
            
      const newErrorMessage = this.getMessageText(parseInt(message));

      if (!newErrorMessage) {
        return;
      }

      //add the new error to the top of the array
      var nextItems = new Array<string>(newErrorMessage).concat(this.state.items);
      this.setState({ items: nextItems });

      setTimeout(this.removeMessage, 3000);
    });
  }

  removeMessage() {

    //remove the bottom item from the array
    if (0 == this.state.items.length) {
      return;
    }

    var nextItems = this.state.items;
    var startIndex = nextItems.length - 1;
    nextItems.splice(startIndex, 1);
    this.setState({ items: nextItems });
  }

  getMessageText(mId: number): string {
    switch (mId) {
      case 1: return 'Your target is out of range.';
      case 2: return 'Your target is invalid.';
      case 3: return 'Your target is not in line of sight.';
      case 4: return 'That ability is still on cooldown.';
      case 5: return 'You don\'t have a target.';
      case 6: return 'You were interrupted!';
      case 7: return 'You do not have enough stamina.';
      case 8: return 'You aren\'t in the right stance.';
      default: return '';
    }
  }

  render() {
    return (
      <ErrorMessage messageList={this.state.items}/>
    );
  }
}

React.render(<ErrorMessagesApp />, document.getElementById('content'));
