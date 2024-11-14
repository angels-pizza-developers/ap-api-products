import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("Access_pkey", ["accessId"], { unique: true })
@Entity("Access", { schema: "dbo" })
export class Access {
  @PrimaryGeneratedColumn({ type: "bigint", name: "AccessId" })
  accessId: string;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("jsonb", { name: "AccessPages", default: [] })
  accessPages: object;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @OneToMany(() => User, (user) => user.access)
  users: User[];
}
