import { nonNull, intArg, queryField } from "nexus";

export const getUserApis = queryField('getUserApis', {
  type: 'API',
  async resolve(_parent, _args, ctx): Promise<any> {
    const apis = await ctx.prisma.aPI.findMany({
      where: {
        ownerId: ctx.userId
      },
    })
    return apis
  }
})

export const getApi = queryField('getApi', {
  type: 'API',
  args: {
    apiId: nonNull(intArg())
  },
  async resolve(_parent, { apiId }, ctx) {
    const api = await ctx.prisma.aPI.findFirst({
      where: {
        id: apiId
      }
    })
    return api
  }
})
