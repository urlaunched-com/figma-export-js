export interface IColor {
  r: number
  g: number
  b: number
  a: number
}

interface IFill {
  blendMode: string
  type: string
  color: IColor
  gradientStops: any
}

interface IDocument {
  id: string
  name: string
  type: string
  scrollBehavior: string
  blendMode: string
  absoluteBoundingBox: { x: number, y: number, width: number, height: number },
  absoluteRenderBounds: { x: number, y: number, width: number, height: number },
  constraints: { vertical: string, horizontal: string },
  fills: IFill[]
  strokes: [],
  strokeWeight: 1,
  strokeAlign: string,
  exportSettings: [],
  effects: []
  style: any
}

export interface INodes {
  [key: string]: {
    "document": IDocument,
    "components": any
    "componentSets": any
    "schemaVersion": 0,
    "styles": any
  }
}


export interface INodeResponse {
  "name": String,
  "role": String,
  "lastModified": String,
  "editorType": String,
  "thumbnailUrl": String,
  "err": String,
  "nodes": INodes
}
