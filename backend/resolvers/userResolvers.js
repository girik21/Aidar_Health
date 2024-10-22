const bcrypt = require('bcrypt');
const { PrismaClient, Roles } = require('@prisma/client');

const prisma = new PrismaClient();

const userResolvers = {
    Query: {
        getAllUsers: async () => {
            try {
                const users = await prisma.user.findMany();
                return users;
            } catch (error) {
                throw new Error('Error fetching users: ' + error.message);
            }
        },
    },

    Mutation: {
        createUser: async (_, { userInput }) => {
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
                        roles: Roles.UNASSIGNED, // Assign default role
                    },
                });

                console.log("User created successfully:", newUser);
                return newUser;
            } catch (error) {
                console.error("Error creating user:", error.message);
                throw new Error('Error creating user: ' + error.message);
            }
        },

        assignRole: async (_, { assignRoleInput }, context) => {
            const { userId, role } = assignRoleInput;

            const currentUserRole = context.user.roles; // Assuming context has user information

            if (currentUserRole !== Roles.ADMIN) {
                throw new Error("Only Admin can assign roles");
            }

            try {
                const updatedUser = await prisma.user.update({
                    where: { id: parseInt(userId, 10) }, // Convert string to integer
                    data: {
                        roles: role
                    },
                });

                return updatedUser;
            } catch (error) {
                console.log("Assigning Role Error", error.message);
                throw new Error("Error assigning role: " + error.message);
            }
        },
    },
};

module.exports = userResolvers;
