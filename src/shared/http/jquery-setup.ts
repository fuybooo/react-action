import * as $ from 'jquery';
$.ajaxSetup({
  xhrFields: {
    withCredentials: true
  },
  crossDomain: true,
});
$.ajaxPrefilter((options, originOptions, jqXHR) => {
  if (options.type === 'post') {
    options.contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
  }
});