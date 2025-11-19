import { Menu } from "@/app/_types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Trang chủ",
    path: "/",
    newTab: false,
  },
  // {
  //   id: 2,
  //   title: "Giới thiệu",
  //   path: "/about",
  //   newTab: false,
  // },
  // {
  //   id: 33,
  //   title: "Blog",
  //   path: "/blog",
  //   newTab: false,
  // },
  
  // {
  //   id: 4,
  //   title: "Pages",
  //   newTab: false,
  //   submenu: [
  //     {
  //       id: 41,
  //       title: "About Page",
  //       path: "/about",
  //       newTab: false,
  //     },
  //     {
  //       id: 42,
  //       title: "Contact Page",
  //       path: "/contact",
  //       newTab: false,
  //     },
  //     {
  //       id: 43,
  //       title: "Blog Grid Page",
  //       path: "/blog",
  //       newTab: false,
  //     },
  //     {
  //       id: 44,
  //       title: "Blog Sidebar Page",
  //       path: "/blog-sidebar",
  //       newTab: false,
  //     },
  //     {
  //       id: 45,
  //       title: "Blog Details Page",
  //       path: "/blog-details",
  //       newTab: false,
  //     },
  //     {
  //       id: 46,
  //       title: "Sign In Page",
  //       path: "/signin",
  //       newTab: false,
  //     },
  //     {
  //       id: 47,
  //       title: "Sign Up Page",
  //       path: "/signup",
  //       newTab: false,
  //     },
  //     {
  //       id: 48,
  //       title: "Error Page",
  //       path: "/error",
  //       newTab: false,
  //     },
  //   ],
  // },
  {
    id: 2,
    title: "OpenRouterAI",
    newTab: false,
    submenu: [
      {
        id: 22,
        title: "Conversation state",
        path: "/client/openrouter/conversion-state",
        newTab: false,
      },
      // {
      //   id: 24,
      //   title: "Image Generator",
      //   path: "/client/openrouter/image-generator",
      //   newTab: false,
      // },
    ],
  },
  {
    id: 3,
    title: "OpenAI",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "Chat Completions",
        path: "/client/openai/chat-completions",
        newTab: false,
      },
      {
        id: 32,
        title: "Image Generator",
        path: "/client/openai/image-generator",
        newTab: false,
      },
      {
        id: 33,
        title: "Image Editor",
        path: "/client/openai/image-editor",
        newTab: false,
      },
      {
        id: 34,
        title: "Text To Audio",
        path: "/client/openai/audio-generator",
        newTab: false,
      },
      {
        id: 34,
        title: "Search file",
        path: "/client/openai/audio-generator",
        newTab: false,
      },
    ],
  },
  {
    id: 4,
    title: "Liên hệ",
    path: "/contact",
    newTab: false,
  },
  {
    id: 5,
    title: "Thông tin",
    path: "/client/profile",
    newTab: false,
  },
];
export default menuData;
