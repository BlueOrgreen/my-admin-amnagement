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
