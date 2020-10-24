import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  launches: LaunchConnection;
  launch: Launch;
  me: User;
};


export type QueryLaunchesArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['Int']>;
};


export type QueryLaunchArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  bookTrips: TripUpdateResponse;
  cancelTrip: TripUpdateResponse;
  login: Scalars['String'];
  signUp: Scalars['String'];
};


export type MutationBookTripsArgs = {
  launchIds: Array<Scalars['ID']>;
};


export type MutationCancelTripArgs = {
  launchId: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignUpArgs = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LaunchConnection = {
  __typename?: 'LaunchConnection';
  cursor?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
  launches: Array<Launch>;
};

export type TripUpdateResponse = {
  __typename?: 'TripUpdateResponse';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  launches?: Maybe<Array<Launch>>;
};

export type Launch = {
  __typename?: 'Launch';
  id: Scalars['ID'];
  site: Scalars['String'];
  mission: Mission;
  rocket: Rocket;
  isBooked: Scalars['Boolean'];
};

export type Rocket = {
  __typename?: 'Rocket';
  id: Scalars['ID'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  trips: Array<Launch>;
};

export type Mission = {
  __typename?: 'Mission';
  name: Scalars['String'];
  missionPatch?: Maybe<Scalars['String']>;
};


export type MissionMissionPatchArgs = {
  size?: Maybe<PatchSize>;
};

export enum PatchSize {
  Small = 'SMALL',
  Large = 'LARGE'
}

export type BookTripsMutationVariables = Exact<{
  launchIds: Array<Scalars['ID']>;
}>;


export type BookTripsMutation = (
  { __typename?: 'Mutation' }
  & { bookTrips: (
    { __typename?: 'TripUpdateResponse' }
    & Pick<TripUpdateResponse, 'success' | 'message'>
  ) }
);

export type GetLaunchDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetLaunchDetailsQuery = (
  { __typename?: 'Query' }
  & { launch: (
    { __typename?: 'Launch' }
    & Pick<Launch, 'site' | 'isBooked'>
    & { mission: (
      { __typename?: 'Mission' }
      & Pick<Mission, 'name' | 'missionPatch'>
    ), rocket: (
      { __typename?: 'Rocket' }
      & Pick<Rocket, 'name' | 'type'>
    ) }
  ) }
);

export type GetLaunchesQueryVariables = Exact<{
  pageSize?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['Int']>;
}>;


export type GetLaunchesQuery = (
  { __typename?: 'Query' }
  & { launches: (
    { __typename?: 'LaunchConnection' }
    & Pick<LaunchConnection, 'cursor' | 'hasMore'>
    & { launches: Array<(
      { __typename?: 'Launch' }
      & LaunchQueryPartFragment
    )> }
  ) }
);

export type LaunchQueryPartFragment = (
  { __typename?: 'Launch' }
  & Pick<Launch, 'id'>
  & { rocket: (
    { __typename?: 'Rocket' }
    & Pick<Rocket, 'name'>
  ), mission: (
    { __typename?: 'Mission' }
    & Pick<Mission, 'name' | 'missionPatch'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signUp'>
);

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export const LaunchQueryPartFragmentDoc = gql`
    fragment LaunchQueryPart on Launch {
  id
  rocket {
    name
  }
  mission {
    name
    missionPatch(size: SMALL)
  }
}
    `;
export const BookTripsDocument = gql`
    mutation BookTrips($launchIds: [ID!]!) {
  bookTrips(launchIds: $launchIds) {
    success
    message
  }
}
    `;
export type BookTripsMutationFn = Apollo.MutationFunction<BookTripsMutation, BookTripsMutationVariables>;

/**
 * __useBookTripsMutation__
 *
 * To run a mutation, you first call `useBookTripsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookTripsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookTripsMutation, { data, loading, error }] = useBookTripsMutation({
 *   variables: {
 *      launchIds: // value for 'launchIds'
 *   },
 * });
 */
export function useBookTripsMutation(baseOptions?: Apollo.MutationHookOptions<BookTripsMutation, BookTripsMutationVariables>) {
        return Apollo.useMutation<BookTripsMutation, BookTripsMutationVariables>(BookTripsDocument, baseOptions);
      }
export type BookTripsMutationHookResult = ReturnType<typeof useBookTripsMutation>;
export type BookTripsMutationResult = Apollo.MutationResult<BookTripsMutation>;
export type BookTripsMutationOptions = Apollo.BaseMutationOptions<BookTripsMutation, BookTripsMutationVariables>;
export const GetLaunchDetailsDocument = gql`
    query GetLaunchDetails($id: ID!) {
  launch(id: $id) {
    site
    mission {
      name
      missionPatch
    }
    rocket {
      name
      type
    }
    isBooked
  }
}
    `;

/**
 * __useGetLaunchDetailsQuery__
 *
 * To run a query within a React component, call `useGetLaunchDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLaunchDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLaunchDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLaunchDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetLaunchDetailsQuery, GetLaunchDetailsQueryVariables>) {
        return Apollo.useQuery<GetLaunchDetailsQuery, GetLaunchDetailsQueryVariables>(GetLaunchDetailsDocument, baseOptions);
      }
export function useGetLaunchDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLaunchDetailsQuery, GetLaunchDetailsQueryVariables>) {
          return Apollo.useLazyQuery<GetLaunchDetailsQuery, GetLaunchDetailsQueryVariables>(GetLaunchDetailsDocument, baseOptions);
        }
export type GetLaunchDetailsQueryHookResult = ReturnType<typeof useGetLaunchDetailsQuery>;
export type GetLaunchDetailsLazyQueryHookResult = ReturnType<typeof useGetLaunchDetailsLazyQuery>;
export type GetLaunchDetailsQueryResult = Apollo.QueryResult<GetLaunchDetailsQuery, GetLaunchDetailsQueryVariables>;
export const GetLaunchesDocument = gql`
    query GetLaunches($pageSize: Int, $after: Int) {
  launches(pageSize: $pageSize, after: $after) {
    cursor
    hasMore
    launches {
      ...LaunchQueryPart
    }
  }
}
    ${LaunchQueryPartFragmentDoc}`;

/**
 * __useGetLaunchesQuery__
 *
 * To run a query within a React component, call `useGetLaunchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLaunchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLaunchesQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetLaunchesQuery(baseOptions?: Apollo.QueryHookOptions<GetLaunchesQuery, GetLaunchesQueryVariables>) {
        return Apollo.useQuery<GetLaunchesQuery, GetLaunchesQueryVariables>(GetLaunchesDocument, baseOptions);
      }
export function useGetLaunchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLaunchesQuery, GetLaunchesQueryVariables>) {
          return Apollo.useLazyQuery<GetLaunchesQuery, GetLaunchesQueryVariables>(GetLaunchesDocument, baseOptions);
        }
export type GetLaunchesQueryHookResult = ReturnType<typeof useGetLaunchesQuery>;
export type GetLaunchesLazyQueryHookResult = ReturnType<typeof useGetLaunchesLazyQuery>;
export type GetLaunchesQueryResult = Apollo.QueryResult<GetLaunchesQuery, GetLaunchesQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  signUp(username: $username, email: $email, password: $password)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    