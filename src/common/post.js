import axios from 'axios';
import { ADMIN_HIVE_API_TOKEN } from './localStorageKey'
import { ADMIN_HIVE_HOST } from './host'
import localStore from './localStore'

export function postLogin(url, params) {
    let result = axios({
        method: 'post',
        url: ADMIN_HIVE_HOST + url,
        data: params,
        // contentType:false,
        // processData:false,
        headers: {
            // "token":localStore.getItem(HIVE_API_TOKEN),
            'content-type': 'application/json'
        }
    });
    return result;
}

export function post(url, params) {
    let result = axios({
        method: 'post',
        url: ADMIN_HIVE_HOST + url,
        data: params,
        //  contentType:false,
        processData: false,
        headers: {
            "token": localStore.getItem(ADMIN_HIVE_API_TOKEN),
            'content-type': 'application/json'
        }
    });
    return result;
}

export function get(url, params) {
    let result = axios({
        method: 'get',
        url: ADMIN_HIVE_HOST + url,
        data: params,
        // contentType:false,
        // processData:false,
        headers: {
            "token": localStore.getItem(ADMIN_HIVE_API_TOKEN),
            'content-type': 'application/json'
        }
    });
    return result;
}