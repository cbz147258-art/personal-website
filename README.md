# 个人介绍网站 - 陈秉政

> AI 工具实战测试题 · 使用 Codex CLI 构建

## 在线链接

部署完成后提供：`https://personal-website-*.vercel.app`

## 技术栈

- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite 8
- **样式方案**: UnoCSS (原子化CSS)
- **状态/工具**: VueUse (useDark, useToggle)
- **部署**: Vercel

## 项目结构

```
personal-website/
├── index.html          # 入口 HTML
├── src/
│   ├── main.ts         # 应用入口
│   └── App.vue         # 单页应用主组件（含所有区块）
├── uno.config.ts       # UnoCSS 配置
├── vite.config.ts      # Vite 配置
├── vercel.json         # Vercel 部署配置
└── README.md           # 本文件
```

## 页面区块

1. **Hero** — 个人品牌展示（姓名 + 定位 + CTA按钮）
2. **关于我** — 教育背景 + HCIA认证 + 跨界定位
3. **技能矩阵** — 精通/熟练/掌握 三层技能展示
4. **项目经历** — PDF-QA智能问答机器人 + 华为网络设备配置备份系统
5. **实习经历** — 安徽国兰网络科技实习亮点
6. **联系方式** — 邮箱/电话/GitHub + 联系表单

## 交互功能

- ✨ 滚动渐入动画（IntersectionObserver）
- 🌓 暗色/亮色主题切换（useDark + localStorage持久化）
- 📌 固定导航栏 + 滚动高亮当前区块
- 🎯 平滑滚动导航
- 🃏 项目卡片 hover 动效

---

## AI 使用说明

### 1. 使用的 AI 工具

- **Codex CLI** — 主要开发工具，用于代码生成、调试、部署全流程
- GitHub Copilot (可选辅助)

### 2. AI 帮助完成了哪些工作

- 需求分析与项目框架设计
- 项目脚手架搭建（Vite + Vue3 + TypeScript 初始化）
- UnoCSS 配置与 shortcuts 设计
- 全部 Vue 组件代码生成（App.vue 单页应用）
- 响应式布局与暗色模式实现
- 动画交互（滚动渐入、IntersectionObserver）
- 部署配置（vercel.json）
- Git 版本管理

### 3. 手动修改了哪些内容

- 个人信息数据核对与填充（简历中的具体内容）
- 导航栏关闭标签修复（`<text-white>` → `</button>`）
- 联系表单逻辑补充（表单验证、提交反馈）
- CSS reset 依赖安装（`@unocss/reset`）
- favicon SVG 创建

### 4. 遇到的问题及通过 AI 解决

| 问题 | 解决方案 |
|------|----------|
| PowerShell 与 Node 命令的转义冲突 | 通过写 .cjs 脚本文件执行，避免内联命令 |
| `@unocss/reset/tailwind.css` 未安装导致的构建失败 | AI 识别报错后自动安装依赖 |
| 模板中 `<text-white>` 拼写错误导致渲染异常 | AI 诊断并修复为正确的 `</button>` |
| VueUse `#__PURE__` 注释引发 Rolldown 警告 | 确认无害警告，无需处理 |
| 构建类型检查通过但样式导入缺失 | 安装 `@unocss/reset` 包解决 |

### 5. 最终网站链接

```
（待部署后补充）
```

## 启动与部署

```bash
# 本地开发
npm run dev

# 构建
npm run build

# 部署到 Vercel
npx vercel --prod
```
