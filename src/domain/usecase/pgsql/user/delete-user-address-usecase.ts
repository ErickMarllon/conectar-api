import { IAddressRepository } from '@/domain/contracts/pgsql/repositories';
import { NotFoundException } from '@nestjs/common';

export type DeleteUserAddressUseCase = (input: string) => Promise<void>;

export type DeleteUserAddressUseCaseFactory = (
  addressRepo: IAddressRepository,
) => DeleteUserAddressUseCase;

export const createDeleteUserAddressUseCase: DeleteUserAddressUseCaseFactory =
  (addressRepo) => async (id) => {
    if (!id) {
      throw new NotFoundException('Address not found');
    }
    const address = await addressRepo.findOneBy({ id });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return await addressRepo.delete(address.id);
  };
