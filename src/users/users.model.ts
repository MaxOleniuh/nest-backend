import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({
  tableName: "users",
})
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare banned: boolean;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare banReason?: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles?: Role[];

  @HasMany(() => Post)
  posts?: Post[];
}
