<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const activeSection = ref("hero");
const sections = ["hero", "about", "skills", "projects", "experience", "contact"];

const form = ref({ name: "", email: "", message: "" });
const formStatus = ref("");

const handleSubmit = () => {
  if (!form.value.name || !form.value.email || !form.value.message) {
    formStatus.value = "请填写所有字段";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    formStatus.value = "请输入有效的邮箱地址";
    return;
  }
  formStatus.value = "消息发送成功！(演示功能)";
  form.value = { name: "", email: "", message: "" };
  setTimeout(() => { formStatus.value = ""; }, 3000);
};

const handleScroll = () => {
  const scrollY = window.scrollY + 100;
  for (const id of sections) {
    const el = document.getElementById(id);
    if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
      activeSection.value = id;
      break;
    }
  }
};

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

// Intersection Observer for fade-in animations
const setupObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  setupObserver();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#0f172a] text-gray-800 dark:text-gray-200 transition-colors duration-300">
    <!-- Navbar -->
    <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#0f172a]/80 border-b border-gray-200 dark:border-gray-700/50 transition-colors duration-300">
      <div class="max-w-1100px mx-auto px-24 md:px-48 h-16 flex items-center justify-between">
        <button @click="scrollTo('hero')" class="text-xl font-bold gradient-text">BZ.Chen</button>
        <div class="flex items-center gap-6">
          <button v-for="s in sections" :key="s" @click="scrollTo(s)"
            class="text-sm font-medium capitalize transition-colors duration-200"
            :class="activeSection === s ? 'text-[#3b82f6] dark:text-[#60a5fa]' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'"
          >{{ s === "hero" ? "首页" : s === "about" ? "关于" : s === "skills" ? "技能" : s === "projects" ? "项目" : s === "experience" ? "经历" : "联系" }}</button>
          <button @click="toggleDark()" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300" :title="isDark ? '切换亮色模式' : '切换暗色模式'">
            <svg v-if="!isDark" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
            <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="hero" class="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#1e1f2e] pointer-events-none"></div>
      <div class="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      <div class="relative text-center px-24">
        <div class="fade-in">
          <div class="w-28 h-28 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-blue-500/20">陈</div>
          <h1 class="text-5 md:text-6 lg:text-7 font-extrabold mb-4">
            <span class="gradient-text">陈秉政</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-2 font-medium">AI大模型应用开发工程师</p>
          <p class="text-gray-500 dark:text-gray-400 mb-10 max-w-600px mx-auto leading-relaxed">
            网络工程专业 · 华为HCIA认证 · 专注AI大模型与RAG技术落地
          </p>
          <div class="flex items-center justify-center gap-4">
            <button @click="scrollTo('projects')" class="btn-primary text-base">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              查看项目
            </button>
            <button @click="scrollTo('contact')" class="btn-outline text-base">联系我</button>
          </div>
        </div>
        <!-- Scroll indicator -->
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg class="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-24 md:py-32 bg-gray-50/50 dark:bg-[#1e293b]/30">
      <div class="section-container">
        <h2 class="section-title fade-in">
          <span class="gradient-text">关于我</span>
        </h2>
        <p class="text-center text-gray-500 dark:text-gray-400 mb-16 max-w-700px mx-auto fade-in">
          从网络工程到AI大模型应用开发，我始终相信跨界融合的力量
        </p>
        <div class="grid md:grid-cols-2 gap-8 fade-in">
          <div class="card">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
              </div>
              <h3 class="text-lg font-bold">教育背景</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300">蚌埠学院 · 网络工程 · 本科</p>
            <p class="text-sm text-gray-400 dark:text-gray-500">2022.09 - 2026.07 · 专业成绩前20%</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-3">主修：交换与路由、云计算、SDN、防火墙、Linux系统、计算机网络原理</p>
          </div>
          <div class="card">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
              <h3 class="text-lg font-bold">认证与定位</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300">华为 OpenEuler HCIA 认证</p>
            <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">国产操作系统运维与应用部署专业能力</p>
            <p class="mt-4 text-gray-600 dark:text-gray-300"><span class="font-semibold">跨界定位：</span>网络工程 → AI大模型应用开发</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">专注于网络运维与AI技术交叉领域</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="py-24 md:py-32">
      <div class="section-container">
        <h2 class="section-title fade-in">
          <span class="gradient-text">技术能力</span>
        </h2>
        <p class="text-center text-gray-500 dark:text-gray-400 mb-16 fade-in">我的技术栈覆盖AI应用开发与网络工程两大领域</p>
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="(group, idx) in [
            { title: '精通', items: ['Python后端开发 (Flask, FastAPI)', '大模型应用开发', 'Claude Code / Codex 等 AI 工具'], color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-700 dark:text-blue-300' },
            { title: '熟练', items: ['RAG检索增强生成架构', 'LangChain框架', 'Shell脚本编写', '交换机/路由器配置调试'], color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800', text: 'text-purple-700 dark:text-purple-300' },
            { title: '掌握', items: ['ComfyUI工作流搭建', '图片/视频生成模型部署', 'Vue.js前端开发', 'Milvus向量数据库'], color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-700 dark:text-emerald-300' }
          ]" :key="idx" class="fade-in" :style="{ transitionDelay: idx * 100 + 'ms' }">
            <div class="card border-t-4" :class="group.border">
              <div class="flex items-center gap-2 mb-4">
                <div class="h-3 w-3 rounded-full" :class="'bg-gradient-to-r ' + group.color"></div>
                <h3 class="text-lg font-bold" :class="group.text">{{ group.title }}</h3>
              </div>
              <ul class="space-y-3">
                <li v-for="(item, i) in group.items" :key="i" class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <svg class="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-24 md:py-32 bg-gray-50/50 dark:bg-[#1e293b]/30">
      <div class="section-container">
        <h2 class="section-title fade-in">
          <span class="gradient-text">项目经历</span>
        </h2>
        <p class="text-center text-gray-500 dark:text-gray-400 mb-16 fade-in">通过实际项目验证技术能力</p>
        <div class="space-y-8">
          <!-- PDF-QA 项目 -->
          <div class="card fade-in">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  </div>
                  <h3 class="text-xl font-bold">PDF-QA 智能问答机器人</h3>
                </div>
                <p class="text-sm text-gray-400 dark:text-gray-500">项目独立开发者 · 2026.05 - 2026.06</p>
              </div>
              <a href="https://github.com/cbz147258-art/PDF-QA.git" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">FastAPI</span>
              <span class="px-3 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">DeepSeek</span>
              <span class="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">RAG</span>
              <span class="px-3 py-1 text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full">LangChain</span>
              <span class="px-3 py-1 text-xs font-medium bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full">Milvus</span>
              <span class="px-3 py-1 text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full">Vue.js</span>
            </div>
            <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>FastAPI构建高性能后端，集成DeepSeek大模型实现高精度语义理解与答案生成，答案准确率达87%</li>
              <li class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>RAG架构实现单文档1000页以上内容的问答需求，毫秒级语义检索，较传统关键词匹配提升90%</li>
              <li class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>独立开发Vue.js前端单页应用，支持PDF拖拽上传、实时聊天交互及历史记录回溯</li>
              <li class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>扩展简历优化模块，基于DeepSeek + STAR法则实现简历智能分析与多维度评分</li>
            </ul>
          </div>

          <!-- 网络备份系统 -->
          <div class="card fade-in">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>
                  </div>
                  <h3 class="text-xl font-bold">华为网络设备配置备份系统</h3>
                </div>
                <p class="text-sm text-gray-400 dark:text-gray-500">项目开发者 · 2025.09 - 2026.05</p>
              </div>
              <a href="https://github.com/cbz147258-art/NetworkBackupTool.git" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-3 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full">Flask</span>
              <span class="px-3 py-1 text-xs font-medium bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full">SSH</span>
              <span class="px-3 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">APScheduler</span>
              <span class="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full">华为/H3C设备</span>
            </div>
            <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>基于Flask开发后端管理平台，通过SSH对接华为、H3C等5类厂商设备，覆盖200+台在用设备</li>
              <li class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>内置版本差异比对引擎，配置故障恢复时间从2小时缩短至10分钟以内</li>
              <li class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>集成APScheduler实现周期性自动备份，设计多用户权限体系与设备健康状态仪表盘</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="py-24 md:py-32">
      <div class="section-container">
        <h2 class="section-title fade-in">
          <span class="gradient-text">实习经历</span>
        </h2>
        <p class="text-center text-gray-500 dark:text-gray-400 mb-16 fade-in">在真实场景中锤炼技术</p>
        <div class="max-w-800px mx-auto">
          <div class="card fade-in relative pl-8 md:pl-12 before:absolute before:left-3 md:before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-[#3b82f6] before:to-[#8b5cf6]">
            <div class="absolute left-0 md:left-1 top-6 w-6 md:w-7 h-6 md:h-7 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-white">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20 7h-4V4l-2-2h-4L8 4v3H4v5h4l1 2v4h2v4h2v-4h2v-4l1-2h4V7z"/></svg>
            </div>
            <div class="ml-2">
              <h3 class="text-xl font-bold">大模型开发工程师（实习）</h3>
              <p class="text-[#3b82f6] dark:text-[#60a5fa] font-medium">安徽国兰网络科技有限公司</p>
              <p class="text-sm text-gray-400 dark:text-gray-500 mb-6">2025.09 - 2026.01</p>
              <ul class="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>协同设计团队开展需求调研与分析，梳理AI生产工具落地场景与功能要求，形成可落地的技术执行方案</li>
                <li class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>在企业服务器端完成多模态大模型的环境配置与部署上线，基于ComfyUI搭建AI生成工作流</li>
                <li class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>助力团队生产效率提升<span class="font-bold text-blue-600 dark:text-blue-400">200%</span></li>
                <li class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>参与文本-图片-视频场景的工作流智能体开发，完成各模块API接口的开发与联调</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-24 md:py-32 bg-gray-50/50 dark:bg-[#1e293b]/30">
      <div class="section-container">
        <h2 class="section-title fade-in">
          <span class="gradient-text">联系方式</span>
        </h2>
        <p class="text-center text-gray-500 dark:text-gray-400 mb-16 fade-in">欢迎通过以下方式与我取得联系</p>
        <div class="max-w-800px mx-auto grid md:grid-cols-2 gap-8 fade-in">
          <div class="space-y-6">
            <div class="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-[#1e1f2e] shadow-sm">
              <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <p class="text-sm text-gray-400 dark:text-gray-500">邮箱</p>
                <p class="text-gray-800 dark:text-gray-200 font-medium">1354079141@qq.com</p>
              </div>
            </div>
            <div class="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-[#1e1f2e] shadow-sm">
              <div class="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </div>
              <div>
                <p class="text-sm text-gray-400 dark:text-gray-500">电话</p>
                <p class="text-gray-800 dark:text-gray-200 font-medium">18755475671</p>
              </div>
            </div>
            <a href="https://github.com/cbz147258-art" target="_blank" rel="noopener noreferrer" class="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-[#1e1f2e] shadow-sm hover:shadow-md transition-shadow group">
              <div class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </div>
              <div>
                <p class="text-sm text-gray-400 dark:text-gray-500">GitHub</p>
                <p class="text-gray-800 dark:text-gray-200 font-medium group-hover:text-[#3b82f6] transition-colors">@cbz147258-art</p>
              </div>
            </a>
          </div>

          <!-- Contact Form -->
          <form @submit.prevent="handleSubmit" class="bg-white dark:bg-[#1e1f2e] rounded-xl shadow-lg p-6 md:p-8">
            <h3 class="text-lg font-bold mb-6">发送消息</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">姓名</label>
                <input type="text" v-model="form.name" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f172a] text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none transition-all" placeholder="你的姓名">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">邮箱</label>
                <input type="email" v-model="form.email" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f172a] text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none transition-all" placeholder="your@email.com">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">消息</label>
                <textarea v-model="form.message" rows="4" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f172a] text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none transition-all resize-none" placeholder="想说的话..."></textarea>
              </div>
              <button type="submit" class="btn-primary w-full justify-center text-base">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                发送消息
              </button>
              <p v-if="formStatus" class="text-sm text-center" :class="formStatus.includes('成功') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">{{ formStatus }}</p>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 border-t border-gray-200 dark:border-gray-700/50">
      <div class="max-w-1100px mx-auto px-24 md:px-48 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm text-gray-400 dark:text-gray-500">© 2026 陈秉政 · All Rights Reserved</p>
        <div class="flex items-center gap-4">
          <p class="text-sm text-gray-400 dark:text-gray-500">Build with ❤️ using Vue 3 + UnoCSS</p>
        </div>
      </div>
    </footer>
  </div>
</template>
