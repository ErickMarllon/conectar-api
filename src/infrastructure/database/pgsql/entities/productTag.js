// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { PgsqlProduct } from './product.entity';

// @Entity('product_tag')
// export class PgsqlProductTag {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ unique: true })
//   name: string;

//   @OneToMany(() => PgsqlProduct, (product) => product.category)
//   product: PgsqlProduct[];

//   @Column({
//     name: 'created_at',
//     type: 'timestamptz',
//     default: () => 'CURRENT_TIMESTAMP',
//     nullable: false,
//   })
//   created_at: Date;

//   @Column({
//     name: 'updated_at',
//     type: 'timestamptz',
//     default: () => 'CURRENT_TIMESTAMP',
//     nullable: false,
//   })
//   updated_at: Date;
// }
