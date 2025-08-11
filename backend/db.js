const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Export the Prisma client instance
module.exports = prisma;