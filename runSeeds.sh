#!/bin/bash

# Define an array of seed files
SEED_FILES=("prisma/seeds/buyerSeed.ts" "prisma/seeds/productSeed.ts" "prisma/seeds/supplierSeed.ts")

for TS_FILE in "${SEED_FILES[@]}"; do
  JS_FILE="${TS_FILE%.ts}.js"

  echo "Compiling $TS_FILE..."
  tsc $TS_FILE
  sleep 10
  if [ $? -ne 0 ]; then
    echo "TypeScript compilation for $TS_FILE failed."
    exit 1
  fi
  echo "TypeScript compilation for $TS_FILE completed."

  echo "Running the seed script $JS_FILE..."
  node $JS_FILE

  if [ $? -ne 0 ]; then
    echo "Seed script execution for $JS_FILE failed."
    exit 1
  fi
  echo "Seed script for $JS_FILE completed."
done

echo "All seed scripts completed successfully."
