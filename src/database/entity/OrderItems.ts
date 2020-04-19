import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity({
    name: 'OrderItems',
})
export class OrderItems extends BaseEntity {
    @PrimaryGeneratedColumn()
    OrderItemsId: number;

    @Column()
    OrderId: string;

    @Column()
    MenuId: number;

    @Column()
    Name: string;

    @Column()
    Quantity: number;

    @Column()
    Amount: number;

}
