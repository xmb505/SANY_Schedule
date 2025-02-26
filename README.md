# SANY_Schedule 🕒
**中文名**：三一金智教务小爱课表适配  
**状态**：已上线小爱课程表！🎉 无需手动操作，直接在小爱课程表APP中搜索**湖南三一工业职业技术学院**即可使用！

---

## 🚀 项目背景
你是否遇到过这些问题？
- 小爱课表未适配学校教务系统，手动录入课程耗时易错？
- 原始课表数据存在**重复课程条目**导致导入失败？
- 周次、时间格式混乱无法识别？

**我来解决！** 本项目已直接集成至小爱课程表，通过标准化数据清洗和去重逻辑，为湖南三一工院同学提供**无缝课表导入体验**。

---

## ✨ 核心功能
- **零操作接入**：无需导出/导入文件，APP内直接选择学校即可同步课表
- **关键问题修复**：
  - ✅ **重复课程去重**：修复原始课表中同一课程重复导入两次的致命问题
  - ✅ 周次冲突合并（如`1-2,4-5周` → 解析为独立周次区间）
  - ✅ 异常字符过滤（清除HTML残留标签及非法符号）
- **持续维护**：数据异常？直接提交Issue，快速响应修复！

---

## 📱 使用指南
### 只需3步：
1. **打开小爱课程表APP**  
   确保你可以用小爱同学并且小爱同学支持小爱课程表！

2. **搜索学校**  
   在「我的课表」→「添加课程」中搜索：  
   🔍 **湖南三一工业职业技术学院**

3. **登录同步**  
   使用教务系统账号登录 → 自动同步课表 → 完成！✨

---

## 🐞 问题反馈
遇到数据错误或同步失败？请按以下步骤提交反馈：
1. **匿名化数据**：删除教务系统账号等隐私信息
2. **描述现象**：具体错误表现（如课程重复、时间错位等）
3. **提交Issue**：[点击此处](https://github.com/你的账号/SANY_Schedule/issues) 提供信息

---

## 🙏 致谢
- 底层解析逻辑参考自 [yorick-ryu/NIIT_getCourse](https://gitee.com/yorick-ryu/NIIT_getCourse)（已适配本校数据结构）
- 感谢三一工院师生的问题反馈与测试支持

---

## 📄 开源协议
本项目采用 **GNU GPLv3 协议**开源，任何基于本项目的二次开发必须保持开源。  
协议详情见 [LICENSE](LICENSE) 文件。

---

## ❓ 常见问题
**Q：为什么小爱课表里搜不到我们学校？**  
A：我不到啊

**Q：课程时间/地点显示错误怎么办？**  
A：此类问题通常源于教务系统数据异常，提供具体课程信息（截图+周次）协助我修复。

**Q：毕业生/其他院校能用吗？**  
A：当前仅支持湖南三一工院在校生课表，其他场景需定制开发。


```mermaid
graph LR
教务系统 -->|HTML| 解析中间件 -->|标准化JSON| 小爱云端 --> APP
