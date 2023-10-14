import { User } from '../db/entities/user.entity.js';
import bcrypt from 'bcrypt';
import { verify } from '../middlewares/authentication.js';
import connection from '../db/connection.js';
import { Profile } from '../db/entities/profile.entity.js';
export const userController = {
    // User registration
    async register(req, res) {
        try {
            const { username, password, email } = req.body;
            // Check if the username or email is already taken
            const existingUser = await User.findOne({ where: [{ username }, { email }] });
            if (existingUser) {
                return res.status(400).json({ message: 'Username or email already exists' });
            }
            // Hash the password
            // const hashedPassword = await bcrypt.hash(password, 10);
            // Create a new user
            const user = await User.create({
                username,
                password: password,
                email,
            });
            await user.save();
            return res.status(201).json({ message: 'User registered successfully', user });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    // User login
    async login(req, res) {
        try {
            const { username, password } = req.body;
            // Find the user by username
            const user = await User.findOne({ where: { username } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Compare the provided password with the hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Incorrect password' });
            }
            // Here you can generate a JWT token for user authentication
            return res.status(200).json({ message: 'Login successful', user });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    async insertProfile(req, res) {
        const { id, firstName, lastName, dateOfBirth } = req.body;
        return connection.manager.transaction(async (transaction) => {
            try {
                const user = await User.findOne({ where: { id: Number(id) } });
                if (user) {
                    const profile = Profile.create({
                        firstName,
                        lastName,
                        dateOfBirth
                    });
                    await transaction.save(profile);
                    user.profile = profile;
                    await transaction.save(user);
                    return res.status(200).json({ message: 'The Profile created', profile });
                } //end if
                else {
                    return res.status(500).json({ message: "this user dose not exist" });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Something went wrong" });
            }
        });
    },
    // Retrieve user profile
    async getUserProfileByID(req, res) {
        try {
            const userId = Number(req.params.userId);
            // Find the user by ID
            const user = await User.findBy({ id: userId });
            if (user.length === 0) {
                return res.status(404).json({ message: 'User is not found' });
            }
            if (user[0]?.profile?.id)
                return res.status(200).json({ userid: user[0].id, profile: user[0].profile });
            else
                return res.status(404).json({ messege: 'There is no profile for user :' + user[0].id });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    // Retrieve user profile by username
    async getUserProfileByUserName(req, res) {
        try {
            const userName = req.params.userName;
            // Find the user by ID
            const user = await User.findBy({ username: userName });
            if (user.length === 0) {
                return res.status(404).json({ message: 'User is not found' });
            }
            if (user[0]?.profile?.id)
                return res.status(200).json({ userid: user[0].id, profile: user[0].profile });
            else
                return res.status(404).json({ messege: 'There is no profile for user :' + user[0].id });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    // logout of user
    async logout(req, res) {
        try {
            return res.status(200).json({ message: 'Logout successful' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    async assignRoleToUser(req, res) {
        try {
            return res.status(201).send(data);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    async verify(req, res) {
        try {
            const token = req.body.token;
            if (verify(token)) {
                res.status(200).send({ 'token': true, 'msg': 'The token is right' });
            }
            else {
                res.status(200).send({ 'token': false, 'msg': 'The token is wrong' });
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};
//# sourceMappingURL=user.controller.js.map