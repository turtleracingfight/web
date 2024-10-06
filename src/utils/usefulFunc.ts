import {LIST_ROUTES} from "../constants/route.tsx";

export const helperNavigationStyles = (path: string) => {
    switch (path) {
        case '/home':
            return '50.14%'
        case '/stats':
            return '20.14%'
        case '/info':
            return '80.14%'
        default:
            return ''
    }
}

export const helperUnnecessaryNavigation = (path: string) => {
    switch (path) {
        case LIST_ROUTES.listTurtles:
            return true
        case LIST_ROUTES.connect:
            return true
        case LIST_ROUTES.settings:
            return true
        default:
            return false
    }
}

export const helperExcessMargin = (path: string) => {
    switch (path) {
        case LIST_ROUTES.listTurtles:
            return true
        default:
            return false
    }
}
