import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'Orders',
})
export class Orders extends BaseEntity {

  @PrimaryGeneratedColumn()
  OrderId: number;

  @Column()
  UserId: number;

  @Column()
  RestaurantId: number;

  @Column()
  TableId: number;

  @Column()
  MenuId: string;

  @Column()
  Amount: string;

  @Column()
  OrderDateTime: Date;

}
