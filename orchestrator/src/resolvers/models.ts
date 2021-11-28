import { objectType, unionType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('firstName')
    t.string('lastName')
    t.nonNull.string('email')
    t.list.field('apis', {
      type: 'API',
      resolve(root, _, ctx) {
        return ctx.prisma.user.findFirst({ where: {id: root.id}}).apis()
      }
    })
  },
})

export const API = objectType({
  name: 'API',
  definition(t) {
    t.nonNull.int('id')
    t.string('name')
    t.string('pictureUrl')
    t.nonNull.string('url')
    t.field('owner', {
      type: 'User',
      resolve(root, _, ctx) {
        return ctx.prisma.aPI.findFirst({where: {id: root.id}}).owner()
      }
    })
    t.field('chatRoom', {
      type: 'ChatRoom',
      resolve(root, _, ctx) {
        return ctx.prisma.aPI.findFirst({where: {id: root.id}}).chatRoom()
      }
    })
  }
})

export const ChatRoom = objectType({
  name: 'ChatRoom',
  definition(t) {
    t.nonNull.int('id')
    t.field('api', {
      type: 'API',
      resolve(root, _, ctx) {
        return ctx.prisma.chatRoom.findFirst({where: {id: root.id}}).api()
      }
    })
    t.list.field('messages', {
      type: 'Message',
      resolve(root, _, ctx) {
        return ctx.prisma.chatRoom.findFirst({where: {id: root.id}}).messages()
      }
    })
  }
})

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.boolean('isBotReply')
    t.nonNull.string('content')
    t.field('room', {
      type: "ChatRoom",
      resolve(root, _, ctx) {
        return ctx.prisma.message.findFirst({where: {id: root.id}}).room()
      }
    })
  }
})

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('accessToken')
    t.field('user', { type: 'User' })
  },
})

export const InvalidUserError = objectType({
  name: 'InvalidUser',
  definition(t) {
    t.nonNull.string('message')
  },
})

export const UserAlreadyExistsError = objectType({
  name: 'UserAlreadyExists',
  definition(t) {
    t.nonNull.string('message')
  },
})

export const LoginResult = unionType({
  name: 'LoginResult',
  definition(t) {
    t.members('AuthPayload', 'InvalidUser')
  },
  resolveType(t) {
    // @ts-ignore
    return t.__typename
  },
})

export const SignupResult = unionType({
  name: 'SignupResult',
  definition(t) {
    t.members('AuthPayload', 'UserAlreadyExists')
  },
  resolveType(t) {
    // @ts-ignore
    return t.__typename
  },
})
