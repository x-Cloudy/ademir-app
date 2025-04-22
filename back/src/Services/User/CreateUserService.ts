import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { UserRequest } from "../../models/User/UserRequest";
import { BinaryTreeService } from "../BinaryTree/BinaryTreeService";

class CreateUserService {
  async createUser(userData: {
    nick: string;
    name: string;
    email: string;
    whatsapp: string;
    password: string;
    indication: string;
    code: string;
    wallet: string;
    roles: string[];
    link: string;
  }) {
    return await prismaClient.$transaction(async (tx) => {
      // 1. Validações básicas
      if (!userData.nick || !userData.email || !userData.password) {
        throw new Error("Campos obrigatórios faltando");
      }

      // 2. Verificar unicidade
      const existingUser = await tx.user.findFirst({
        where: {
          OR: [
            { email: userData.email },
            { nick: userData.nick }
          ]
        }
      });

      if (existingUser) {
        throw new Error(existingUser.email === userData.email 
          ? "Email já cadastrado" 
          : "Nick já está em uso");
      }

      // 3. Buscar sponsor
      let sponsorId: number | null = null;
      
      if (userData.indication) {
        const processedNick = userData.indication.trim().toLowerCase();
        
        const sponsor = await tx.user.findFirst({
          where: {
            nick: {
              equals: processedNick,
              mode: 'insensitive'
            }
          },
          select: { id: true, indicatorSponsor: true } // <-- Aqui, para garantir que o campo existe
        });
        

        if (!sponsor) {
          throw new Error(`Sponsor '${processedNick}' não encontrado`);
        }
        sponsorId = sponsor.id;
      }

      // 4. Criar hash da senha
      const hashedPassword = await hash(userData.password, 10);
      console.log(userData);

      // 5. Criar usuário
      const newUser = await tx.user.create({
        data: {
          nick: userData.nick,
          name: userData.name,
          email: userData.email,
          whatsapp: userData.whatsapp,
          password: hashedPassword,
          indication: userData.nick, // Código de indicação é o próprio nick
          indicatorSponsor: userData.indication, // Nick do sponsor
          roles: userData.roles,
          wallet: userData.wallet,
          codeInvite: userData.nick,
          level: 0,
          active: true,
          status: false,
        },
        select: { id: true, nick: true, email: true , indicatorSponsor:true}
      });

      console.log(newUser);

      // 6. Adicionar na árvore binária
      if (sponsorId) {
        const binaryTreeService = new BinaryTreeService();
        await binaryTreeService.addUserToTree(
          sponsorId.toString(), 
          newUser.id.toString(),
          tx
        );
      }

      // 7. Atualizar status do usuário
      await tx.user.update({
        where: { id: newUser.id },
        data: { status: true }
      });

      // 8. Atualizar nível do sponsor
      if (sponsorId) {
        await tx.user.update({
          where: { id: sponsorId },
          data: { 
            level: { 
              increment: 1
            } 
          }
        });
      }

      return {
        success: true,
        user: {
          ...newUser,
          sponsorId: sponsorId || null
        }
      };
    });
  }
}

export { CreateUserService };