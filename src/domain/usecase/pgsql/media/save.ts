import { IAwsService, UploadInput } from '@/domain/contracts/gateways/awss3';
import { IMediaRepository } from '@/domain/contracts/pgsql/repositories';
import { PgsqlMediaM } from '@/infrastructure/database/pgsql';

type Setup = (
  mediaRepo: IMediaRepository,
  awsS3Service: IAwsService,
) => MediaSave;
type Input = {
  original_file_name: string;
  path: string;
  mediable_id: string;
  mediable_type: string;
  is_main?: boolean;
  image: UploadInput;
};
type Output = PgsqlMediaM;

export type MediaSave = (input: Input) => Promise<Output>;

export const setupMediaSave: Setup =
  (mediaRepo, awsS3Service) => async (input) => {
    const { image, ...media } = input;
    await awsS3Service.upload(image);
    return mediaRepo.create(media);
  };
