# 管理系统

## 安装并启动

```bash
node 版本 16

npm install

npm run dev
```

**frame** 基本框架部分
**main** 所有

## 打包配置

**rsbuild**

```bash
"@rsbuild/core": "0.6.15",
"@rsbuild/plugin-babel": "0.6.15",
"@rsbuild/plugin-lightningcss": "0.6.15",
"@rsbuild/plugin-react": "0.6.15",
"@rsbuild/plugin-stylus": "0.6.15",
"@rsbuild/plugin-svgr": "0.6.15",
"@rsbuild/plugin-type-check": "0.6.15",
```

## 项目代码规范

**eslint**  **prettier** **lint-staged**


## 全局状态管理

**zustand**

- 菜单存储
- 权限规则存储
- 用户身份存储


## 组件积累

**权限类：**  `Auth`  `AuthPage`


## 功能项

可参考功能项，可用于管理后台中

### 布局

- 查询表单布局 **src/pages/permission/organization/index.tsx**

### 表单

- 动态表单 + 可拖动 Tab栏 **src/pages/permission/application/index.tsx**

### 组件类

- [x] 带上传进度以及上传异常情况 - 上传组件
- [x] 禁止选择日期、时分秒 - 时间选择组件
- [x] 可伸缩 - 侧边栏组件
- [x] 针对svg - SvgIcon

### 打包类

**Rsbuild**

- [x] WebUpdateNotificationPlugin 版本更新插件提示


**Webpack**

webpack 打包配置 **build** 目录下


## 上传图片等资源到OSS

`scripts/upload.ts`

一般情况下，将项目的图标放到`src/icons/svg`文件夹内，然后通过上面的`ScgIcon`组件引入即可使用，无需上传到OSS使用。

但是，对于侧边栏的图标等一些场景，需要一个`OSS URL`地址的话，那么可使用项目内包含的`scripts/upload.ts` 脚本，一键上传到公司的OSS等静态资源服务器

1. 把在 `MasterGo` 或者其他地方下载的图标/图片等资源放到项目任何一个文件夹，推荐新建一个临时tmp文件夹来放
2. 执行 `yarn upload` 命令，该命令会启动 `scripts/upload.ts` 脚本，根据提示选择该tmp文件夹，可将文件夹的图片等资源上传到服务器
3. 上传成功后，会在控制台显示上传文件和对应的 `OSS URL`，同时，也会在该文件夹生成一个包含图片以及对应的oss地址的 `map.json` 文件
4. 上传以及录入地址完毕后，可将该tmp文件夹删除（资源已经在OSS托管了，无需放到项目代码里面，减少项目体积）




