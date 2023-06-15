/*
  Warnings:

  - The primary key for the `promotion_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `promotion_sales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `promotion_stores` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `store_configuration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `store_group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `stores` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "promotion_products" DROP CONSTRAINT "promotion_products_promotionId_fkey";

-- DropForeignKey
ALTER TABLE "promotion_stores" DROP CONSTRAINT "promotion_stores_promotionId_fkey";

-- DropForeignKey
ALTER TABLE "promotion_stores" DROP CONSTRAINT "promotion_stores_storeId_fkey";

-- DropForeignKey
ALTER TABLE "store_configuration" DROP CONSTRAINT "store_configuration_storeId_fkey";

-- DropForeignKey
ALTER TABLE "store_group" DROP CONSTRAINT "store_group_storeId_fkey";

-- AlterTable
ALTER TABLE "promotion_products" DROP CONSTRAINT "promotion_products_pkey",
ALTER COLUMN "promotionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "promotion_products_pkey" PRIMARY KEY ("productId", "promotionId");

-- AlterTable
ALTER TABLE "promotion_sales" DROP CONSTRAINT "promotion_sales_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "promotion_sales_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "promotion_sales_id_seq";

-- AlterTable
ALTER TABLE "promotion_stores" DROP CONSTRAINT "promotion_stores_pkey",
ALTER COLUMN "promotionId" SET DATA TYPE TEXT,
ALTER COLUMN "storeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "promotion_stores_pkey" PRIMARY KEY ("promotionId", "storeId");

-- AlterTable
ALTER TABLE "store_configuration" DROP CONSTRAINT "store_configuration_pkey",
ALTER COLUMN "storeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "store_configuration_pkey" PRIMARY KEY ("configurationId", "storeId");

-- AlterTable
ALTER TABLE "store_group" DROP CONSTRAINT "store_group_pkey",
ALTER COLUMN "storeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "store_group_pkey" PRIMARY KEY ("brandId", "storeId");

-- AlterTable
ALTER TABLE "stores" DROP CONSTRAINT "stores_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "stores_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "stores_id_seq";

-- AddForeignKey
ALTER TABLE "store_group" ADD CONSTRAINT "store_group_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_configuration" ADD CONSTRAINT "store_configuration_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_products" ADD CONSTRAINT "promotion_products_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotion_sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_stores" ADD CONSTRAINT "promotion_stores_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotion_sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_stores" ADD CONSTRAINT "promotion_stores_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
