import * as React from 'react'
import { RouteComponentProps, RouteProps } from 'react-router'
import { PasswordResetPage } from './auth/PasswordResetPage'
import { SignInPage } from './auth/SignInPage'
import { SignUpPage } from './auth/SignUpPage'
import { CommentsPage } from './comments/CommentsPage'
import { ErrorNotSupportedPage } from './components/ErrorNotSupportedPage'
import { OpenPage } from './open/OpenPage'
import { RepoBrowser } from './repo/RepoBrowser'
import { RepositoryResolver } from './repo/RepositoryResolver'
import { parseSearchURLQuery } from './search'
import { SavedQueries } from './search/SavedQueries'
import { SearchPage } from './search/SearchPage'
import { SearchResults } from './search/SearchResults'
import { SettingsPage } from './settings/SettingsPage'
import { InitPage } from './site-admin/InitPage'
import { SiteAdminArea } from './site-admin/SiteAdminArea'
import { canListAllRepositories } from './util/features'

export interface LayoutRouteProps extends RouteProps {
    component?: React.ComponentType<any>
    render?: (props: any) => React.ReactNode

    /**
     * Whether or not to force the width of the page to be narrow.
     */
    forceNarrowWidth?: boolean
}

/**
 * Holds all top-level routes for the app because both the navbar and the main content area need to
 * switch over matched path.
 *
 * See https://reacttraining.com/react-router/web/example/sidebar
 */
export const routes: LayoutRouteProps[] = [
    {
        path: '/search',
        render: (props: RouteComponentProps<any>) =>
            parseSearchURLQuery(props.location.search) ? <SearchResults {...props} /> : <SearchPage {...props} />,
        exact: true,
    },
    {
        path: '/search/queries',
        component: SavedQueries,
        exact: true,
        forceNarrowWidth: true,
    },
    {
        path: '/c/:ulid',
        component: CommentsPage,
        exact: true,
        forceNarrowWidth: true,
    },
    {
        path: '/open',
        component: OpenPage,
        exact: true,
        forceNarrowWidth: true,
    },
    {
        path: '/sign-in',
        component: SignInPage,
        exact: true,
        forceNarrowWidth: true,
    },
    {
        path: '/sign-up',
        component: SignUpPage,
        exact: true,
        forceNarrowWidth: true,
    },
    {
        path: '/settings',
        component: SettingsPage,
        forceNarrowWidth: true,
    },
    {
        path: '/search',
        component: SearchResults,
        exact: true,
    },
    {
        path: '/search',
        component: SearchResults,
        exact: true,
    },
    {
        path: '/site-admin/init',
        exact: true,
        component: InitPage,
        forceNarrowWidth: false,
    },
    {
        path: '/site-admin',
        component: SiteAdminArea,
        forceNarrowWidth: true,
    },
    {
        path: '/password-reset',
        component: PasswordResetPage,
        exact: true,
        forceNarrowWidth: true,
    },
    {
        path: '/browse',
        component: canListAllRepositories ? RepoBrowser : ErrorNotSupportedPage,
        exact: true,
        forceNarrowWidth: true,
    },
    {
        path: '/:repoRev+/-/blob/:filePath+',
        render: (props: any) => <RepositoryResolver {...props} isDirectory={false} />,
    },
    {
        path: '/:repoRev+/-/tree/:filePath+',
        render: (props: any) => <RepositoryResolver {...props} isDirectory={true} />,
    },
    {
        path: '/:repoRev+',
        render: (props: any) => <RepositoryResolver {...props} isDirectory={true} />,
    },
]
