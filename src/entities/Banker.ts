import { Entity, Column,CreateDateColumn,UpdateDateColumn, ManyToMany, JoinTable,AfterLoad,AfterInsert,AfterUpdate} from "typeorm";
import { Client } from "./Client";
import { Person } from "./utils/Person";
@Entity('banker')
export class Banker extends Person {
    
    @Column({
        unique:true,
        length:10
    })
    employee_number:string

    @ManyToMany(
        ()=>Client
    )
    @JoinTable({
		name: 'bankers_clients',
		joinColumn: {
			name: 'banker',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'client',
			referencedColumnName: 'id',
		},
	})
	clients: Client[];

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    update_at:Date

    @AfterLoad()
    @AfterInsert()
    @AfterUpdate()
    async nullChecks() {
      if (!this.clients) {
        this.clients = []
      }
    }
  
}