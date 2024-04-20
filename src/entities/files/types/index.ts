export interface  IImage {
  [key: string]: string;
}

export interface IImagesResponse {
  err: string;
  images: IImage
}
