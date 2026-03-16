/*
  文件结构说明
  1. 选中所有需要滚动显现的元素：.reveal
  2. 创建 IntersectionObserver 监听器
  3. 当元素进入视口时，为它添加 is-visible 类名
  4. 元素显示后取消监听，避免重复计算
*/
const reveals = document.querySelectorAll(".reveal");

// 监听页面中的区块是否滚动到用户视口里
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // 没进入视口就先不处理
      if (!entry.isIntersecting) {
        return;
      }

      // 进入视口后添加类名，让 CSS 动画生效
      entry.target.classList.add("is-visible");

      // 已经显示过的元素不再继续监听
      observer.unobserve(entry.target);
    });
  },
  {
    // 元素进入大约 15% 时开始触发
    threshold: 0.15,

    // 提前一点触发动画，让观感更自然
    rootMargin: "0px 0px -48px 0px",
  }
);

// 给所有带 .reveal 的元素挂上监听
reveals.forEach((item) => observer.observe(item));
