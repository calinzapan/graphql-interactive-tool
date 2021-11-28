import { intArg, nonNull, queryField } from 'nexus'

export const getApiChatRoom = queryField('getApiChatRoom', {
  type: 'ChatRoom',
  args: {
    apiId: nonNull(intArg()),
  },
  resolve(_parent, { apiId }, ctx) {
    return ctx.prisma.chatRoom.findUnique({
      where: {
        apiId,
      },
    })
  },
})
