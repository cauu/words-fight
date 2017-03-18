import {FetchWithPopover} from "./common-service.js";
import {API} from "../config";

const fetchWithPopover = new FetchWithPopover();


export function login(param = {
  username: '',
  password: ''
}) {
  return fetchWithPopover.send({
    method: 'POST',
    url: API.login,
    param
  });
};
