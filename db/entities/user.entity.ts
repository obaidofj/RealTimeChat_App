import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ChatGroup } from './chatGroup.entity.js';
import { Notification } from './notification.entity.js';
// import { ConnectionFriendship } from './connectionFriendship.entity.js';
// import { MuteBlockUser } from './muteBlockUser.entity.js';
import { PaymentTransaction } from './paymentTransaction.entity.js';
import { Message } from './messege.entity.js';
// import { Message } from './messege.entity.js'; 


@Entity()
export class User  extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string; 

  chatGroups : ChatGroup[];
  notifications: Notification[];
  paymentTransactions: PaymentTransaction[];
  
  //  @OneToMany(() => ConnectionFriendship, (ConnectionFriendship) => ConnectionFriendship.initiator)
  //   friendshipsInitiated : ConnectionFriendship[];
  
  //   @OneToMany(() => ConnectionFriendship, (ConnectionFriendship) => ConnectionFriendship.recipient)
  //   friendshipsReceived: ConnectionFriendship[];
  
    // @OneToMany(() => MuteBlockUser, (muteBlock) => muteBlock.sourceUser)
    // initiatedMuteBlocks: MuteBlockUser[];
  
    // @OneToMany(() => MuteBlockUser, (muteBlock) => muteBlock.affectedUser)
    // receivedMuteBlocks: MuteBlockUser[];
  
  // sentMessages: Message[];

  // receivedMessages: Message[];

  async getSentMessages(): Promise<Message[]> {
    const sentMessages = await Message.find({ sender: this });
    return sentMessages;
  }

  async getReceivedMessages(): Promise<Message[]> {
    const receivedMessages = await Message.find({ receiver: this });
    return receivedMessages;
  }

  }
  
