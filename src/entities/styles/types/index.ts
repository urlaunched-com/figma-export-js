import { STYLE_TYPE } from "../../../types";

export interface IStyle {
  "key": String,
  "file_key": String,
  "node_id": String,
  "style_type": STYLE_TYPE,
  "thumbnail_url": String,
  "name": String,
  "description": String,
  "updated_at": String,
  "created_at": String,
  "sort_position": String,
  "user": any,
}


export interface IStylesResponse {
  "status": Number,
  "error": Boolean,
  "meta": {
    "styles": IStyle[]
  },
}
