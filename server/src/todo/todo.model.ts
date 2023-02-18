import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/user.model';

@Table
export class Todo extends Model {
  @Column
  title: string;

  @Column
  isCompleted: boolean;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
