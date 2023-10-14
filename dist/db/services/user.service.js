import { getRepository } from 'typeorm';
import { MuteBlockUser } from './muteBlockUser.entity';
export class UserService {
    async getInitiatedMuteBlocks(user) {
        const muteBlockRepository = getRepository(MuteBlockUser);
        return muteBlockRepository.find({ initiatoruser: user });
    }
    async getReceivedMuteBlocks(user) {
        const muteBlockRepository = getRepository(MuteBlockUser);
        return muteBlockRepository.find({ affecteduser: user });
    }
}
//# sourceMappingURL=user.service.js.map