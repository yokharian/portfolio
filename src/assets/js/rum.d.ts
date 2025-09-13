/**
 * Record a custom event to AWS RUM
 * @param type - The event type
 * @param details - Additional event details
 */
export declare function recordRumEvent(type: string, details?: object): void;
/**
 * Check if RUM client is available
 * @returns true if RUM client is initialized and ready
 */
export declare function isRumAvailable(): boolean;
declare global {
    interface Window {
        recordRumEvent: (type: string, details?: object) => void;
        initializeRum: () => void;
    }
}
//# sourceMappingURL=rum.d.ts.map