-- Adicione um valor padrão temporário para level
ALTER TABLE "users" 
ADD COLUMN "level" INTEGER NOT NULL DEFAULT 0; -- Valor temporário

-- Remova o DEFAULT após popular os dados
ALTER TABLE "users" 
ALTER COLUMN "level" DROP DEFAULT;

-- Corrija os valores NULL em sidePreference
UPDATE "users" 
SET "sidePreference" = 'left' 
WHERE "sidePreference" IS NULL;

-- Torne sidePreference obrigatória
ALTER TABLE "users" 
ALTER COLUMN "sidePreference" SET NOT NULL;