export class GenerateCodeService {

    public generateInviteCode(userId: string): string {
        const randomCode = Math.floor(userId.length * 10000 / 2);
        const inviteCode = `${randomCode}${userId.length}`;
        return inviteCode;
    }

    public decodeInviteCode(code: string): string {
        const userIdLength = parseInt(code.charAt(code.length - 1), 10);
        const randomCode = parseInt(code.slice(0, -1), 10);
        const originalUserId = Math.round(randomCode * 2 / userIdLength);
        return originalUserId.toString();
    }
}