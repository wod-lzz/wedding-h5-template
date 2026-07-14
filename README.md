# 独立 H5 结婚请柬模板

## 快速使用

1. 用文本编辑器打开 `config.js`，修改新人姓名、日期、地点、地图链接与流程。
2. 用自己的正方形照片替换 `assets/wedding-photo.webp`，文件名保持不变。
3. 双击 `index.html` 即可在浏览器预览。
4. 将整个文件夹上传至 Cloudflare Pages、Netlify、GitHub Pages、OSS/COS 或自己的服务器。

## 腾讯地图

页面已支持腾讯位置服务 JavaScript API v2 的内嵌地图。到腾讯位置服务控制台创建浏览器端 Key 后，填写 `config.js` 中的 `tencentMap.key`，并将 `latitude`、`longitude` 与 `zoom` 改为婚礼地点的坐标和缩放级别。

未填写 Key 时，页面不会加载地图服务，宾客仍可通过“查看地图导航”跳转至腾讯地图。

## 回执说明

未填写 `rsvpEndpoint` 时，回执仅保存在宾客当前浏览器，不会汇总。若有接收 JSON POST 的接口，将地址填入 `config.js` 的 `rsvpEndpoint` 即可提交到服务器。

## 图片建议

- 使用正方形图片，建议 1200×1200。
- 建议控制在 1 MB 内，以保证微信内打开速度。
- 可使用 PNG、JPG 或 WebP；更换扩展名后同步修改 `config.js`。
