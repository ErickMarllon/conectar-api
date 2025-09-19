import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PgsqlEventTypeM } from '../entities';

export class CreateEventTypeSeed1757258551551 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const repo = dataSource.getRepository(PgsqlEventTypeM);

    const fixedTypes = [
      {
        code: 'MEETING',
        name: 'Meeting',
        description: 'Scheduled meeting between users or with customers',
      },
      { code: 'CALL', name: 'Call', description: 'Phone or video call' },
      {
        code: 'APPOINTMENT',
        name: 'Appointment',
        description: 'Customer appointment scheduled in the system',
      },
      {
        code: 'REMINDER',
        name: 'Reminder',
        description: 'Notification or reminder about an important activity',
      },
      {
        code: 'TASK',
        name: 'Task',
        description: 'General activity assigned to a user',
      },
    ];

    for (const type of fixedTypes) {
      const exists = await repo.findOne({ where: { code: type.code } });
      if (!exists) {
        await repo.save(repo.create(type));
      }
    }

    // gera alguns extras fake
    const factory = factoryManager.get(PgsqlEventTypeM);
    await factory.saveMany(5);
  }
}
