import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'Users',
})
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  UserId: number;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column()
  Mobile: string;

  @Column()
  Type: string;

  @Column()
  Password: string;

  @Column()
  Email: string;

}
