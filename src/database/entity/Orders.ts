import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'Orders',
})
export class Orders extends BaseEntity {

  @PrimaryColumn()
  OrderId: string;

  @Column()
  UserId: number;

  @Column()
  RestaurantId: number;

  @Column()
  TableId: number;

  @Column()
  Amount: number;

  @Column()
  OrderDateTime: Date;

  @Column()
  Name: string;

  @Column()
  PhoneNumber: string;

}
