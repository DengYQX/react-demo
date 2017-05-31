import xFetch, {
  get,
  post
} from '../util/xFetch';
// 查询服务列表
export const query = async({
  params
}) => post('/km-service/testEchartsObject.json', {
  params
});

export const user = async({
  name, password
}) => post('/km-service/user.json', {
  name, password
});
// 新增、修改
export const save = async data => post('/api/home/list.json'.HOME_SAVE, data);
// 删除
export const remove = async({
  id
}) => post('/api/home/remove.json'.HOME_REMOVE, {
  id
});
