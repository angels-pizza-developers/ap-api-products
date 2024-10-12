import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("ProfileCorporate_pkey", ["profileCorporateId"], { unique: true })
@Entity("ProfileCorporate", { schema: "dbo" })
export class ProfileCorporate {
  @PrimaryGeneratedColumn({ type: "bigint", name: "ProfileCorporateId" })
  profileCorporateId: string;

  @Column("character varying", { name: "FirstName" })
  firstName: string;

  @Column("character varying", { name: "MiddleName", nullable: true })
  middleName: string | null;

  @Column("character varying", { name: "LastName" })
  lastName: string;

  @Column("date", { name: "Birthdate", nullable: true })
  birthdate: string | null;

  @Column("text", { name: "ImageUrl", nullable: true })
  imageUrl: string | null;

  @Column("character varying", { name: "Email", nullable: true })
  email: string | null;

  @Column("character varying", { name: "Mobile", nullable: true })
  mobile: string | null;

  @Column("enum", {
    name: "CorporateType",
    enum: ["BRANCH", "RIDER", "OPERATIONS"],
  })
  corporateType: "BRANCH" | "RIDER" | "OPERATIONS";

  @Column("timestamp with time zone", {
    name: "CreatedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] })
  brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";

  @ManyToOne(() => User, (user) => user.profileCorporates)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: User;
}
