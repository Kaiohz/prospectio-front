import { toast } from "../../domain/hooks/use-toast";

declare global {
  interface Window {
    mountChainlitWidget?: (config: { chainlitServer: string }) => void;
  }
}

class ChatbotService {
  private readonly apiUrl: string;
  private isLoaded: boolean = false;

  constructor() {
    this.apiUrl = import.meta.env.VITE_APP_RAG_CHATBOT_API_URL;
  }

  /**
   * Load the chainlit widget dynamically with proper error handling and user feedback
   */
  async loadWidget(): Promise<void> {
    if (this.isLoaded) return;

    if (!this.apiUrl) {
      toast({
        variant: "destructive",
        title: "Configuration Error",
        description: "Chatbot API URL is not configured.",
      });
      return;
    }

    try {
      await this.loadScript(`${this.apiUrl}/copilot/index.js`);
      this.mountWidget();
      this.isLoaded = true;
    
    } catch (error) {
      console.error("Failed to load Chainlit widget:", error);
      toast({
        variant: "destructive",
        title: "Chat widget unavailable",
        description: "Failed to load the chat widget. Please refresh the page to try again.",
      });
    }
  }

  /**
   * Load external script and return a promise
   */
  private async loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      console.log('Loading script:', src);
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }

  /**
   * Mount the chainlit widget with proper configuration
   */
  private mountWidget(): void {
    if (window.mountChainlitWidget) {
      window.mountChainlitWidget({
        chainlitServer: `${this.apiUrl}`,
      });
      
      // Apply z-index styles after mounting
      setTimeout(() => {
        this.applyChainlitWidgetZIndex();
      }, 1000);
    }
  }

  /**
   * Apply z-index styles to ensure the Chainlit widget is always on top
   */
  private applyChainlitWidgetZIndex(): void {
    const selectors = [
      '#chainlit-copilot',
      '[id*="chainlit"]',
      '[class*="chainlit"]',
      '.chainlit-widget',
      '.chainlit-copilot',
      '.chainlit-chat'
    ];

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.style.zIndex = '9999';
          element.style.position = element.style.position || 'relative';
          
          // Also apply to all child elements
          const children = element.querySelectorAll('*');
          children.forEach(child => {
            if (child instanceof HTMLElement) {
              child.style.zIndex = '9999';
            }
          });
        }
      });
    });
  }
}

export const chatbotService: ChatbotService = new ChatbotService();
