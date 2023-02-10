/* eslint-disable react-hooks/rules-of-hooks */
import { useLoaderInstance } from '@tanstack/react-loaders';
import {
  Outlet,
  ReactRouter,
  RootRoute,
  Route,
  RouterProvider,
  useParams,
} from '@tanstack/react-router';
import { Inspector } from 'react-inspector';
import { Breadcrumbs } from './Breadcrumbs';
import {
  bigPartiesLoader,
  bigPartyLoader,
  userLoader,
  usersLoader,
} from './loaders';

const rootRoute = new RootRoute({
  meta: { breadcrumb: () => 'Home' },
  component: () => (
    <>
      rootRoute
      <Breadcrumbs />
      <Outlet />
    </>
  ),
});
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <>
      indexRoute
      <Outlet />
    </>
  ),
});

const usersRoute = new Route({
  meta: { breadcrumb: () => 'Users' },
  async onLoad({ params }) {
    await usersLoader.load();
  },
  getParentRoute: () => rootRoute,
  path: '/users',
  component: () => {
    const users = useLoaderInstance({ loader: usersLoader });
    return (
      <>
        <div className="tree-parent">
          <Inspector table={false} data={users.state.data} />
        </div>
        <Outlet />
      </>
    );
  },
});

const userRoute = new Route({
  meta: { breadcrumb: (params) => params.userId },
  async onLoad({ params }) {
    await userLoader.load({ variables: params.userId });
  },
  getParentRoute: () => usersRoute,
  path: '$userId',
  component: () => {
    const { userId } = useParams({ from: userRoute.id });
    const user = useLoaderInstance({ loader: userLoader, variables: userId });
    return (
      <>
        <div className="tree-parent">
          <Inspector table={false} data={{ date: new Date() }} />
          <Inspector table={false} data={user.state.data} />
        </div>
        <Outlet />
      </>
    );
  },
});

const bigPartiesRoute = new Route({
  meta: { breadcrumb: () => 'Big Parties' },
  async onLoad({ params }) {
    await bigPartiesLoader.load();
  },
  getParentRoute: () => rootRoute,
  path: '/big-parties',
  component: () => {
    const parties = useLoaderInstance({ loader: bigPartiesLoader });
    return (
      <>
        <div className="tree-parent">
          <Inspector table={false} data={parties.state.data} />
        </div>
        <Outlet />
      </>
    );
  },
});

const bigPartyRoute = new Route({
  meta: { breadcrumb: (params) => params.partyId },
  async onLoad({ params }) {
    await bigPartyLoader.load({ variables: params.partyId });
  },
  getParentRoute: () => bigPartiesRoute,
  path: '$partyId',
  component: () => {
    const { userId: partyId } = useParams({ from: userRoute.id });
    const party = useLoaderInstance({
      loader: bigPartyLoader,
      variables: partyId,
    });
    return (
      <>
        <div className="tree-parent">
          <Inspector table={false} data={{ date: new Date() }} />
          <Inspector table={false} data={party.state.data} />
        </div>
        <Outlet />
      </>
    );
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  usersRoute.addChildren([userRoute]),
  bigPartiesRoute.addChildren([bigPartyRoute]),
]);
const router = new ReactRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
