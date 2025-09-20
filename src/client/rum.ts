import { AwsRum, type AwsRumConfig } from "aws-rum-web";

let awsRum: AwsRum | null = null;

// Initialize RUM client only if consent is given
function initializeRum() {
  try {
    // Load configuration first
    const config: AwsRumConfig = {
      sessionSampleRate: 1,
      endpoint: "https://dataplane.rum.us-east-1.amazonaws.com",
      telemetries: ["performance", "errors", "http"],
      allowCookies: true,
      enableXRay: false,
      signing: true, // If you have a public resource policy and wish to send unsigned requests please set this to false
    };
    const APPLICATION_ID: string = "395df225-86d8-4a53-b962-dfcdc2dd9280";
    const APPLICATION_VERSION: string = "1.0.0";
    const APPLICATION_REGION: string = "us-east-1";

    awsRum = new AwsRum(
      APPLICATION_ID,
      APPLICATION_VERSION,
      APPLICATION_REGION,
      config,
    );
    console.log("AWS RUM: Initialized successfully");
  } catch (error) {
    // Ignore errors thrown during CloudWatch RUM web client initialization
    console.warn("AWS RUM: Failed to initialize RUM client", error);
  }
}

// Check for consent and initialize RUM
if (typeof window !== "undefined") {
  const consentGiven = localStorage.getItem("rum_consent_given");
  if (consentGiven === "true") {
    initializeRum();
  }
}

/**
 * Record a custom event to AWS RUM
 * @param type - The event type
 * @param details - Additional event details
 */
export function recordRumEvent(type: string, details: object = {}): void {
  try {
    if (awsRum) {
      awsRum.recordEvent(type, details);
    } else {
      console.warn(
        "AWS RUM: Client not initialized, cannot record event:",
        type,
      );
    }
  } catch (error) {
    console.warn("AWS RUM: Failed to record event:", type, error);
  }
}

// noinspection JSUnusedGlobalSymbols
/**
 * Check if RUM client is available
 * @returns true if RUM client is initialized and ready
 */
export function isRumAvailable(): boolean {
  return awsRum !== null;
}

// Make recordRumEvent available globally for inline event handlers
declare global {
  interface Window {
    recordRumEvent: (type: string, details?: object) => void;
    initializeRum: () => void;
  }
}

// Expose the functions globally
if (typeof window !== "undefined") {
  window.recordRumEvent = recordRumEvent;
  window.initializeRum = initializeRum;
}
