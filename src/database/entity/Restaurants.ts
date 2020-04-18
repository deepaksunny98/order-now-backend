import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
    name: 'Restaurants',
})
export class Restaurants extends BaseEntity {
    @PrimaryGeneratedColumn()
    RestaurantId: number;

    @Column()
    name: string;

    @Column()
    img: string;

    @Column()
    price: string;

    @Column()
    rating: string;

    @Column()
    variety: string;

    @Column()
    time: number;

    @Column()
    userId: number;
}
