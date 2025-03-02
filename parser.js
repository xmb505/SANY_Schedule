function scheduleHtmlParser(html) {
    const result = [];
    const courseMap = new Map();

    // 遍历所有课程块
    $('div.mtt_arrange_item').each((index, item) => {
        const data = $(item);
        const parentTd = data.closest('td[data-week]');
        
        // 基础字段解析
        const course = {
            name: data.find('.mtt_item_kcmc').text().trim(),
            teacher: data.find('.mtt_item_jxbmc').first().text().trim(),
            day: parseInt(parentTd.attr('data-week')) || 1,
            weeks: [],
            sections: [],
            position: ""
        };

        // 解析教室信息
        const rawStr = data.find('.mtt_item_room').text().trim();
        let hasSection = false;

        rawStr.split(/[,，]/).forEach(element => {
            const elem = element.trim();
            
            // 节次解析（支持1-2节、3节等形式）
            if (/节/.test(elem)) {
                hasSection = true;
                const sectionMatch = elem.match(/(\d+)(?:\s*-\s*(\d+))?/);
                if (sectionMatch) {
                    const start = parseInt(sectionMatch[1]);
                    const end = sectionMatch[2] ? parseInt(sectionMatch[2]) : start;
                    course.sections = Array.from(
                        { length: end - start + 1 },
                        (_, i) => start + i
                    );
                }
            }
            // 周数解析（支持1-18周、1,3,5周等形式）
            else if (/周/.test(elem)) {
                elem.split(/,/).forEach(range => {
                    const cleanRange = range.replace(/[^\d-]/g, '');
                    const [startStr, endStr] = cleanRange.split('-');
                    const start = parseInt(startStr);
                    const end = endStr ? parseInt(endStr) : start;
                    
                    if (!isNaN(start)) {
                        course.weeks.push(
                            ...Array.from(
                                { length: end - start + 1 },
                                (_, i) => start + i
                            )
                        );
                    }
                });
            }
            // 教室位置（排除日期描述）
            else if (elem && !/星期/.test(elem)) {
                course.position = elem;
            }
        });

        // 默认处理单节次情况
        if (!hasSection) {
            const unit = parentTd.closest('tr').find('td[data-unit]').first();
            const beginUnit = parseInt(unit.attr('data-unit')) || 1;
            const rowspan = parseInt(unit.attr('rowspan')) || 1;
            course.sections = Array.from(
                { length: rowspan }, 
                (_, i) => beginUnit + i
            );
        }

        // 生成唯一标识键（排除周数差异）
        const compositeKey = [
            course.name,
            course.teacher,
            course.day,
            course.sections.join(','),
            course.position
        ].join('|');

        // 合并重复课程
        if (courseMap.has(compositeKey)) {
            const existing = courseMap.get(compositeKey);
            existing.weeks = [...new Set([...existing.weeks, ...course.weeks])]
                .sort((a, b) => a - b);
        } else {
            // 初始处理：去重并排序周数
            course.weeks = [...new Set(course.weeks)].sort((a, b) => a - b);
            courseMap.set(compositeKey, course);
            result.push(course);
        }
    });

    return result;
}
