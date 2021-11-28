import { intArg, nonNull, queryField } from 'nexus'

export const getChatRoomMessages = queryField('getChatRoomMessages', {
  type: 'Message',
  args: {
    roomId: nonNull(intArg()),
  },
  resolve(_parent, { roomId }, ctx): Promise<any> {
    return ctx.prisma.message.findMany({
      where: {
        roomId,
      },
    })
  },
})
