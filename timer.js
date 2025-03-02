/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
 async function scheduleTimer({
    providerRes,
    parserRes
} = {}) {
    return {
        totalWeek: 22, // 总周数：[1, 30]之间的整数
        startSemester: '', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
        startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
        showWeekend: false, // 是否显示周末
        forenoon: 4, // 上午课程节数：[1, 10]之间的整数
        afternoon: 4, // 下午课程节数：[0, 10]之间的整数
        night: 2, // 晚间课程节数：[0, 10]之间的整数
        sections: [
            { section: 1, startTime: "08:20", endTime: "09:05" },
            { section: 2, startTime: "09:15", endTime: "10:00" },
            { section: 3, startTime: "10:20", endTime: "11:05" },
            { section: 4, startTime: "11:05", endTime: "12:00" },
            { section: 5, startTime: "14:00", endTime: "14:45" },
            { section: 6, startTime: "14:55", endTime: "15:40" },
            { section: 7, startTime: "15:50", endTime: "16:35" },
            { section: 8, startTime: "16:45", endTime: "17:30" },
            { section: 9, startTime: "19:00", endTime: "19:45" },
            { section: 10, startTime: "19:55", endTime: "20:30" }
        ], // 课程时间表，注意：总长度要和上边配置的节数加和对齐
    }
}
