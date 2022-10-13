#!/usr/bin/env node

const generateSvgIcon = require('../packages/basecmp/icon/generateComp.cjs');
const generateIconFont = require('../packages/basecmp/icon/icon-font.cjs');

/**
 * 生成icon组件和iconfont
 * arga:
 *   icon: 只生成icon组件
 *   font: 只生成iconfont
 */
const args = process.argv.slice(2);
let icon = false;
let font = false;
if (!args.length) {
  icon = true;
  font = true;
} else {
  if (args.includes('icon')) {
    icon = true;
  }
  if (args.includes('font')) {
    font = true;
  }
}

// 生成icon组件和iconfont css
icon && generateSvgIcon();
font && generateIconFont();
