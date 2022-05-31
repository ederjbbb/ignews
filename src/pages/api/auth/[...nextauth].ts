import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import {fauna} from '../../../services/fauna';
import {query as q} from 'faunadb'



export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      
    }),
    // ...add more providers here
  ],

callbacks: {
    async signIn({ user }): Promise<boolean> {
      const { email } = user;

      try {
        await fauna.query(
            q.If(
                q.Not(
                    q.Exists(
                        q.Match(
                            q.Index('email'),
                            q.Casefold(email)
                        )
                    )
                ),
                q.Create(
                    q.Collection('users'),
                    {data: {email}}
                ),
                q.Get(
                    q.Match(
                        q.Index('email'),
                        q.Casefold(user.email)
                )
            )
        )
    )
    return true;
} catch {
        return false;
      }
    },
  },

})




