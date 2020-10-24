declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: string;
    MONGODB_URI?: string;
    JWT_ACCESS_SECRET?: string;
    JWT_REFRESH_SECRET?: string;
    APOLLO_KEY?: string;
    APOLLO_GRAPH_VARIANT?: string;
    APOLLO_SCHEMA_REPORTING?: string;
  }
}
