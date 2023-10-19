import { BaseEntity, Entity, PrimaryGeneratedColumn, Column,ManyToMany, OneToMany, OneToOne, JoinColumn, JoinTable, BeforeInsert } from 'typeorm';
import { ChatGroup } from './chatGroup.entity.js';
import { Notification } from './notification.entity.js';
// import { ConnectionFriendship } from './connectionFriendship.entity.js';
// import { MuteBlockUser } from './muteBlockUser.entity.js';
import { PaymentTransaction } from './paymentTransaction.entity.js';
import { MuteBlockUser } from './muteBlockUser.entity.js';
import { Message } from './messege.entity.js';
import { ConnectionFriendship } from './connectionFriendship.entity.js';
import { Profile } from './profile.entity.js';
import { Role } from './role.entity.js';
import bcrypt from 'bcrypt';
// import { Message } from './messege.entity.js'; 


@Entity()
export class User  extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  chatGroups : ChatGroup[];
  paymentTransactions: PaymentTransaction[];  

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }
  @Column({ nullable: false })
  password: string;
 


  @OneToMany(() => Notification, n => n.notificationRecipient , { eager: true})
  notifications: Notification[];

  
   @OneToMany(() => ConnectionFriendship, (ConnectionFriendship) => ConnectionFriendship.initiator)
   initiatedConnectionFriendship : ConnectionFriendship[];
  
    @OneToMany(() => ConnectionFriendship, (ConnectionFriendship) => ConnectionFriendship.recipient)
    receivedConnectionFriendship: ConnectionFriendship[];
  
    @OneToMany(() => MuteBlockUser, (muteBlock) => muteBlock.initiatoruser)
    initiatedMuteBlocks: MuteBlockUser[];
  
    @OneToMany(() => MuteBlockUser, (muteBlock) => muteBlock.receiveduser)
    receivedMuteBlocks: MuteBlockUser[];


    @OneToMany(() => Message, (messege) => messege.sender)
    sentMessages: Message[];
  
    @OneToMany(() => Message, (messege) => messege.receiver)
    receivedMessages: Message[];


    @ManyToMany(() => Role, role => role.users, {  eager: true })
    @JoinTable()
    roles: Role[];
  

    @OneToOne(() => Profile, profile => profile.user, { cascade: true, eager: true })
    @JoinColumn()
    profile:Profile
    
  // async getSentMessages(): Promise<Message[]> {
  //   const sentMessages = await Message.find({ sender: this });
  //   return sentMessages;
  // }

  // async getReceivedMessages(): Promise<Message[]> {
  //   const receivedMessages = await Message.find({ receiver: this });
  //   return receivedMessages;
  // }

  // async getInitiatedMuteBlocks(): Promise<MuteBlockUser[]> {
  //   const initiatedMuteBlocks = await MuteBlockUser.find({ initiatoruser: this });
  //   return initiatedMuteBlocks;
  // }

  // async getReceivedMuteBlocks(): Promise<MuteBlockUser[]> {
  //   const receivedMuteBlocks = await MuteBlockUser.find({ affecteduser: this });
  //   return receivedMuteBlocks;
  // }

  // async getInitiatedConnectionFriendship (): Promise<ConnectionFriendship[]> {
  //   const initiatedConnectionFriendship = await ConnectionFriendship.find({ initiator: this });
  //   return initiatedConnectionFriendship;
  // }

  // async getReceivedConnectionFriendship(): Promise<ConnectionFriendship[]> {
  //   const receivedConnectionFriendship = await ConnectionFriendship.find({ recipient: this });
  //   return receivedConnectionFriendship;
  // }

  }
  
