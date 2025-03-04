import User from '../models/User';
import { signToken } from '../services/auth';

export const resolvers = {
    Query: {
        me: async (_parent: any, _args: any, _context: any ) => {
            if (!_context.user) throw new Error('Not authenticated');
            return await User.findById(_context.user._id);
        },
    },
    Mutation: {
        addUser: async (_parent: any, { username, email, password }: any ) => {
            const user = await User.create({ username, email, password});
            const token = signToken(user);
            return { token, user };
        },
        login: async (_parent: any, { email, password }: any) => {
            const user = await User.findOne({ email });
            if (!user || !(await user.isCorrectPassword(password))) {
                throw new Error('Incorrect email or password');
            }
            const token = signToken(user);
            return { token, user };
        },
        savedBook: async (_parent: any, { bookData }: any, context: any) => {
            if (!context.user) throw new Error('Not authenticated');
            return await User.findByIdAndUpdate(
                context.user._id,
                { $addToSet: { savedBooks: bookData } },
                { new: true }
            );
        },
        removeBook: async(_parent: any, { bookId }: any, context: any) => {
            if (!context.user) throw new Error('Not authenticated');
            return await User.findByIdAndUpdate(
                context.user._id,
                { $pull: { savedBooks: { bookId } } },
            { new: true }
        );
     },
    },
};
