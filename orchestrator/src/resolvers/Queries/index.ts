import * as User from './User'
import * as Api from './Api'
import * as Message from './Message'
import * as ChatRoom from './ChatRoom'
export const Query = {
  ...User,
  ...Api,
  ...Message,
  ...ChatRoom,
}
