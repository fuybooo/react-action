import settings from '../../settings';
const mockPath = '../assets/mock';
const urls = {
  login: '/login',
  logout: '/logout',
  get_users_and_devices_number: '/get_users_and_devices_number',
  get_sensitive_word_list: '/get_sensitive_word_list',
  get_illegal_url_list: '/get_illegal_url_list',
  get_illegal_device_list: '/get_illegal_device_list',
};
for (const url in urls) {
  if (urls.hasOwnProperty(url)) {
    if (settings.isStatic) {
      urls[url] = mockPath + urls[url] + '.json';
    } else {
      urls[url] = settings.path + urls[url];
    }
  }
}
export default urls;
export interface HttpRes {
  code: string;
  msg: string;
  data: any | {
    result: any[]
  }
}