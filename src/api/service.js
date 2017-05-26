import xFetch, { get, post } from '../util/xFetch';

const API = {
  SERVICES_QUERY: '/km-service/services/list.json',
  SERVICES_SAVE: '/km-service/services/add.json',
  SERVICES_REMOVE: '/km-service/services/remove.json',
  SERVICES_DETAIL: '/km-service/services/detail.json'
}
// 查询服务列表
export const query = async ({ page, size, key }) => get(API.SERVICES_QUERY, { page, size, key });
