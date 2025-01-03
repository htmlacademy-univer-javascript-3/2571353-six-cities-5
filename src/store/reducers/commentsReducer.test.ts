import {commentsReducer} from './commentsReducer';
import {clearComments, setComments, setCommentsLoadingStatus} from '../action';
import {LoadingStatus} from '../../utils/const';
import {TReview} from '../../utils/types';

describe('commentsReducer', () => {
  const initialState = {
    comments: [],
    isCommentsDataLoading: LoadingStatus.Init,
  };

  const mockComment: TReview = {
    id: 1,
    date: '2023-10-01T12:34:56Z',
    user: {
      name: 'John Doe',
      avatarUrl: '/img/avatar.jpg',
      isPro: true,
    },
    comment: 'Great place!',
    rating: 5,
  };

  it('should return the initial state by default', () => {
    expect(commentsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setComments action', () => {
    const mockComments = [mockComment];
    expect(commentsReducer(initialState, setComments(mockComments))).toEqual({
      ...initialState,
      comments: mockComments,
    });
  });

  it('should handle clearComments action', () => {
    const stateWithComments = {
      comments: [mockComment],
      isCommentsDataLoading: LoadingStatus.Success,
    };

    expect(commentsReducer(stateWithComments, clearComments())).toEqual({
      ...initialState,
      comments: [],
      isCommentsDataLoading: LoadingStatus.Init,
    });
  });

  it('should handle setCommentsLoadingStatus action', () => {
    expect(
      commentsReducer(initialState, setCommentsLoadingStatus(LoadingStatus.Pending))
    ).toEqual({
      ...initialState,
      isCommentsDataLoading: LoadingStatus.Pending,
    });
  });
});
