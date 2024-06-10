import { createStore } from "redux";
import Followers from "../models/followers";

// 1. Global state for Followers
export class FollowersState {
  public followers: Followers[] = [];
}

// 2. Action Type
export enum FollowersActionType { // what types of actions do we want to enable on the data itself
  Follow = "Follow",
  Unfollow = "Unfollow",
}

// 3. Action Object
export type FollowersPayload = Followers[] | Followers | string;
export interface FollowersAction {
  type: FollowersActionType;
  payload: FollowersPayload; // בעברית: מטען this is the specific data that is delivered with the action
}

// 4. Reducer ()
export function followersReducer(
  currentState = new FollowersState(),
  action: FollowersAction
): FollowersState {
  const newState = { ...currentState }; // this is called cloning - שיכפול

  // .....
  switch (action.type) {
    case FollowersActionType.Follow: // payload here will be an array of Followers: Followers[]
      newState.followers = action.payload as Followers[];
      break;
    case FollowersActionType.Unfollow:
      newState.followers = action.payload as Followers[];
      break;
  }

  return newState;
}

// 5. store
export const followersStore = createStore(followersReducer);
