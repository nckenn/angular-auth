export interface TreeItem {
  id: number;
  name: string;
  parent?: number;
  children?: TreeItem[];
  expanded?: boolean;
}
