import { PlanInterval } from '@/shared/enums';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PgsqlPlanDetailM, PgsqlPlanM } from '../entities';

const included_features = [
  'Gestão de clientes e agenda',
  'Controle financeiro',
  'Acesso via web e mobile',
];

const plansDetails = [
  {
    tier: 'Enterprise',
    interval: PlanInterval.ANNUALLY,
    price: 318.82,
    billing_period: 'valor sob consulta (anual)',
    cta_label: 'escolher Enterprise Anual',
    included_features,
  },
  {
    tier: 'Enterprise',
    interval: PlanInterval.MONTHLY,
    price: 49.9,
    billing_period: 'valor sob consulta (mensal)',
    cta_label: 'escolher Enterprise Mensal',
    included_features,
  },
  {
    tier: 'Free',
    interval: PlanInterval.ANNUALLY,
    price: 0.0,
    billing_period: 'plano anual com desconto',
    cta_label: 'escolher Free Anual',
    included_features,
  },
  {
    tier: 'Free',
    interval: PlanInterval.MONTHLY,
    price: 0.0,
    billing_period: 'plano mensal – sem desconto',
    cta_label: 'escolher Free Mensal',
    included_features,
  },
  {
    tier: 'Pro',
    interval: PlanInterval.ANNUALLY,
    price: 249.9,
    billing_period: 'plano anual – recursos avançados',
    cta_label: 'escolher Pro Anual',
    included_features,
  },
  {
    tier: 'Pro',
    interval: PlanInterval.MONTHLY,
    price: 39.9,
    billing_period: 'plano mensal – recursos avançados',
    cta_label: 'escolher Pro Mensal',
    included_features,
  },
];

export class CreatePlanDetailSeed1756994743140 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const planRepository = dataSource.getRepository(PgsqlPlanM);
    const planDetailRepository = dataSource.getRepository(PgsqlPlanDetailM);
    const planDetailFactory = factoryManager.get(PgsqlPlanDetailM);

    const plansData = await planRepository.find();

    for (const planDetailData of plansDetails) {
      const { tier, interval, ...detailInfo } = planDetailData;

      // encontra o plano base que combina com tier + interval
      const plan = plansData.find(
        (p) => p.tier === tier && p.interval === interval,
      );

      if (!plan) {
        console.log(`❌ Nenhum plano encontrado para ${tier} (${interval})`);
        continue;
      }

      const exists = await planDetailRepository.findOneBy({
        plan_id: plan.id,
      });

      if (exists) {
        console.log(
          `⚠️ Detalhe já existe: ${plan.name} - ${detailInfo.cta_label}`,
        );
        continue;
      }

      // cria um novo detalhe
      const newDetail = await planDetailFactory.make({
        ...detailInfo,
        plan_id: plan.id,
      });

      await planDetailRepository.save(newDetail);
      console.log(
        `✅ Plan detail criado: ${plan.name} - ${detailInfo.cta_label}`,
      );
    }

    console.log('🌱 Seed de planos finalizado com sucesso!');
  }
}
