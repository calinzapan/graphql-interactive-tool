import { queryField } from 'nexus'

export const getCurrentUser = queryField('getCurrentUser', {
  type: 'User',
  async resolve(_parent, _args, ctx) {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.userId,
      },
    })
    return user
  },
})
