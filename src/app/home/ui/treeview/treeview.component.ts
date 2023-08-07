import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ContentChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import { TreeItem } from '../../data-access/tree-item.interface';

@Component({
  selector: 'app-tree-view',
  template: `
    <ng-template #treeTemplate let-nodes>
      <ul>
        <li *ngFor="let item of nodes">
          <ng-container
            *ngTemplateOutlet="nodeTemplate; context: { $implicit: item }"
          >
          </ng-container>
          <ng-container
            *ngIf="item.children && item.children.length > 0 && item.expanded"
          >
            <ng-container
              *ngTemplateOutlet="
                treeTemplate;
                context: { $implicit: item.children }
              "
            ></ng-container>
          </ng-container>
        </li>
      </ul>
    </ng-template>

    <ng-container *ngIf="treeData">
      <ng-container
        *ngTemplateOutlet="treeTemplate; context: { $implicit: treeData }"
      ></ng-container>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      :host ul {
        list-style: none;
        padding: 0 15px;
        margin-left: 50px;
      }

      :host ul li {
        margin: 5px 0;
        font-weight: bold;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule],
})
export class TreeViewComponent<T extends TreeItem> {
  @Input()
  public treeData: T[] = [];

  @ContentChild(TemplateRef)
  public nodeTemplate: TemplateRef<any> | null = null;

  ngAfterContentInit(): void {
    if (!this.nodeTemplate) {
      throw new Error('This component needs ng-template for the tree node.');
    }
  }
}
