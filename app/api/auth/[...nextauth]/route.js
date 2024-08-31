import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/utils/db";
import User from "@/models/user";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const userSession = await User.findOne({
        email: session.user.email,
      });
      session.user.id = userSession._id.toString();
      return session;
    },
    async signIn({ user }) {
      try {
        await connectDB();
        //if user already exist
          const userExist = await User.findOne({ email: user.email });
      
          //if not exist create a new one
        if (!userExist) {
          await User.create({
            email: user.email,
            name: user.name.toLowerCase(),
            image: user.image,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };
