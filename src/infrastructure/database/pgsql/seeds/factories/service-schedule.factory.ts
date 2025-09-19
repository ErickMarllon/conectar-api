import {
  PaymentStatus,
  ServiceScheduleStatus,
  ValueType,
} from '@/shared/enums';
import { setSeederFactory } from 'typeorm-extension';
import { PgsqlServiceScheduleM } from '../../entities/service-schedule.entity';

export const ServiceScheduleFactory = setSeederFactory(
  PgsqlServiceScheduleM,
  async (faker) => {
    const schedule = new PgsqlServiceScheduleM();

    schedule.status = faker.helpers.arrayElement([
      ServiceScheduleStatus.PENDING,
      ServiceScheduleStatus.CONFIRMED,
      ServiceScheduleStatus.CANCELLED,
      ServiceScheduleStatus.COMPLETED,
    ]);

    schedule.total_amount = parseFloat(
      faker.commerce.price({ min: 50, max: 1000 }),
    );

    if (faker.datatype.boolean()) {
      schedule.deposit_type = faker.helpers.arrayElement([
        ValueType.FIXED,
        ValueType.PERCENTAGE,
      ]);
      schedule.deposit_amount =
        schedule.deposit_type === ValueType.PERCENTAGE
          ? Number(
              (
                (schedule.total_amount *
                  faker.number.int({ min: 10, max: 50 })) /
                100
              ).toFixed(2),
            )
          : faker.number.int({ min: 10, max: Number(schedule.total_amount) });
      schedule.deposit_status = faker.helpers.arrayElement([
        PaymentStatus.PENDING,
        PaymentStatus.PAID,
        PaymentStatus.REFUNDED,
      ]);
      if (schedule.deposit_status === PaymentStatus.PAID) {
        schedule.deposit_paid_at = faker.date.recent({ days: 5 });
      }
    }

    schedule.notes = faker.lorem.sentence();
    schedule.scheduled_at = faker.date.soon({ days: 30 });

    schedule.created_at = new Date();
    schedule.updated_at = new Date();

    return schedule;
  },
);
