-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL DEFAULT 'Unknown',
    "address" TEXT NOT NULL DEFAULT 'Not provided',
    "city" TEXT NOT NULL DEFAULT 'Not provided',
    "state" TEXT NOT NULL DEFAULT 'Not provided',
    "zip" TEXT NOT NULL DEFAULT '00000'
);
INSERT INTO "new_User" ("address", "city", "cpf", "email", "id", "name", "password", "phone", "state", "zip") SELECT "address", "city", "cpf", "email", "id", "name", "password", "phone", "state", "zip" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
