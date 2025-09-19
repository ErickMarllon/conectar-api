import { ITenantAddressRepository } from '@/domain/contracts/pgsql/repositories';
import { NotFoundException } from '@nestjs/common';

export type DeleteTenantAddressUseCase = (input: string) => Promise<void>;

export type DeleteTenantAddressUseCaseFactory = (
  tenantAddressRepo: ITenantAddressRepository,
) => DeleteTenantAddressUseCase;

export const createDeleteTenantAddressUseCase: DeleteTenantAddressUseCaseFactory =
  (tenantAddressRepo) => async (id) => {
    const address = await tenantAddressRepo.findOneBy({ id });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return await tenantAddressRepo.delete(address.id);
  };
