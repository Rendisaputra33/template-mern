import { CHAT_USER, LOAD_CHAT } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case CHAT_USER:
      return { ...state, chats: action.payload };
    case LOAD_CHAT:
      return { ...state, chats: state.chats.concat(action.payload) };
    default:
      return state;
  }
}
