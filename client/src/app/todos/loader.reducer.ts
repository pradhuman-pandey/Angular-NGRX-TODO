import { createReducer, on } from '@ngrx/store';
import { showLoader, hideLoader } from './loader.actions';
import { LoaderState, initialLoaderState } from './loader.state';


export const loaderReducer = createReducer(
    initialLoaderState,
    on(showLoader, state => ({...state, loading: true})),
    on(hideLoader, state => ({...state, loading:false}))
)