import { NavigationAction } from 'react-navigation';

let _navigator;

export const setTopLevelNavigator = navigatorRef => {
    _navigator = navigatorRef;
};

export const navigate = (routeName, params) => {
    _navigator.dispatch(
        NavigationAction.navigate({
            routeName,
            params
        })
    )
}