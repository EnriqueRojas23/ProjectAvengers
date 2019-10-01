import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';


@Component({
  selector: 'app-cellRendererProductos',
  templateUrl: './cellRendererProductos.component.html',
  styles: [
    `.btn {
        line-height: 0
    }`
  ]
})
export class CellRendererProductos implements ICellRendererAngularComp  {

  public params: any;

  agInit(params: any): void {
      this.params = params;
  }

  public invokeParentMethod() {
      this.params.context.componentParent.ShowSitesLinkFromParent(`${this.params.node.rowIndex}`);
  }

  refresh(): boolean {
      return false;
  }

}
