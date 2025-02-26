function scheduleHtmlParser(html) {
    const result = [];
    const seen = new Map();

    $('div.mtt_arrange_item').each((index, item) => {
        const data = $(item);
        const parentTd = data.closest('td[data-week]');
        const day = Math.max(1, Math.min(7, parseInt(parentTd.attr('data-week')) || 1));
        
        const rawStr = data.find('.mtt_item_room').text().trim();
        const courseBase = {
            name: data.find('.mtt_item_kcmc').text().trim(),
            teacher: data.find('.mtt_item_jxbmc').first().text().trim(),
            position: "",
            day: day,
            weeks: [],
            sections: []
        };

        // 简化版解析器 -------------------------------------------------
        rawStr.split(/[,，]/).forEach(element => {
            const elem = element.trim();
            
            if (/节/.test(elem)) {
                const match = elem.match(/(\d+)(?:-(\d+))?节?/);
                if (match) {
                    const start = parseInt(match[1]);
                    const end = match[2] ? parseInt(match[2]) : start;
                    courseBase.sections = Array.from({length: end - start + 1}, (_, i) => start + i);
                }
            }
            else if (/周/.test(elem)) {
                elem.match(/(\d+)(?:-(\d+))?周?/g).forEach(part => {
                    const [_, startStr, endStr] = part.match(/(\d+)(?:-(\d+))?/);
                    const start = parseInt(startStr);
                    const end = endStr ? parseInt(endStr) : start;
                    courseBase.weeks.push(...Array.from({length: end - start +1}, (_,i) => start +i));
                });
            }
            else if (elem && !/星期/.test(elem)) {
                courseBase.position = elem;
            }
        });

        // 合并逻辑保持原样 -------------------------------------------------
        const conflictKey = `${day}-${courseBase.sections.join()}`;
        if (seen.has(conflictKey)) {
            seen.get(conflictKey).weeks = [...new Set([...seen.get(conflictKey).weeks, ...courseBase.weeks])].sort();
        } else {
            seen.set(conflictKey, courseBase);
            result.push(courseBase);
        }
    });

    return result.sort((a, b) => a.day - b.day || a.sections[0] - b.sections[0]);
}
