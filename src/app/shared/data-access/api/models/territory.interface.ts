export interface TerritoriesResponse {
  data: Territory[];
}

export interface Territory {
  id?: string;
  name?: string;
  parent?: string;
}
