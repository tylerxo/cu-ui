/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import {client, events, Inventory, Item, gearSlot} from 'camelot-unchained';
import ClassNames from 'classnames';
import {ItemGroup} from './item-group';
// import Tooltip from 'rc-tooltip';

export class InventoryWindow extends React.Component<InventoryWindowProps, InventoryWindowState> {
  private listener: any;

  constructor(props: any) {
    super(props);
    this.state = {
      inventory: new Inventory(),
      itemGroups: []
    };
  }

  componentWillMount() {
    this.listener = events.on(events.handlesInventory.topic, (inventory: Inventory) => {
      this.setState({
        inventory: inventory,
        itemGroups: ItemGroup.buildItemGroups(inventory)
      });
    });
  }

  componentWillUnmount() {
    if (this.listener) {
      events.off(this.listener);
      this.listener = null;
    }
  }

  closeWindow(): void {
    client.HideUI('inventory');
  }

  useItem(group: ItemGroup): void {
    if (group.item.gearSlot != 0) {
      client.EquipItem(group.getFirstItemID());
    }
  }

  dropItem(group: ItemGroup): void {
    client.DropItem(group.getFirstItemID());
  }

  render() {
    const itemGroups: JSX.Element[] = [];
    this.state.itemGroups.forEach((group: ItemGroup, index: number) => {
      console.log(group);
      itemGroups.push((
          <li className="inventory-item" key={'item-group' + index} onDoubleClick={this.useItem.bind(this, group) } onContextMenu={this.dropItem.bind(this, group )}>
            <div className="quantity">{group.quantity}</div>
            <div className="icon"><img src="../../interface-lib/camelot-unchained/images/items/icon.png" /></div>
            <div className="name">{group.item.name}</div>
            <div className="tooltip">
              <table className="cu-table tooltip__content">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{group.item.name}</td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>{group.item.description}</td>
                  </tr>
                  <tr>
                    <th>Gear Slot</th>
                    <td>{this.getGearSlotName(group.item.gearSlot)} ({group.item.gearSlot})</td>
                  </tr>
                  <tr>
                    <th>Item ID</th>
                    <td className="font-monospace font-small">{group.item.id}</td>
                  </tr>
                  <tr>
                    <th>Resource ID</th>
                    <td className="font-monospace">{group.item.resourceID}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
      ));
    });
    return (
      <div className="cu-window">
        <div className="cu-window-header cu-window-bg-brown">
          <div className="cu-window-title">Inventory</div>
          <div className="cu-window-actions">
            <a onMouseDown={this.closeWindow.bind(this)} className="cu-window-close"></a>
          </div>
        </div>
        <div className="cu-window-content">
          <ul className="inventory-list inventory-list--vertical">
            {itemGroups}
          </ul>
        </div>
      </div>
    );
  }

  // renderTooltip(item: Item) {
  //   return (
  //     <table className="cu-table tooltip-content">
  //       <tbody>
  //         <tr>
  //           <th>Name</th>
  //           <td>{item.name}</td>
  //         </tr>
  //         <tr>
  //           <th>Description</th>
  //           <td>{item.description}</td>
  //         </tr>
  //         <tr>
  //           <th>Gear Slot</th>
  //           <td>{this.getGearSlotName(item.gearSlot)} ({item.gearSlot})</td>
  //         </tr>
  //         <tr>
  //           <th>Item ID</th>
  //           <td className="font-monospace font-small">{item.id}</td>
  //         </tr>
  //         <tr>
  //           <th>Resource ID</th>
  //           <td className="font-monospace">{item.resourceID}</td>
  //         </tr>
  //       </tbody>
  //     </table>
  //   );
  // }

  getGearSlotName(slot: gearSlot): string {
    switch (slot) {
      case gearSlot.NONE:
        return 'None';
      case gearSlot.CHEST:
        return 'Chest';
      case gearSlot.LEFT_HAND:
        return 'Left Hand';
      case gearSlot.RIGHT_HAND:
        return 'Right Hand';
      case gearSlot.TWO_HANDED:
        return 'Two-Handed';
      case gearSlot.PANTS:
        return 'Pants';
      case gearSlot.BOOTS:
        return 'Boots';
      case gearSlot.LEFT_GLOVE:
        return 'Left Glove';
      case gearSlot.RIGHT_GLOVE:
        return 'Right Glove';
      case gearSlot.HELMET:
        return 'Helmet';
      case gearSlot.BELT:
        return 'Belt';
      case gearSlot.SKIRT:
        return 'Skirt';
      case gearSlot.TABARD:
        return 'Tabard';
      case gearSlot.CAPE:
        return 'Cape';
      default:
        return 'None';
    }
  }
}

export interface InventoryWindowProps {
}

export interface InventoryWindowState {
  inventory: Inventory;
  itemGroups: ItemGroup[];
}
