import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoaderState } from './loader.state'; // Import the LoaderState model

export const selectLoaderState = createFeatureSelector<LoaderState>('loader');

export const selectIsLoading = createSelector(
    selectLoaderState,
    (state: LoaderState) => state.loading // Select the loading property
);
