import React from "react";
import "./index.css";

/**
 * 全局底部栏组件
 * @constructor
 */
export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="global-footer">
      <div>© {currentYear} 牢大八股 </div>
      <div>
        <a href="https://github.com/97ZQ/zqbagu" target="_blank">
          后端开发：zq
        </a>
        <br />
        <a href="https://github.com/958498000" target="_blank">
          前端开发：cc
        </a>
      </div>
    </div>
  );
}
