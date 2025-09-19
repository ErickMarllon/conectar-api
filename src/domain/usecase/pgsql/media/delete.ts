import { IAwsService } from '@/domain/contracts/gateways/awss3';
import { IMediaRepository } from '@/domain/contracts/pgsql/repositories';

type Setup = (
  mediaRepo: IMediaRepository,
  awsS3Service: IAwsService,
) => MediaDelete;
type Input = {
  id: string;
};

export type MediaDelete = (input: Input) => Promise<void>;

export const setupMediaDelete: Setup =
  (mediaRepo, awsS3Service) => async (input) => {
    const media = await mediaRepo.findOneBy(input);
    if (media) {
      await awsS3Service.delete(media.path);
      await mediaRepo.delete(media.id);
    }
  };
