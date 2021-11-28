# GraphQL Interactive Tool

This project is developed for the WAD course(Web Application Development), as part of the Distributed Systems Msc program at Alexandru Ioan Cuza University, Iasi.

OdinQL is an interactive tool/framework meant to facilitate the communication with GraphQL-powered APIs through natural language constructs. There is a large number of open APIs that could provide precious information to end users, but due to the lack of a intuitive user interface, the data is only accessible to trained individuals, who know how to consume it. Through this tool, we're trying to mitigate this problem, while providing a playground for developers that are trying to learn more about GraphQL.

**Team:** Calin Zapan [MSD1], Cezar Cobuz [MSD1].

**Coordinator:** Sabin Corneliu Buraga

**Blog/Wiki:** Keep up with the project on our [blog](https://odinql.com)

## Arhitecture overview

OdinQL's architecture consists of 3 layers: Presentation Layer, Business Layer and last but not least the Data Layer. For more details consult the [scholarly report](https://github.com/calinzapan/graphql-interactive-tool/tree/master/scholarly-report) living inside this repository.

![layers](https://github.com/calinzapan/graphql-interactive-tool/blob/master/scholarly-report/assets/layers.png?raw=true)

## Presentation Layer

**Figma Prototype:** You can access our first Prototype [here](https://www.figma.com/proto/e3sD01MEH21OkrF2KRWBNL/OdinQL?page-id=0%3A1&node-id=5%3A3826&viewport=241%2C48%2C0.06&scaling=contain&starting-point-node-id=5%3A3826&fbclid=IwAR0XV3TihjQwaK9TmqOaGatztw-kj1NirPXskayWgT0cdZBSBqB7ipc4QY0)

A few things to keep in mind:

1. Not all features work on these prototypes, the connections are made only for the scenarios listed above;
2. Once you open a prototype, click on a random area to view the available hotspots. This is the only way to find the connection or available spots to click on.
3. If you want to leave a comment, press the letter C on your keyboard.

**Classes & Usecase diagrams:** To take a look at the architectural & usecase diagrams follow [this](https://www.figma.com/file/e3sD01MEH21OkrF2KRWBNL/Untitled?node-id=0%3A1)

## Business Layer

### Orchestrator Service

The orchestrator service exposes a GraphQL API with the following schema. To better understand the relations between entities, also check the visual representations of the schema exposed below.

```
type User {
  id: Int!
  firstName: String
  lastName: String
  email: String!
  apis: [API]
}

type API {
  id: Int!
  name: String
  pictureUrl: String
  url: String!
  owner: User
  chatRoom: ChatRoom
}

type ChatRoom {
  id: Int!
  api: API
  messages: [Message]
}

type Message {
  id: Int!
  isBotReply: Boolean!
  content: String!
  room: ChatRoom
}

type AuthPayload {
  accessToken: String
  user: User
}

type InvalidUser {
  message: String!
}

type UserAlreadyExists {
  message: String!
}

union LoginResult = AuthPayload | InvalidUser

union SignupResult = AuthPayload | UserAlreadyExists

type Query {
  getCurrentUser: User
  getUserApis: API
  getApi(apiId: Int!): API
  getChatRoomMessages(roomId: Int!): Message
  getApiChatRoom(apiId: Int!): ChatRoom
}

type Mutation {
  signup(
    firstName: String
    lastName: String
    email: String!
    password: String!
  ): SignupResult
  login(email: String!, password: String!): LoginResult
  addApi(url: String!, pictureUrl: String, name: String): API
  updateApi(id: Int!, url: String, name: String): API
  deleteApi(id: Int!): API
  sendMessage(content: String!, roomId: Int!): Message
}
```

![queries](https://github.com/calinzapan/graphql-interactive-tool/blob/master/scholarly-report/assets/schema.png?raw=true)
![mutations](https://github.com/calinzapan/graphql-interactive-tool/blob/master/scholarly-report/assets/schema2.png?raw=true)
