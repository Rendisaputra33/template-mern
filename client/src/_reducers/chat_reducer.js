import { CHAT_USER } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case CHAT_USER:
      return { ...state, chats: action.payload };
    default:
      return state;
  }
}
