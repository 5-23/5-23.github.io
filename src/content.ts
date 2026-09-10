export type FieldIcon = "status" | "priority" | "assignee" | "stack";

export type ActivityIcon = "create" | "progress" | "priority" | "assign" | "note" | "label";

export type LinkIcon = "github" | "package";

export interface SubIssue {
  title: string;
  state: "done" | "open";
  label: string;
}

export interface TimelineItem {
  icon: ActivityIcon;
  text: string;
  meta: string;
}

export interface Achievement {
  date: string;
  title: string;
  href?: string;
}

export interface ContactItem {
  label: string;
  value: string;
  href: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  icon: LinkIcon;
}

export interface Project {
  name: string;
  description: string;
  links: ProjectLink[];
}

export interface HeroFact {
  label: string;
  value: string;
  icon: FieldIcon;
}

export interface Content {
  brand: string;
  heroStatus: string;
  heroTitle: string;
  heroStatement: [string, string];
  heroRoles: string[];
  heroDescription: string;
  heroLabels: string[];
  actions: { contact: string; visitBlog: string };
  summary: { label: string; text: string };
  sections: {
    achievements: string;
    projects: string;
    focus: string;
    skills: string;
    activity: string;
    contact: string;
  };
  states: { done: string; open: string };
  controls: {
    openQuickMenu: string;
    scrollToContact: string;
    openBlog: string;
    copyEmail: string;
    language: string;
  };
  commandMenu: {
    placeholder: string;
    empty: string;
    navigate: string;
    actions: string;
    language: string;
  };
  github: { stars: string; failed: string };
  copiedEmail: string;
  footer: string;
  contactHeadline: string;
  contactText: string;
  heroFacts: HeroFact[];
  skillHighlights: string[];
  subIssues: SubIssue[];
  timeline: TimelineItem[];
  achievements: Achievement[];
  contacts: ContactItem[];
  projects: Project[];
}

export type Lang = "ko" | "en";

export const translations: Record<Lang, Content> = {
  ko: {
    brand: "Asta",
    heroStatus: "Open to work",
    heroTitle: "유한별",
    heroStatement: ["픽셀부터", "프로토콜까지."],
    heroRoles: ["Frontend", "Backend", "Rust"],
    heroDescription:
      "웹 퍼블리싱으로 시작해 React와 Tailwind CSS로 프론트엔드 감각을 다져왔고, Flask, FastAPI, Rust까지 확장하며 백엔드 구현 경험을 쌓아왔습니다. 사용자 경험이 좋은 화면과 안정적인 서비스 구조를 함께 만드는 개발자를 지향합니다.",
    heroLabels: ["React", "Tailwind CSS", "Rust"],
    actions: { contact: "Contact", visitBlog: "Visit Blog" },
    summary: {
      label: "Intro",
      text: "프론트엔드에서는 React와 Tailwind CSS로 사용자 경험과 화면 완성도를 다듬고, 백엔드에서는 FastAPI와 Rust로 안정적인 서비스 구조를 구현합니다. 화면과 시스템을 분리해서 보기보다 함께 설계하는 방식을 선호합니다.",
    },
    sections: {
      achievements: "Achievements",
      projects: "Projects",
      focus: "Focus",
      skills: "Skills",
      activity: "Activity",
      contact: "Contact",
    },
    states: { done: "완료", open: "진행 중" },
    controls: {
      openQuickMenu: "빠른 메뉴 열기",
      scrollToContact: "연락 섹션으로 이동",
      openBlog: "블로그 열기",
      copyEmail: "이메일 복사",
      language: "언어 전환",
    },
    commandMenu: {
      placeholder: "명령어를 검색하세요...",
      empty: "결과가 없습니다",
      navigate: "이동",
      actions: "액션",
      language: "언어",
    },
    github: { stars: "GitHub stars", failed: "스타 수를 불러오지 못했습니다" },
    copiedEmail: "이메일을 클립보드에 복사했습니다",
    footer: "© 2026 유한별 · React와 Tailwind CSS로 직접 만들었습니다",
    contactHeadline: "같이 재밌는 걸 만들어요.",
    contactText: "함께 작업하고 싶다면 이메일, 전화, 블로그 어디로든 편하게 연락 주세요.",
    heroFacts: [
      { label: "Status", value: "Open to work", icon: "status" },
      { label: "Focus", value: "Frontend + Backend", icon: "priority" },
      { label: "Based in", value: "Seoul, Korea", icon: "assignee" },
      { label: "Stack", value: "React, FastAPI, Rust", icon: "stack" },
    ],
    skillHighlights: ["React", "Tailwind CSS", "JavaScript", "FastAPI", "Rust", "Axum", "Redis", "MongoDB"],
    subIssues: [
      { title: "사용성과 구조를 함께 보는 개발 방식", state: "done", label: "Feature" },
      { title: "FastAPI와 Rust 중심의 백엔드 경험", state: "done", label: "Backend" },
      { title: "React, Tailwind CSS 기반의 프론트 감도", state: "done", label: "Frontend" },
      { title: "안정적이고 확장 가능한 서비스에 대한 관심", state: "done", label: "Architecture" },
    ],
    timeline: [
      { icon: "create", text: "웹 퍼블리싱을 시작점으로 개발의 폭을 넓히기 시작했습니다.", meta: "출발점" },
      { icon: "progress", text: "FastAPI와 Flask를 학습하며 백엔드 중심으로 구현 경험을 확장했습니다.", meta: "backend focus" },
      { icon: "priority", text: "Rust를 꾸준히 학습하며 시스템 구조와 언어의 동작 원리에 깊게 관심을 두었습니다.", meta: "rust learning" },
      { icon: "note", text: "Rust 프로그래밍 온라인 강의에서 질문 응답과 예시 제작을 도우며 학습 보조 경험을 쌓았습니다.", meta: "2024.08 – 2025.08" },
      { icon: "assign", text: "뉴로서킷 인턴십에서 React Native 앱과 FastAPI 서버를 구현하며 제품과 서비스 레이어를 함께 경험했습니다.", meta: "2024.09 – 2024.12" },
      { icon: "assign", text: "Counterspell Busan 대회 사이트 개발에 참여해 랜딩 페이지와 애니메이션, API 연동을 맡았습니다.", meta: "2024.10 – 2024.11" },
      { icon: "label", text: "개발 블로그를 운영하며 Rust 기초 문법과 개념을 쉽게 풀어내는 글을 꾸준히 쓰고 있습니다.", meta: "2025.05 – 현재" },
    ],
    achievements: [
      { date: "2026.08.28", title: "JunctionX Korea 2위" },
      {
        date: "2026.01.14",
        title: "Ja CoY 지역 예선 1위",
        href: "https://www.getnews.co.kr/news/articleView.html?idxno=857155",
      },
      { date: "2024.11.01", title: "Patinex 2024 전시" },
      { date: "2024.08.09", title: "Junction Asia 2024 본선 진출" },
      {
        date: "2023.08.17",
        title: "디스코드 봇 3,000 서버 달성",
        href: "https://koreanbots.dev/bots/871348411356545057",
      },
      { date: "2023.03.02", title: "선린인터넷고 입학" },
      { date: "2022.11.01", title: "Rust 학습 시작" },
    ],
    contacts: [
      { label: "Email", value: "im@asta.rs", href: "mailto:im@asta.rs" },
      { label: "Phone", value: "010-5315-5240", href: "tel:01053155240" },
      { label: "Blog", value: "blog.asta.rs", href: "https://blog.asta.rs" },
    ],
    projects: [
      {
        name: "hq launcher",
        description:
          "Lethal Company 할당량 챌린지 유저들이 버전별 모드 호환과 업데이트를 쉽게 관리하도록 만든 런처입니다. React와 Tauri 기반으로 버전 관리, 모드 관리, 자동 업데이트 흐름을 묶어 번거로운 수동 설치 과정을 줄였습니다.",
        links: [{ label: "GitHub", href: "https://github.com/p-asta/hq-launcher", icon: "github" }],
      },
      {
        name: "starix",
        description:
          "GitHub로 블로그 글을 발행하는 사람들을 위한 알림 도구입니다. GitHub Workflow에 연결하면 새 글 발행 소식을 Discord로 바로 전달해, 배포부터 홍보까지의 흐름을 자동화합니다.",
        links: [{ label: "GitHub", href: "https://github.com/P-Asta/starix", icon: "github" }],
      },
      {
        name: "Ny Music",
        description:
          "친구의 RVC 모델로 만든 음악을 더 편하게 듣기 위해 만든 전용 플레이어입니다. 별도 웹페이지나 복잡한 설치 없이, 전용 플레이어 안에서 곡을 모아 감상하는 경험에 집중했습니다.",
        links: [{ label: "GitHub", href: "https://github.com/P-Asta/ny-music", icon: "github" }],
      },
      {
        name: "chzzk-rs",
        description:
          "Rust 생태계에서 치지직 API를 쉽게 다루기 위해 만든 비공식 SDK입니다. 반복적인 요청 처리와 타입 정의 부담을 줄여, CHZZK 기능을 Rust 프로젝트에 자연스럽게 통합할 수 있습니다.",
        links: [
          { label: "GitHub", href: "https://github.com/P-Asta/chzzk-rs", icon: "github" },
          { label: "crates.io", href: "https://crates.io/crates/chzzk", icon: "package" },
        ],
      },
      {
        name: "Limbo",
        description:
          "친구 컴퓨터를 장난스럽게 종료시키는 러시안룰렛 스타일 프로그램입니다. 움직이는 열쇠를 고르는 단순한 인터랙션으로, 짧지만 강한 재미에 집중한 실험적 프로젝트입니다.",
        links: [{ label: "GitHub", href: "https://github.com/P-Asta/limbo", icon: "github" }],
      },
    ],
  },
  en: {
    brand: "Asta",
    heroStatus: "Open to work",
    heroTitle: "Hanbyeol Yu",
    heroStatement: ["From pixels", "to protocols."],
    heroRoles: ["Frontend", "Backend", "Rust"],
    heroDescription:
      "I started with web publishing, sharpened my frontend sense with React and Tailwind CSS, and expanded into backend work with Flask, FastAPI, and Rust. I aim to build interfaces with great user experience on top of reliably structured services.",
    heroLabels: ["React", "Tailwind CSS", "Rust"],
    actions: { contact: "Contact", visitBlog: "Visit Blog" },
    summary: {
      label: "Intro",
      text: "On the frontend I refine experience and visual polish with React and Tailwind CSS; on the backend I build stable service structures with FastAPI and Rust. I prefer designing screens and systems together rather than treating them as separate concerns.",
    },
    sections: {
      achievements: "Achievements",
      projects: "Projects",
      focus: "Focus",
      skills: "Skills",
      activity: "Activity",
      contact: "Contact",
    },
    states: { done: "Done", open: "Open" },
    controls: {
      openQuickMenu: "Open quick menu",
      scrollToContact: "Scroll to contact",
      openBlog: "Open blog",
      copyEmail: "Copy email",
      language: "Change language",
    },
    commandMenu: {
      placeholder: "Type a command...",
      empty: "No results found",
      navigate: "Navigate",
      actions: "Actions",
      language: "Language",
    },
    github: { stars: "GitHub stars", failed: "Couldn't load star count" },
    copiedEmail: "Email copied to clipboard",
    footer: "© 2026 Hanbyeol Yu · Hand-built with React and Tailwind CSS",
    contactHeadline: "Let's build something fun together.",
    contactText: "Feel free to reach out by email, phone, or blog if you'd like to work together.",
    heroFacts: [
      { label: "Status", value: "Open to work", icon: "status" },
      { label: "Focus", value: "Frontend + Backend", icon: "priority" },
      { label: "Based in", value: "Seoul, Korea", icon: "assignee" },
      { label: "Stack", value: "React, FastAPI, Rust", icon: "stack" },
    ],
    skillHighlights: ["React", "Tailwind CSS", "JavaScript", "FastAPI", "Rust", "Axum", "Redis", "MongoDB"],
    subIssues: [
      { title: "A development style that balances usability and structure", state: "done", label: "Feature" },
      { title: "Backend experience centered on FastAPI and Rust", state: "done", label: "Backend" },
      { title: "Frontend sense built with React and Tailwind CSS", state: "done", label: "Frontend" },
      { title: "Interest in stable and scalable service design", state: "done", label: "Architecture" },
    ],
    timeline: [
      { icon: "create", text: "Started with web publishing and gradually widened the development path from there.", meta: "starting point" },
      { icon: "progress", text: "Learned FastAPI and Flask, expanding implementation experience around backend services.", meta: "backend focus" },
      { icon: "priority", text: "Kept studying Rust with a growing interest in system design and how languages work under the hood.", meta: "rust learning" },
      { icon: "note", text: "Supported an online Rust programming course by answering questions and building learning examples.", meta: "2024.08 – 2025.08" },
      { icon: "assign", text: "Built a React Native app and a FastAPI server during the Neurocircuit internship, covering both product and service layers.", meta: "2024.09 – 2024.12" },
      { icon: "assign", text: "Joined the Counterspell Busan website project, handling the landing page, animations, and API integration.", meta: "2024.10 – 2024.11" },
      { icon: "label", text: "Runs a dev blog, steadily publishing approachable posts on Rust fundamentals and concepts.", meta: "2025.05 – present" },
    ],
    achievements: [
      { date: "2026.08.28", title: "JunctionX Korea, 2nd place" },
      {
        date: "2026.01.14",
        title: "Ja CoY local round, 1st place",
        href: "https://www.getnews.co.kr/news/articleView.html?idxno=857155",
      },
      { date: "2024.11.01", title: "Exhibited at Patinex 2024" },
      { date: "2024.08.09", title: "Junction Asia 2024 finalist" },
      {
        date: "2023.08.17",
        title: "Discord bot reached 3,000 servers",
        href: "https://koreanbots.dev/bots/871348411356545057",
      },
      { date: "2023.03.02", title: "Entered Sunrin Internet High School" },
      { date: "2022.11.01", title: "Started learning Rust" },
    ],
    contacts: [
      { label: "Email", value: "im@asta.rs", href: "mailto:im@asta.rs" },
      { label: "Phone", value: "010-5315-5240", href: "tel:01053155240" },
      { label: "Blog", value: "blog.asta.rs", href: "https://blog.asta.rs" },
    ],
    projects: [
      {
        name: "hq launcher",
        description:
          "A launcher that helps Lethal Company quota-challenge players manage version-specific mod compatibility and updates. Built with React and Tauri, it bundles version management, mod management, and automatic updates to cut down manual setup.",
        links: [{ label: "GitHub", href: "https://github.com/p-asta/hq-launcher", icon: "github" }],
      },
      {
        name: "starix",
        description:
          "A notification tool for people who publish blog posts through GitHub. Hooked into a GitHub Workflow, it delivers new-post announcements straight to Discord, automating the publish-to-announce flow.",
        links: [{ label: "GitHub", href: "https://github.com/P-Asta/starix", icon: "github" }],
      },
      {
        name: "Ny Music",
        description:
          "A dedicated player built to comfortably listen to songs created with a friend's RVC model. No separate webpage or heavy setup — just a focused, contained player experience for those tracks.",
        links: [{ label: "GitHub", href: "https://github.com/P-Asta/ny-music", icon: "github" }],
      },
      {
        name: "chzzk-rs",
        description:
          "An unofficial SDK that makes the CHZZK API easier to use in the Rust ecosystem. It trims repetitive request handling and type definitions so CHZZK features integrate naturally into Rust projects.",
        links: [
          { label: "GitHub", href: "https://github.com/P-Asta/chzzk-rs", icon: "github" },
          { label: "crates.io", href: "https://crates.io/crates/chzzk", icon: "package" },
        ],
      },
      {
        name: "Limbo",
        description:
          "A Russian-roulette-style desktop program made to playfully shut down a friend's computer. A single moving-key interaction delivers a short but memorable joke.",
        links: [{ label: "GitHub", href: "https://github.com/P-Asta/limbo", icon: "github" }],
      },
    ],
  },
};
