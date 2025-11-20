---
title: Github Actions 打包工具切换到 pnpm
sticky: 999
description: Github Actions 打包工具切换到pnpm
tag:
 - Github
---

# Github Actions 打包工具切换到 npnm

:::warning 注意事项
当你提交代码的时候, Github 会自动部署代码;

当然, 如果没有进行充分的测试, 那么就会: 自动一时爽, 提交火葬场
:::


**pnpm 版本:** 10.14.0 

```sh
pnpm -v
```

# 一、配置 GitHub Actions

## 1. 为什么要用pnpm

PNPM，意为高性能的NPM，PNPM通过其创新的全局存储和链接机制，提供了一个节省磁盘空间且性能出色的包管理方案。

### PNPM的工作方式
- pnpm init：初始化一个新项目，类似于npm init或yarn init。
- pnpm install <package_name>：安装包及其依赖。
- pnpm list：列出项目中安装的包。
- pnpm remove <package_name>：移除一个包。
- pnpm run <script_name>：运行package.json文件中定义的脚本。

### PNPM的优点

1. 磁盘效率：PNPM使用全局存储方法，所有包在一个地方全局存储，不像NPM或Yarn那样。
安装包时，PNPM会从全局存储中链接文件到项目的node_modules，因此我们不需要在每个应用中重复存储包，这使得它在磁盘使用上非常高效。
2. 锁文件：尽管PNPM使用非平面的内部结构，但它通过一个称为锁文件（通常命名为pnpm-lock.yaml）的文件提供了依赖项的“扁平化视图”。
3. 更快更轻：与NPM或YARN相比，PNPM更快、更轻，因为它利用缓存，并不是每次都安装包。
如果包在全局中找到，它将在该项目/应用的node_module中附加符号链接/硬链接。


## 2. 使用pnpm的步骤

在GitHub Actions中使用pnpm而不是npm主要包括以下几个步骤：

1. 设置 Node.js 环境： 在GitHub Action工作流中，首先需要使用actions/setup-node来设置 Node.js 的环境。

2. 安装 pnpm： Node.js 环境设置完成后，下一步是安装pnpm。

3. 使用 pnpm 运行命令： 一旦pnpm安装完成，就可以使用它来安装依赖、运行脚本等。


## 3. 修改 Workflow 文件

在项目根目录创建 .github/workflows/deploy-cloud.yml 文件：

你可以参考我的工作流配置

```

 # Steps represent a sequence of tasks that will be executed as part of the job
    steps:

      # 步骤 1: 检出代码
      # 使用官方的 checkout Action，从仓库检出代码
      - uses: actions/checkout@v4 
        with:
            fetch-depth: 0 

      # 步骤 2: 安装pnpm
      - uses: pnpm/action-setup@v4
        name: Install pnpm
        with:
          version: 10.14.0 
          run_install: false

      # 步骤 3: 设置 Node.js 环境
      - name: ✅Setup Node.js
        # 使用官方的 Node.js Action
        uses: actions/setup-node@v4 
        with:
          # 指定使用的 Node.js 版本为 20
          node-version: 20
           # 默认配置
          cache: pnpm

      # 步骤 4: 安装依赖
      - name: Install Dependencies
        # 使用 pnpm 安装项目依赖
        run: pnpm install 

      # 步骤 5: 构建项目
      - name: 🔄️Build
        # 执行项目的构建脚本
        run: pnpm run build

```

这个工作流程文件定义了一个CI工作流程，在每次推送到main分支或者对main分支的拉取请求时触发。

:::warning 注意事项
工作流包括：
1. 通过actions/checkout@v4 检出代码。
2. 通过pnpm/action-setup@v4安装pnpm, 指定版本。
3. 使用actions/setup-node@v4 来设置 Node.js 环境，指定 pnpm作为缓存方法。
4. 使用pnpm安装项目依赖。
5. 构建项目
:::

这个流程会在Node.js -v20版本环境下运行，即 20.x ，确保了版本。

请注意，从setup-node@v2起，GitHub Actions 提供了对pnpm缓存的原生支持，所以我们可以通过设置cache选项来利用这一特性，以加快后续工作流的运行速度。

