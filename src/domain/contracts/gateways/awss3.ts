export type UploadInput = {
  key: string;
  buffer: Buffer;
  contentType: string;
};

export type GetBase64ImageOutput = {
  path: string;
  img?: string;
};

export interface IAwsService {
  getImage(path?: string | null): Promise<string | undefined>;
  upload(input: UploadInput): Promise<void>;
  delete(key?: string | null): Promise<void>;
  getBase64Image(path: string): Promise<GetBase64ImageOutput>;
}
