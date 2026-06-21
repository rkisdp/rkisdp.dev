export interface ChatMessage {
  role: 'human' | 'ai';
  content: string;
  timestamp: string;
}

export interface ChatHistorySession {
  messages?: ChatMessage[];
  [key: string]: any;
}

export interface VisitorHistoryResponse {
  is_new: boolean;
  history?: ChatHistorySession[];
}

export interface ChatResponse {
  response?: string | string[];
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = 'https://api.rkisdp.dev') {
    this.baseURL = baseURL;
  }

  private async request<T>(path: string, config: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${path}`;
    
    const response = await fetch(url, {
      credentials: 'include',
      ...config,
      headers: {
        ...config.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  public async get<T>(path: string, config?: RequestInit): Promise<T> {
    return this.request<T>(path, { ...config, method: 'GET' });
  }

  public async post<T>(path: string, data?: any, config?: RequestInit): Promise<T> {
    const headers: Record<string, string> = {};
    if (config?.headers) {
      if (config.headers instanceof Headers) {
        config.headers.forEach((value, key) => {
          headers[key] = value;
        });
      } else if (Array.isArray(config.headers)) {
        config.headers.forEach(([key, value]) => {
          headers[key] = value;
        });
      } else {
        Object.assign(headers, config.headers);
      }
    }

    if (data && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
    
    return this.request<T>(path, {
      ...config,
      method: 'POST',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

export const apiClient = new ApiClient();

export const chatService = {
  getVisitorHistory(): Promise<VisitorHistoryResponse> {
    return apiClient.get<VisitorHistoryResponse>('/api/visitor-history/');
  },

  sendChatMessage(query: string): Promise<ChatResponse> {
    return apiClient.post<ChatResponse>('/api/chat/', { query });
  },
};
