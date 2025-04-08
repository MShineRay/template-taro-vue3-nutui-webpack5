<template>
  <view class="index">
    <h1>富文本- taro rich-text</h1>
    <rich-text :nodes="content"></rich-text>
    <h1>rich-text end</h1>
    <h1>mp-html</h1>
    <mp-html :content="content"/>
    <h1>mp-html end</h1>

    <view v-html="content"></view>
    <editor id="editor" class="editor" :placeholder="placeholder" @ready="editorReady"></editor>
    <button type="warn" @tap="undo">撤销</button>
  </view>
</template>

<script setup>
import Taro from '@tarojs/taro'
const nodes =  [{
  name: 'div',
  attrs: {
    class: 'div_class',
    style: 'line-height: 60px; color: red;'
  },
  children: [{
    type: 'text',
    text: 'Hello World!2222'
  }]
}]

// const content = `<title>富文本示例</title>
// <div>
//   <section style="text-align: center; margin: 0px auto;">
//     <section style="border-radius: 4px; border: 1px solid #757576; display: inline-block; padding: 5px 20px;">
//       <span style="font-size: 18px; color: #595959;">表格</span>
//     </section>
//   </section>
//   <section style="margin-top: 1.5em;">
//     <table width="100%" cellspacing="0" cellpadding="5">
//       <thead>
//         <tr>
//           <th>标题 1</th>
//           <th>标题 2</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td align="center">内容 1</td>
//           <td align="center">内容 2</td>
//         </tr>
//         <tr style="background-color: #f6f8fa;">
//           <td align="center">内容 3</td>
//           <td align="center"><a>链接</a></td>
//         </tr>
//         <tr>
//           <td align="center">内容 5</td>
//           <td align="center">内容 6</td>
//         </tr>
//       </tbody>
//     </table>
//     <div style="font-size: 12px; color: gray; text-align: center; margin-top: 5px;">普通表格</div>
//   </section>
//   <section style="margin-top: 1.5em;">
//     <table width="500px" cellspacing="0" cellpadding="5">
//       <thead>
//         <tr>
//           <th>标题 1</th>
//           <th>标题 2</th>
//           <th>标题 3</th>
//           <th>标题 4</th>
//           <th>标题 5</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td align="center">内容 1</td>
//           <td align="center">内容 2</td>
//           <td align="center">内容 3</td>
//           <td align="center">内容 4</td>
//           <td align="center">内容 5</td>
//         </tr>
//         <tr style="background-color: #f6f8fa;">
//           <td align="center"><a>链接</a></td>
//           <td align="center">内容 7</td>
//           <td align="center">内容 8</td>
//           <td align="center">内容 9</td>
//           <td align="center">内容 10</td>
//         </tr>
//         <tr>
//           <td align="center">内容 11</td>
//           <td align="center">内容 12</td>
//           <td align="center">内容 13</td>
//           <td align="center">内容 14</td>
//           <td align="center">内容 15</td>
//         </tr>
//       </tbody>
//     </table>
//     <div style="font-size: 12px; color: gray; text-align: center; margin-top: 5px;">长表格，可以单独横向滚动</div>
//   </section>
//   <section style="margin-top: 1.5em;">
//     <table width="100%" cellspacing="0" cellpadding="5">
//       <thead>
//         <tr>
//           <th align="center">标题 1</th>
//           <th align="center">标题 2</th>
//           <th align="center">标题 3</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td align="center" colspan="2">内容 1</td>
//           <td align="center" rowspan="2">内容 2</td>
//         </tr>
//         <tr>
//           <td align="center" rowspan="2">内容 3</td>
//           <td align="center">内容 4</td>
//         </tr>
//         <tr>
//           <td align="center" colspan="2">内容 5</td>
//         </tr>
//         <tr>
//           <td align="center">内容 6</td>
//           <td align="center">内容 7</td>
//           <td align="center"><a>链接</a></td>
//         </tr>
//       </tbody>
//     </table>
//     <div style="font-size: 12px; color: gray; text-align: center; margin-top: 5px;">含有合并单元格的表格</div>
//   </section>
//   <section id="list" style="text-align: center; margin: 0px auto; margin-top: 2em">
//     <section style="border-radius: 4px; border: 1px solid #757576; display: inline-block; padding: 5px 20px;">
//       <span style="font-size: 18px; color: #595959;">列表</span>
//     </section>
//   </section>
//   <section style="margin-top: 1.5em;">
//     <ol style="margin-bottom: 1.5em;">
//       <li>这是第一条列表项</li>
//       <li>这是第二条列表项</li>
//       <li>这是第三条 <a>链接</a></li>
//     </ol>
//     <ol type="A" style="margin-bottom: 1.5em;">
//       <li>这是第一条列表项</li>
//       <li>这是第二条列表项</li>
//       <li>这是第三条 <a>链接</a></li>
//     </ol>
//     <ol type="I" style="margin-bottom: 1.5em;">
//       <li>这是第一条列表项</li>
//       <li>这是第二条列表项</li>
//       <li>这是第三条 <a>链接</a></li>
//     </ol>
//     <ul>
//       <li>第一级无序列表</li>
//       <li>第一级无序列表
//         <ul>
//           <li>第二级无序列表</li>
//           <li>第二级无序列表
//             <ul>
//               <li>第三级无序列表</li>
//               <li>第三级 <a>链接</a></li>
//             </ul>
//           </li>
//         </ul>
//       </li>
//     </ul>
//   </section>
//   <section style="text-align: center; margin: 0px auto; margin-top: 2em">
//     <section style="border-radius: 4px; border: 1px solid #757576; display: inline-block; padding: 5px 20px;">
//       <span style="font-size: 18px; color: #595959;">文本</span>
//     </section>
//   </section>
//   <section style="margin-top: 1.5em;">
//     <p style="margin-bottom: 1em;">
//       <ruby>
//         拼<rp>(</rp><rt>pin</rt><rp>)</rp>
//         音<rp>(</rp><rt>yin</rt><rp>)</rp>
//       </ruby>
//       &nbsp;&nbsp;<i>斜体</i>
//       &nbsp;&nbsp;<b>粗体</b>
//       &nbsp;&nbsp;上标<sup>1</sup>
//       &nbsp;&nbsp;下标<sub>2</sub>
//     </p>
//     <p style="margin-bottom: 1em;">
//       <span style="text-decoration: overline;">上划线</span>
//       &nbsp;&nbsp;<s>中划线</s>
//       &nbsp;&nbsp;<u>下划线</u>
//     </p>
//     <p>
//       <big>大一号</big>
//       &nbsp;&nbsp;<span>正常</span>
//       &nbsp;&nbsp;<small>小一号</small>
//     </p>
//     <h2 style="margin-top: 0.5em;">大标题</h2>
//     <h3 style="margin-top: 0.5em;">中标题</h3>
//     <h4 style="margin-top: 0.5em;">小标题</h4>
//   </section>
//   <section style="text-align: center; margin: 0px auto; margin-top: 2em">
//     <section style="border-radius: 4px; border: 1px solid #757576; display: inline-block; padding: 5px 20px;">
//       <span style="font-size: 18px; color: #595959;">链接</span>
//     </section>
//   </section>
//   <section style="margin-top: 1.5em; text-align: center;">
//     <a href="#">跳转到顶部</a>&nbsp;&nbsp;&nbsp;<a href="#list">跳转到列表</a>
//     <div style="font-size: 12px; color: gray; margin-top: 5px;">锚点链接，将滚动到对应位置</div>
//   </section>
//   <section style="margin-top: 1.5em; text-align: center;">
//     <a href="https://github.com/jin-yufeng/mp-html">外部链接</a>
//     <div style="font-size: 12px; color: gray; margin-top: 5px;">外部链接，将复制链接</div>
//   </section>
//   <section style="margin-top: 1.5em; text-align: center;">
//     <a href="/pages/jump/jump">内部链接</a>
//     <div style="font-size: 12px; color: gray; margin-top: 5px;">内部链接，将跳转页面</div>
//   </section>
//   <section style="text-align: center; margin: 0px auto; margin-top: 2em">
//     <section style="border-radius: 4px; border: 1px solid #757576; display: inline-block; padding: 5px 20px;">
//       <span style="font-size: 18px; color: #595959;">图片</span>
//     </section>
//   </section>
//   <section style="margin-top: 1.5em; text-align: center;">
//     <img src="demo.jpg">
//     <div style="font-size: 12px; color: gray; margin-top: 5px;">点击预览</div>
//   </section>
//   <section style="margin-top: 1.5em; text-align: center;">
//     <svg width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;">
//       <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
//         <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/>
//       </path>
//     </svg>
//     <div style="font-size: 12px; color: gray; margin-top: 5px;">svg 动画</div>
//   </section>
// </div>`
const content  = `<p>替换图<span style="background-color: rgb(53, 152, 219);" data-mce-style="background-color: #3598db;">标演示ax-color，该效</span>果的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。</p><p><span style="color: rgb(224, 62, 45);" data-mce-style="color: #e03e2d;">替换图标演示ax-color，该效果</span>的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。</p><p>替换<strong>图标演示ax-color，该效果的实现</strong>详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。</p><p>替换图<em>标演示ax-color，该效果</em>的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。</p><p><span style="text-decoration: underline;" data-mce-style="text-decoration: underline;">替换图标演示ax-color，该效果的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。</span></p><p><span style="text-decoration: line-through;" data-mce-style="text-decoration: line-through;">替换图标演示ax-color，该效果的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。</span></p><p><a data-mce-href="https://www.baidu.com" href="https://www.baidu.com">替换图标演示ax-color，该效果的实现详见 配置参考→UI界面配置 。</a></p><p><a id="dd1" contenteditable="false" class="mce-item-anchor"></a>替换图标演示ax-color，该效果的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。</p><p style="text-align: center;" data-mce-style="text-align: center;">替换图标演示ax-color，该效果的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。</p><p style="text-align: right;" data-mce-style="text-align: right;">替换图标演示ax-color，该效果的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。</p><p style="text-indent: 2em;" data-mce-style="text-indent: 2em;">替换图标演示ax-color，该效果的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。]替换图标演示ax-color，该效果的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。替换图标演示ax-color，该效果的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。替换图标演示ax-color，该效果的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。</p><p style="text-indent: 2em; line-height: 1.5;" data-mce-style="text-indent: 2em; line-height: 1.5;">替换图标演示ax-color，该效果的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。</p><ul><li data-mce-style="line-height: 1.5;" style="line-height: 1.5;">替换图标演示ax-color，该效果的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。</li><li data-mce-style="line-height: 1.5;" style="line-height: 1.5;">替换图标演示ax-color，该效果的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。</li></ul><ol><li>替换图标演示ax-color，该效果的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。</li><li>替换图标演示ax-color，该效果的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。<blockquote>替换图标演示ax-color，该效果的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。</blockquote></li><li><table style="border-collapse: collapse; width: 93.126%; height: 154px;" border="1"><tbody><tr style="height: 22px;"><td style="width: 11.8355%; height: 22px;">替换图标演示ax-color，该效果的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。</td><td style="width: 11.8355%; height: 22px;">替换图标演示ax-color，该效果的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。</td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8382%; height: 22px;"><br></td></tr><tr style="height: 22px;"><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8382%; height: 22px;"><br></td></tr><tr style="height: 22px;"><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;">替换图标演示ax-color，该效果的实现详见 <a href="configure/editor-appearance.php#icons" data-mce-href="configure/editor-appearance.php#icons">配置参考→UI界面配置</a> 。₽</td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8382%; height: 22px;"><br></td></tr><tr style="height: 22px;"><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8382%; height: 22px;"><br></td></tr><tr style="height: 22px;"><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8382%; height: 22px;"><br></td></tr><tr style="height: 22px;"><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8382%; height: 22px;"><br></td></tr><tr style="height: 22px;"><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8355%; height: 22px;"><br></td><td style="width: 11.8382%; height: 22px;"><br data-mce-bogus="1"></td></tr></tbody></table><img class="mce-pagebreak" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-mce-resize="false" data-mce-placeholder=""></li></ol>`
const  placeholder ='来，输入隔壁的名字试试...'

const editorReady =  ()=>{
  Taro.createSelectorQuery().select('#editor').context((res) => {
    this.editorCtx = res.context
  }).exec()
}
const undo =  ()=> {
  this.editorCtx.undo()
}
</script>
