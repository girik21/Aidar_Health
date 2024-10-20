const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const userResolvers = {
    getAllUsers: async () => {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    },

    createUser: async ({ userInput }) => {
        const { username, email, password } = userInput;

        try {
            // Check if user already exists
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                throw new Error('User with this email already exists');
            }

            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                },
            });

            console.log("User created successfully:", newUser);

            return newUser; 
        } catch (error) {
            console.error("Error creating user:", error.message);
            throw new Error('Error creating user: ' + error.message);
        }
    },
};

module.exports = userResolvers;
