import xFetch, { get, post } from '../util/xFetch';
// 查询服务列表
export const query = async ({ page, size, key }) => get('/api/services/list.json'.SERVICES_QUERY, { page, size, key });
// 新增、修改
export const save = async data => post('/api/services/list.json'.SERVICES_SAVE, data);
// 删除
export const remove = async ({ id }) => post('/api/services/remove.json'.SERVICES_REMOVE, { id });
