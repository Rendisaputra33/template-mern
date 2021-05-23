import axios from "axios";
import { CHAT_USER, LOAD_CHAT } from "./types";
import { CHAT_SERVER } from "../components/Config.js";

export function getChats() {
  const request = axios
    .get(`${CHAT_SERVER}/getchat`)
    .then((response) => response.data);

  return {
    type: CHAT_USER,
    payload: request,
  };
}

export function loadChat(request) {
  return {
    type: LOAD_CHAT,
    payload: request,
  };
}
