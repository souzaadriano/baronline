mkdir -p ./src/infra/database/models/temp

for file in ./src/infra/database/models/*.prisma; do
    sed '/\/\/@relations/,$d' "$file" > "./src/infra/database/models/temp/$(basename "$file")"
done

cat ./src/infra/database/models/connection.config ./src/infra/database/models/temp/*.prisma > ./src/infra/database/schema.prisma
rm -rf ./src/infra/database/models/temp
yarn format:schema