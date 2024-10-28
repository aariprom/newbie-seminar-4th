import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/db.config';

class Calc extends Model {
  public id!: number;
  public lhs!: number;
  public op!: string;
  public rhs!: number;
  public result!: number;
  public memo: string | undefined;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Calc.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    lhs: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    op: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rhs: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    result: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    memo: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'calcs',
    timestamps: true,
  }
);

export default Calc;