# Dr.小程序前端

> 独立于后端代码，打包后被引入到后端静态项目中

## Installation

### 开发环境

### vscode

为了可以使用 vscode 编写代码：

开发者工具菜单栏——设置——编辑设置：勾选保存时自动编译小程序

参考文档：

https://www.cnblogs.com/ljl-zszy/p/11917854.html

#### npm & wux-weap

新建 npm 项目

```
npm i -y

# Using npm
npm i wux-weapp -S --production

```

开发者工具菜单栏——工具——构建 npm

之后按照官网说明使用：

https://www.wuxui.com/#/quickstart

#### ColorUI

下载 ColorUI

https://github.com/weilanwl/ColorUI

下载源码包可得到 Demo 和 Template 两个项目，Demo 包含所有组件源码。Template 是一个已经引用了 ColorUI 的空白模板。Demo 即文档。

参考文档

https://www.jianshu.com/p/be8c1f5351c3

1. 将 demo 文件夹下的 colorui 文件夹拷贝到项目根目录(components 里面有顶部组件)
2. 在 app.wxss 引入 colorui 文件夹的 icon.wxss 和 main.wxss
3. 自己封装的组件里面也需要引入这两个样式文件。

```
@import 'colorui/main.wxss';
@import 'colorui/icon.wxss';
```
