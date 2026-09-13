-- CreateTable
CREATE TABLE "Word" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "english" TEXT NOT NULL,
    "phonemes" TEXT NOT NULL,
    "activityId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Word_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "showHints" BOOLEAN NOT NULL DEFAULT true,
    "outputSettings" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
