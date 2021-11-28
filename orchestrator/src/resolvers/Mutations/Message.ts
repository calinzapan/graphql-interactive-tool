import { intArg, mutationField, nonNull, stringArg } from 'nexus'

export const sendMessage = mutationField('sendMessage', {
  type: 'Message',
  args: {
    content: nonNull(stringArg()),
    roomId: nonNull(intArg()),
  },
  resolve(_parent, { content, roomId }, ctx) {
    return ctx.prisma.message.create({
      data: {
        content,
        roomId,
        isBotReply: false,
      },
    })
  },
})
