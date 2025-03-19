export class GenerateCodeService {
    static decodeInviteCode(code: string) {
      throw new Error('Method not implemented.');
    }
    private readonly secretKey = 's3cr3t';

    public generateInviteCode(userId: string): string {
        const encoded = Buffer.from(`${userId}-${this.secretKey}`).toString('base64');
        return encoded.replace(/=/g, '');
    }

    public decodeInviteCode(code: string): string {
        try {
            const decoded = Buffer.from(code, 'base64').toString('utf-8');
            const [userId] = decoded.split('-');
            return userId;
        } catch (error) {
            throw new Error('Código de convite inválido');
        }
    }
}
