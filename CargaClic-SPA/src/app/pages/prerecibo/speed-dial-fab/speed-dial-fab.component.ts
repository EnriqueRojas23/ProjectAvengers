import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';


export interface FabButton {
  icon: string,
  tooltip: string
}

export enum SpeedDialFabPosition {
    Top = 'top',
    Bottom = 'bottom',
    Left = 'left',
    Right = 'right'
}


@Component({
  selector: 'app-speed-dial-fab',
  templateUrl: './speed-dial-fab.component.html',
  styleUrls: ['./speed-dial-fab.component.scss'],
  animations: speedDialFabAnimations
})
export class SpeedDialFabComponent implements OnInit {

  @Input() options;
  @Input("reverse-column-direction") reverseColumnDirection: boolean = false;
  @Output('fabClick') fabClick = new EventEmitter();
  buttons = [];
  fabTogglerState = 'inactive';

  constructor() { }

  ngOnInit() {
    const maxButtons = 6;
    if (this.options.buttons.length > maxButtons) {
      this.options.buttons.splice(5, this.options.buttons.length - maxButtons);
    }
    this.showItems();
  }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.options.buttons;
  }

  hideItems() {
   this.fabTogglerState = 'inactive';
   this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }
  public onClickFab(btn: {icon: string}) {
    this.hideItems();
    this.fabClick.emit(btn);
  }
}
