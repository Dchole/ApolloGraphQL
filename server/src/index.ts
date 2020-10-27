import { config } from "dotenv";
import { ApolloServer } from "apollo-server";
import {
  addResolversToSchema,
  GraphQLFileLoader,
  loadSchemaSync
} from "graphql-tools";
import { connect } from "mongoose";
import UserModel from "./models/user-model";
import UserAPI from "./data/user";
import LaunchAPI from "./data/launch";
import resolvers from "./resolvers/resolvers";

config();

const schema = loadSchemaSync("./src/schema.graphql", {
  loaders: [new GraphQLFileLoader()]
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  // @ts-ignore
  resolvers
});

connect(process.env.MONGODB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => console.log("Connected to DB!"))
  .catch((err: Error) => console.log(err));

const server = new ApolloServer({
  schema: schemaWithResolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI(UserModel)
  }),
  context: ({ req }) => ({
    token: req.headers.authorization?.split(" ")[1]
  })
});

server
  .listen(process.env.PORT || 4000)
  .then(({ url }) => console.log(`🚀  Server ready at ${url}`));
