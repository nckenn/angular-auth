import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';

import { NgxPermissionsModule } from 'ngx-permissions';
import { TreeViewComponent } from './ui/treeview/treeview.component';
import { TreeItem } from './data-access/tree-item.interface';
import { ApiService } from '../shared/data-access/api/api.service';
import { LocalStorageService } from '../shared/services/storage.service';
import {
  TerritoriesResponse,
  Territory,
} from '../shared/data-access/api/models';
import { Observable, switchMap, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgxPermissionsModule, TreeViewComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  #apiService = inject(ApiService);
  #storageService = inject(LocalStorageService);
  #cdr = inject(ChangeDetectorRef);

  user: any = {};
  countries: TreeItem[] = [];

  countries$ = this.#apiService
    .get<TerritoriesResponse>('/Territories/All')
    .pipe(
      map((countries: TerritoriesResponse) => {
        return this.getNestedTreeData(countries.data);
      })
    );

  ngOnInit(): void {
    this.user = this.#storageService.get('user');
  }

  getNestedTreeData(treeNodes: any[]): TreeItem[] {
    const nestedTree: TreeItem[] = [];
    const nodesMap = new Map<number, TreeItem>();

    treeNodes.forEach((node) =>
      nodesMap.set(node.id, { ...node, children: [] })
    );

    nodesMap.forEach((node) => {
      if (node.parent !== undefined && node.parent !== null) {
        const parent = nodesMap.get(node.parent);
        if (parent) {
          parent.children?.push(node);
        }
      } else {
        nestedTree.push(node);
      }
    });

    return nestedTree;
  }

  toggleTreeItem(item: TreeItem): void {
    item.expanded = !item.expanded;
    this.#cdr.detectChanges();
  }
}
