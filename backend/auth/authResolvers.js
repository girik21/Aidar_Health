const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { generateToken } = require('./auth');

const prisma = new PrismaClient();

const authResolvers = {
    Mutation: {
        signup: async (_, { userInput }) => {
            const { username, email, password } = userInput;

            // Check if user already exists
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                throw new Error('User already exists');
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                },
            });

            // Generate JWT token
            const token = generateToken(newUser.id);
            return { user: newUser, token }; // Return user details and token
        },

        login: async (_, { email, password }) => {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                throw new Error('User not found');
            }

            // Verify password
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                throw new Error('Invalid credentials');
            }

            // Generate JWT token
            const token = generateToken(user.id);
            return { user, token }; // Return user details and token
        },
    },
};

module.exports = authResolvers;
