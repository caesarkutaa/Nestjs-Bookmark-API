import { BeforeInsert ,Entity, PrimaryGeneratedColumn,Column,  CreateDateColumn, 
    UpdateDateColumn,
    ManyToOne} from "typeorm"
import { User } from "./user.entity"


@Entity()
export class Bookmark{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    description:string
   
    @Column()
    link:string


    @ManyToOne((type) => User, (user)=> user.bookmarks)
    user:User
    
    @CreateDateColumn()
    CreatedAt:string

    @UpdateDateColumn()
    UpdateAt:string
    

}