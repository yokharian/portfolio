import { AwsRum } from 'aws-rum-web';

// RUM configuration - these will be loaded from the data file at runtime
let config: any = null;
let APPLICATION_ID = 'your-rum-application-id';
let APPLICATION_VERSION = '1.0.0';
let APPLICATION_REGION = 'us-east-1';

// Load RUM configuration from the data file
function loadRumConfig() {
  try {
    // Load configuration from the script tag
    const configScript = document.getElementById('rum-config');
    let rumConfig = {
      rumApplicationId: 'your-rum-application-id',
      rumGuestRoleArn: 'arn:aws:iam::your-account:role/your-rum-guest-role',
      rumIdentityPoolId: 'your-identity-pool-id',
      rumRegion: 'us-east-1',
      rumEndpoint: 'https://dataplane.rum.us-east-1.amazonaws.com',
      rumApplicationVersion: '1.0.0'
    };

    if (configScript && configScript.textContent) {
      try {
        rumConfig = JSON.parse(configScript.textContent);
      } catch (e) {
        console.warn('AWS RUM: Failed to parse configuration, using defaults');
      }
    }

    APPLICATION_ID = rumConfig.rumApplicationId;
    APPLICATION_VERSION = rumConfig.rumApplicationVersion;
    APPLICATION_REGION = rumConfig.rumRegion;

    config = {
      sessionSampleRate: 1,
      endpoint: rumConfig.rumEndpoint,
      telemetries: ["performance", "errors", "http"] as ("performance" | "errors" | "http")[],
      allowCookies: true,
      enableXRay: false,
      signing: true // If you have a public resource policy and wish to send unsigned requests please set this to false
    };
  } catch (error) {
    console.warn('AWS RUM: Failed to load configuration', error);
  }
}

let awsRum: AwsRum | null = null;

// Initialize RUM client only if consent is given
function initializeRum() {
  try {
    // Load configuration first
    loadRumConfig();
    
    if (!config) {
      console.warn('AWS RUM: Configuration not loaded');
      return;
    }

    awsRum = new AwsRum(
      APPLICATION_ID,
      APPLICATION_VERSION,
      APPLICATION_REGION,
      config
    );
    console.log('AWS RUM: Initialized successfully');
  } catch (error) {
    // Ignore errors thrown during CloudWatch RUM web client initialization
    console.warn('AWS RUM: Failed to initialize RUM client', error);
  }
}

// Check for consent and initialize RUM
if (typeof window !== 'undefined') {
  const consentGiven = localStorage.getItem('rum_consent_given');
  if (consentGiven === 'true') {
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
      console.warn('AWS RUM: Client not initialized, cannot record event:', type);
    }
  } catch (error) {
    console.warn('AWS RUM: Failed to record event:', type, error);
  }
}

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
if (typeof window !== 'undefined') {
  window.recordRumEvent = recordRumEvent;
  window.initializeRum = initializeRum;
}
