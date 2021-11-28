import * as Users from './User'
import * as Api from './Api'
import * as Message from './Message'
export const Mutation = {
  ...Users,
  ...Api,
  ...Message,
}
