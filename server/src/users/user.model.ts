import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    type: DataType.CHAR(30),
    allowNull: false,
  })
  public fullName: string;

  @Column({
    type: DataType.CHAR(100),
    allowNull: false,
    validate: {
      isEmail: true,
      isUnique: async (value: string, next: any): Promise<any> => {
        const isExist = await User.findOne({ where: { email: value } });
        if (isExist) {
          next('Email already in use!');
        }
        next();
      },
    },
  })
  public email: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  public password: string;
}
