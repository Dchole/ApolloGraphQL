import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Launch = {
  __typename?: 'Launch';
  id: Scalars['ID'];
  details?: Maybe<Scalars['String']>;
  site: Scalars['String'];
  mission: Mission;
  rocket: Rocket;
  isBooked: Scalars['Boolean'];
  links: Links;
};

export type LaunchConnection = {
  __typename?: 'LaunchConnection';
  cursor?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
  launches: Array<Launch>;
};

export type Links = {
  __typename?: 'Links';
  article?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
};

export type Mission = {
  __typename?: 'Mission';
  name: Scalars['String'];
  missionPatch?: Maybe<Scalars['String']>;
};


export type MissionMissionPatchArgs = {
  size?: Maybe<PatchSize>;
};

export type Mutation = {
  __typename?: 'Mutation';
  bookTrip: TripUpdateResponse;
  cancelTrip: TripUpdateResponse;
  login: Scalars['String'];
  signUp: Scalars['String'];
};


export type MutationBookTripArgs = {
  launchId: Scalars['ID'];
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

export enum PatchSize {
  Small = 'SMALL',
  Large = 'LARGE'
}

export type Query = {
  __typename?: 'Query';
  launches: LaunchConnection;
  launch: Launch;
  me: User;
};


export type QueryLaunchesArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['Int']>;
  isBooked?: Maybe<Scalars['Boolean']>;
};


export type QueryLaunchArgs = {
  id: Scalars['ID'];
};

export type Rocket = {
  __typename?: 'Rocket';
  id: Scalars['ID'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type TripUpdateResponse = {
  __typename?: 'TripUpdateResponse';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  launch: Launch;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  trips: Array<Launch>;
};

export type BookTripMutationVariables = Exact<{
  launchId: Scalars['ID'];
}>;


export type BookTripMutation = (
  { __typename?: 'Mutation' }
  & { bookTrip: (
    { __typename?: 'TripUpdateResponse' }
    & Pick<TripUpdateResponse, 'success' | 'message'>
    & { launch: (
      { __typename?: 'Launch' }
      & Pick<Launch, 'id' | 'isBooked'>
    ) }
  ) }
);

export type CancelTripMutationVariables = Exact<{
  launchId: Scalars['ID'];
}>;


export type CancelTripMutation = (
  { __typename?: 'Mutation' }
  & { cancelTrip: (
    { __typename?: 'TripUpdateResponse' }
    & Pick<TripUpdateResponse, 'success' | 'message'>
    & { launch: (
      { __typename?: 'Launch' }
      & Pick<Launch, 'id' | 'isBooked'>
    ) }
  ) }
);

export type GetLaunchDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetLaunchDetailsQuery = (
  { __typename?: 'Query' }
  & { launch: (
    { __typename?: 'Launch' }
    & Pick<Launch, 'id' | 'site' | 'details' | 'isBooked'>
    & { mission: (
      { __typename?: 'Mission' }
      & Pick<Mission, 'name' | 'missionPatch'>
    ), rocket: (
      { __typename?: 'Rocket' }
      & Pick<Rocket, 'id' | 'name' | 'type'>
    ), links: (
      { __typename?: 'Links' }
      & Pick<Links, 'article' | 'video'>
    ) }
  ) }
);

export type GetLaunchesQueryVariables = Exact<{
  pageSize?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['Int']>;
  isBooked?: Maybe<Scalars['Boolean']>;
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

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'username'>
  ) }
);

export type LaunchQueryPartFragment = (
  { __typename?: 'Launch' }
  & Pick<Launch, 'id'>
  & { rocket: (
    { __typename?: 'Rocket' }
    & Pick<Rocket, 'id' | 'name'>
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
    id
    name
  }
  mission {
    name
    missionPatch(size: SMALL)
  }
}
    `;
export const BookTripDocument = gql`
    mutation BookTrip($launchId: ID!) {
  bookTrip(launchId: $launchId) {
    success
    message
    launch {
      id
      isBooked
    }
  }
}
    `;
export type BookTripMutationFn = Apollo.MutationFunction<BookTripMutation, BookTripMutationVariables>;

/**
 * __useBookTripMutation__
 *
 * To run a mutation, you first call `useBookTripMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookTripMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookTripMutation, { data, loading, error }] = useBookTripMutation({
 *   variables: {
 *      launchId: // value for 'launchId'
 *   },
 * });
 */
export function useBookTripMutation(baseOptions?: Apollo.MutationHookOptions<BookTripMutation, BookTripMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BookTripMutation, BookTripMutationVariables>(BookTripDocument, options);
      }
export type BookTripMutationHookResult = ReturnType<typeof useBookTripMutation>;
export type BookTripMutationResult = Apollo.MutationResult<BookTripMutation>;
export type BookTripMutationOptions = Apollo.BaseMutationOptions<BookTripMutation, BookTripMutationVariables>;
export const CancelTripDocument = gql`
    mutation CancelTrip($launchId: ID!) {
  cancelTrip(launchId: $launchId) {
    success
    message
    launch {
      id
      isBooked
    }
  }
}
    `;
export type CancelTripMutationFn = Apollo.MutationFunction<CancelTripMutation, CancelTripMutationVariables>;

/**
 * __useCancelTripMutation__
 *
 * To run a mutation, you first call `useCancelTripMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelTripMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelTripMutation, { data, loading, error }] = useCancelTripMutation({
 *   variables: {
 *      launchId: // value for 'launchId'
 *   },
 * });
 */
export function useCancelTripMutation(baseOptions?: Apollo.MutationHookOptions<CancelTripMutation, CancelTripMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelTripMutation, CancelTripMutationVariables>(CancelTripDocument, options);
      }
export type CancelTripMutationHookResult = ReturnType<typeof useCancelTripMutation>;
export type CancelTripMutationResult = Apollo.MutationResult<CancelTripMutation>;
export type CancelTripMutationOptions = Apollo.BaseMutationOptions<CancelTripMutation, CancelTripMutationVariables>;
export const GetLaunchDetailsDocument = gql`
    query GetLaunchDetails($id: ID!) {
  launch(id: $id) {
    id
    site
    details
    mission {
      name
      missionPatch
    }
    rocket {
      id
      name
      type
    }
    links {
      article
      video
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
export function useGetLaunchDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetLaunchDetailsQuery, GetLaunchDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLaunchDetailsQuery, GetLaunchDetailsQueryVariables>(GetLaunchDetailsDocument, options);
      }
export function useGetLaunchDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLaunchDetailsQuery, GetLaunchDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLaunchDetailsQuery, GetLaunchDetailsQueryVariables>(GetLaunchDetailsDocument, options);
        }
export type GetLaunchDetailsQueryHookResult = ReturnType<typeof useGetLaunchDetailsQuery>;
export type GetLaunchDetailsLazyQueryHookResult = ReturnType<typeof useGetLaunchDetailsLazyQuery>;
export type GetLaunchDetailsQueryResult = Apollo.QueryResult<GetLaunchDetailsQuery, GetLaunchDetailsQueryVariables>;
export const GetLaunchesDocument = gql`
    query GetLaunches($pageSize: Int, $after: Int, $isBooked: Boolean) {
  launches(pageSize: $pageSize, after: $after, isBooked: $isBooked) {
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
 *      isBooked: // value for 'isBooked'
 *   },
 * });
 */
export function useGetLaunchesQuery(baseOptions?: Apollo.QueryHookOptions<GetLaunchesQuery, GetLaunchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLaunchesQuery, GetLaunchesQueryVariables>(GetLaunchesDocument, options);
      }
export function useGetLaunchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLaunchesQuery, GetLaunchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLaunchesQuery, GetLaunchesQueryVariables>(GetLaunchesDocument, options);
        }
export type GetLaunchesQueryHookResult = ReturnType<typeof useGetLaunchesQuery>;
export type GetLaunchesLazyQueryHookResult = ReturnType<typeof useGetLaunchesLazyQuery>;
export type GetLaunchesQueryResult = Apollo.QueryResult<GetLaunchesQuery, GetLaunchesQueryVariables>;
export const GetUserDocument = gql`
    query GetUser {
  me {
    username
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export type LaunchKeySpecifier = ('id' | 'details' | 'site' | 'mission' | 'rocket' | 'isBooked' | 'links' | LaunchKeySpecifier)[];
export type LaunchFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	details?: FieldPolicy<any> | FieldReadFunction<any>,
	site?: FieldPolicy<any> | FieldReadFunction<any>,
	mission?: FieldPolicy<any> | FieldReadFunction<any>,
	rocket?: FieldPolicy<any> | FieldReadFunction<any>,
	isBooked?: FieldPolicy<any> | FieldReadFunction<any>,
	links?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LaunchConnectionKeySpecifier = ('cursor' | 'hasMore' | 'launches' | LaunchConnectionKeySpecifier)[];
export type LaunchConnectionFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>,
	launches?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LinksKeySpecifier = ('article' | 'video' | LinksKeySpecifier)[];
export type LinksFieldPolicy = {
	article?: FieldPolicy<any> | FieldReadFunction<any>,
	video?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MissionKeySpecifier = ('name' | 'missionPatch' | MissionKeySpecifier)[];
export type MissionFieldPolicy = {
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	missionPatch?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('bookTrip' | 'cancelTrip' | 'login' | 'signUp' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	bookTrip?: FieldPolicy<any> | FieldReadFunction<any>,
	cancelTrip?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	signUp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('launches' | 'launch' | 'me' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	launches?: FieldPolicy<any> | FieldReadFunction<any>,
	launch?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RocketKeySpecifier = ('id' | 'name' | 'type' | RocketKeySpecifier)[];
export type RocketFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TripUpdateResponseKeySpecifier = ('success' | 'message' | 'launch' | TripUpdateResponseKeySpecifier)[];
export type TripUpdateResponseFieldPolicy = {
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	launch?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('id' | 'username' | 'email' | 'trips' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	trips?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	Launch?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LaunchKeySpecifier | (() => undefined | LaunchKeySpecifier),
		fields?: LaunchFieldPolicy,
	},
	LaunchConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LaunchConnectionKeySpecifier | (() => undefined | LaunchConnectionKeySpecifier),
		fields?: LaunchConnectionFieldPolicy,
	},
	Links?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LinksKeySpecifier | (() => undefined | LinksKeySpecifier),
		fields?: LinksFieldPolicy,
	},
	Mission?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MissionKeySpecifier | (() => undefined | MissionKeySpecifier),
		fields?: MissionFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Rocket?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RocketKeySpecifier | (() => undefined | RocketKeySpecifier),
		fields?: RocketFieldPolicy,
	},
	TripUpdateResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TripUpdateResponseKeySpecifier | (() => undefined | TripUpdateResponseKeySpecifier),
		fields?: TripUpdateResponseFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};