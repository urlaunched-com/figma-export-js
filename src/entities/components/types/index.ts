export interface IComponent {
  key: string;
  file_key: string;
  node_id: string;
  thumbnail_url: string;
  name: string;
  description: string;
  updated_at: string;
  created_at: string;
  user: any;
  containing_frame: any;

}

export interface IComponentsResponse {
  "status": Number,
  "error": Boolean,
  "meta": {
    "components": IComponent[]
  },
}
