-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chamado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ABERTO',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Chamado" ("descricao", "id", "imagem", "titulo") SELECT "descricao", "id", "imagem", "titulo" FROM "Chamado";
DROP TABLE "Chamado";
ALTER TABLE "new_Chamado" RENAME TO "Chamado";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
