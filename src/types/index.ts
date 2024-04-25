export interface PexelsImage {
  id: number;
  src: {
    medium: string;
  };
  photographer: string;
}

export interface PexelsResponse {
  photos: PexelsImage[];
}
