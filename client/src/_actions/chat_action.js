import axios from "axios";
import { CHAT_USER } from "./types";
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
