const baseUrl = "https://api-hmugo-web.itheima.net";

function request(options) {
  return new Promise((resolve, reject) => {
    // 封装现实loading
    if (!options.loading) {
      wx.showLoading({
        title: '加载...',
        mask: true
      });
    }
    wx.request({
      url: baseUrl + options.url,
	  data: options.data || {},
      success: res => {
        let {
          meta,
          message
        } = res.data;
        if (meta.status === 200) {
          resolve(message);
        }
      },
      // 请求完成 结束loading
      complete() {
        if (!options.loading) {
          wx.hideLoading();
        }
      }
    });
  });
}

export default request;
