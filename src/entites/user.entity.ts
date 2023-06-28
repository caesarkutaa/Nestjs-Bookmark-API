import { BeforeInsert ,Entity, PrimaryGeneratedColumn,Column,  CreateDateColumn, 
       UpdateDateColumn,
       ManyToOne,
       OneToMany} from "typeorm"
import * as bcrypt from 'bcrypt'
import { Bookmark } from "./bookmark.entity";


@Entity()
export class User{   
    @PrimaryGeneratedColumn()
    id:number   
     
    @Column({ nullable:false,})
    username:string


    @Column({nullable:false,unique:true})
    email:string;

    @Column({nullable:false})
    password:string;

    @CreateDateColumn()
    CreatedAt:string

    @UpdateDateColumn()
    UpdateAt:string

    
    @OneToMany((type)=> Bookmark, (bookmarks) => bookmarks.user)
    bookmarks:Bookmark[]

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,10)
    }

}