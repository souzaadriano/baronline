-- CreateTable
CREATE TABLE "user_store" (
    "storeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "user_store_pkey" PRIMARY KEY ("storeId","userId")
);

-- AddForeignKey
ALTER TABLE "user_store" ADD CONSTRAINT "user_store_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_store" ADD CONSTRAINT "user_store_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
