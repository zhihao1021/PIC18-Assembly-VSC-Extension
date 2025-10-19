const debounceTimerMap = new Map();
export function scheduleWork(key, work, delay = 200) {
    if (debounceTimerMap.has(key))
        clearTimeout(debounceTimerMap.get(key));
    const timer = setTimeout(() => {
        work();
        debounceTimerMap.delete(key);
    }, delay);
    debounceTimerMap.set(key, timer);
}
//# sourceMappingURL=scheduleWork.js.map