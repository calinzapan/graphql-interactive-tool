import { extendType, stringArg, nonNull, intArg } from 'nexus'

export const api = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addApi', {
      type: 'API',
      args: {
        url: nonNull(stringArg()),
        pictureUrl: stringArg(),
        name: stringArg(),
      },
      resolve(_parent, { url, pictureUrl, name }, ctx) {
        const data = {
          url,
          pictureUrl,
          name,
          owner: { connect: { id: ctx.userId } },
          chatRoom: { create: {} },
        }
        return ctx.prisma.aPI.create({ data })
      },
    })
    t.field('updateApi', {
      type: 'API',
      args: {
        id: nonNull(intArg()),
        url: stringArg(),
        name: stringArg(),
      },
      resolve(_parent, { id, url, name }, ctx) {
        return ctx.prisma.aPI.update({
          data: {
            url,
            name,
          },
          where: {
            id,
          },
        })
      },
    })
    t.field('deleteApi', {
      type: 'API',
      args: {
        id: nonNull(intArg()),
      },
      resolve(_parent, { id }, ctx) {
        return ctx.prisma.aPI.delete({
          where: {
            id,
          },
        })
      },
    })
  },
})
