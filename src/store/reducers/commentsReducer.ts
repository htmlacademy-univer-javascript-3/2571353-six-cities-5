import {createReducer} from '@reduxjs/toolkit';
import {clearComments, setComments, setCommentsLoadingStatus} from '../action.ts';
import {TReview} from '../../utils/types.ts';
import {LoadingStatus} from '../../utils/const.ts';

type CommentsState = {
  comments: TReview[];
  isCommentsDataLoading: LoadingStatus;
};

const initialState: CommentsState = {
  comments: [],
  isCommentsDataLoading: LoadingStatus.Init,
};

const commentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(clearComments, (state) => {
      state.comments = [];
      state.isCommentsDataLoading = LoadingStatus.Init;
    })
    .addCase(setCommentsLoadingStatus, (state, action) => {
      state.isCommentsDataLoading = action.payload;
    });
});

export {commentsReducer};
