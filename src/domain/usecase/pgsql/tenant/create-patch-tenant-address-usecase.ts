import { Payload } from '@/domain/contracts/auth/jwt';
import {
  ITenantAddressRepository,
  ITenantRepository,
} from '@/domain/contracts/pgsql/repositories';
import { UpdateAddressDto } from '@/infrastructure/http/dtos/address/update-address-data.dto';

import { plainToInstance } from 'class-transformer';

export type PathTenantAddressUseCase = (input: {
  tenant_id: string;
  address: UpdateAddressDto;
  currentUser: Payload['sub'];
}) => Promise<UpdateAddressDto | undefined>;

export type UpdateUserAddressUseCaseFactory = (
  addressRepo: ITenantAddressRepository,
  tenantRepo: ITenantRepository,
) => PathTenantAddressUseCase;

export const createPatchTenantAddressUseCase: UpdateUserAddressUseCaseFactory =
  (addressRepo, tenantRepo) => async (input) => {
    const tenant = await tenantRepo.findOneByWithRelation({
      where: {
        id: input.tenant_id,
      },
      relations: ['addresses'],
    });

    if (!tenant) {
      throw new Error('tenant not found');
    }

    const address = input.address?.id
      ? await addressRepo.update(input.address.id, input.address)
      : await addressRepo.create({
          tenant_id: tenant.id,
          ...input.address,
          is_default: true,
        });

    if (input?.address?.is_default) {
      const addressesDefault = tenant.addresses.filter(
        (a) => a.is_default === true && a.id !== address.id,
      );

      if (addressesDefault) {
        for (const a of addressesDefault) {
          await addressRepo.update(a.id, {
            is_default: false,
          });
        }
      }
    }

    return plainToInstance(UpdateAddressDto, address, {
      excludeExtraneousValues: true,
    });
  };
