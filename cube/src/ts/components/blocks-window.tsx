// /**
//  * This Source Code Form is subject to the terms of the Mozilla Public
//  * License, v. 2.0. If a copy of the MPL was not distributed with this
//  * file, You can obtain one at http://mozilla.org/MPL/2.0/.
//  */

// import * as React from 'react';
// import {client, events} from 'camelot-unchained';
// import ClassNames from 'classnames';
// import {ItemGroup} from './item-group';

// export class InventoryWindow extends React.Component<BlocksWindowProps, BlocksWindowState> {
//   private listener: any;

//   constructor(props: any) {
//     super(props);
//     this.state = {
//       isCollapsed: false
//       inventory: new Inventory(),
//       itemGroups: []
//     };
//   }

//   componentWillMount() {
//     this.listener = events.on(events.handlesInventory.topic, (inventory: Inventory) => {
//       this.setState({
//         inventory: inventory,
//         itemGroups: ItemGroup.buildItemGroups(inventory)
//       });
//     });
//   }

//   componentWillUnmount() {
//     if (this.listener) {
//       events.off(this.listener);
//       this.listener = null;
//     }
//   }

//   closeWindow(): void {
//     client.HideUI('inventory');
//   }

//   useItem(group: ItemGroup): void {
//     if (group.item.gearSlot != 0) {
//       client.EquipItem(group.getFirstItemID());
//     }
//   }

//   dropItem(group: ItemGroup): void {
//     client.DropItem(group.getFirstItemID());
//   }

//   render() {
//     const itemGroups: JSX.Element[] = [];
//     this.state.itemGroups.forEach((group: ItemGroup, index: number) => {
//       itemGroups.push((
//           <li className="inventory-item" key={'item-group' + index} onDoubleClick={this.useItem.bind(this, group) } onContextMenu={this.dropItem.bind(this, group )}>
//             <div className="quantity">{group.quantity}</div>
//             <div className="icon"><img src="../../interface-lib/camelot-unchained/images/items/icon.png" /></div>
//             <div className="name">{group.item.name}</div>
//             <div className="tooltip">
//               <h1 className="tooltip__title">{group.item.name}</h1>
//               <p className="tooltip__detail tooltip__slot">{this.getGearSlotName(group.item.gearSlot)}</p>
//               <p className="tooltip__detail tooltip__description">{group.item.description}</p>
//               <p className="tooltip__meta">Resource ID: {group.item.id}</p>
//             </div>
//           </li>
//       ));
//     });

//     return (
//       <div className="cu-window">
//         <div className="cu-window-header">
//           <div className="cu-window-title">Blocks</div>
//           <div className="cu-window-actions">
//             <a onMouseDown={this.closeWindow.bind(this)} className="cu-window-close"></a>
//           </div>
//         </div>
//         <div className="cu-window-content">
//           <ul className="inventory-list inventory-list--vertical">
//           </ul>
//         </div>
//       </div>
//     );
//   }
// }

// export interface BlocksWindowProps {
// }

// export interface BlocksWindowState {
//   inventory: Inventory;
//   itemGroups: ItemGroup[];
// }
