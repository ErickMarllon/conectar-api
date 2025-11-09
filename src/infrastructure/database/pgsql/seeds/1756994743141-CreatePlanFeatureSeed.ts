import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PgsqlPlanFeatureM, PgsqlPlanM } from '../entities';

const plansDetails = [
  {
    name: 'FREE',
    features: [
      { feature_text: 'Gestão de clientes e agendamentos', is_available: true },
      { feature_text: 'Controle financeiro completo', is_available: true },
      {
        feature_text: 'Relatórios e gráficos personalizados',
        is_available: true,
      },
      {
        feature_text: 'Automação de mensagens e campanhas',
        is_available: false,
      },
      { feature_text: 'Integração com WhatsApp Business', is_available: false },
      { feature_text: 'Suporte técnico prioritário', is_available: false },
    ],
  },
  {
    name: 'PRO',
    features: [
      { feature_text: 'Gestão de clientes e agendamentos', is_available: true },
      { feature_text: 'Controle financeiro completo', is_available: true },
      { feature_text: 'Integração com WhatsApp Business', is_available: true },
      {
        feature_text: 'Relatórios e gráficos personalizados',
        is_available: true,
      },
      { feature_text: 'Suporte técnico prioritário', is_available: true },
      {
        feature_text: 'Automação de mensagens e campanhas',
        is_available: false,
      },
    ],
  },
  {
    name: 'ENTERPRISE',
    features: [
      { feature_text: 'Todos os recursos do Pro', is_available: true },
      {
        feature_text: 'Assinatura digital e automações complexas',
        is_available: true,
      },
      {
        feature_text: 'Suporte dedicado e SLA empresarial',
        is_available: true,
      },
      {
        feature_text: 'Customização de módulos e branding',
        is_available: true,
      },
    ],
  },
];

export class CreatePlanFeatureSeed1756998011220 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const planRepository = dataSource.getRepository(PgsqlPlanM);
    const featureRepository = dataSource.getRepository(PgsqlPlanFeatureM);
    const featureFactory = factoryManager.get(PgsqlPlanFeatureM);

    const plans = await planRepository.find();

    for (const planDetail of plansDetails) {
      const plan = plans.find((p) => p.name.toUpperCase() === planDetail.name);

      if (!plan) {
        console.log(`❌ Plano não encontrado: ${planDetail.name}`);
        continue;
      }

      for (const feature of planDetail.features) {
        const exists = await featureRepository.findOneBy({
          plan_id: plan.id,
          feature_text: feature.feature_text,
        });

        if (exists) {
          console.log(
            `⚠️ Feature já existe: ${plan.name} - ${feature.feature_text}`,
          );
          continue;
        }

        const newFeature = await featureFactory.make({
          plan_id: plan.id,
          feature_text: feature.feature_text,
          is_available: feature.is_available,
        });

        await featureRepository.save(newFeature);
        console.log(
          `✅ Feature criada: ${plan.name} - ${feature.feature_text}`,
        );
      }
    }

    console.log('🌱 Seed de plan_feature finalizado com sucesso!');
  }
}
