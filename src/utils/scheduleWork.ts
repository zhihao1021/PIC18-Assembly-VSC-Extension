const debounceTimerMap = new Map<string, NodeJS.Timeout>();

export function scheduleWork(
    key: string,
    work: () => any,
    delay: number = 200
): void {
    if (debounceTimerMap.has(key)) clearTimeout(debounceTimerMap.get(key)!);

    const timer = setTimeout(() => {
        work();
        debounceTimerMap.delete(key);
    }, delay);
    debounceTimerMap.set(key, timer);
}
