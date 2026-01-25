// API Configuration and lightweight fetch client for the app
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8000';
const API_VERSION = 'v1';

export const API_CONFIG = {
	baseURL: API_BASE_URL,
	apiVersion: API_VERSION,
	timeout: 30000, // milliseconds
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
};

export const API_ENDPOINTS = {
	auth: {
		register: `/api/${API_VERSION}/auth/register`,
		login: `/api/${API_VERSION}/auth/login`,
		logout: `/api/${API_VERSION}/auth/logout`,
		refresh: `/api/${API_VERSION}/auth/refresh`,
	},
	profile: {
		me: `/api/${API_VERSION}/profile/me`,
		changePassword: `/api/${API_VERSION}/profile/change-password`,
	},
	orders: {
		list: `/api/${API_VERSION}/orders`,
		detail: (id: string) => `/api/${API_VERSION}/orders/${id}`,
	},
	medicines: {
		list: `/api/${API_VERSION}/medicines`,
		detail: (id: string) => `/api/${API_VERSION}/medicines/${id}`,
	},
};

export const buildApiUrl = (endpoint: string): string => `${API_CONFIG.baseURL}${endpoint}`;

export const getAuthHeaders = (token?: string) =>
	token ? { ...API_CONFIG.headers, Authorization: `Bearer ${token}` } : { ...API_CONFIG.headers };

// Minimal fetch wrapper that parses JSON and handles timeouts and auth
export async function fetchJson<T = any>(
	endpoint: string,
	options?: {
		method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
		token?: string;
		body?: any;
		headers?: Record<string, string>;
		timeoutMs?: number;
	}
): Promise<T> {
	const { method = 'GET', token, body, headers = {}, timeoutMs = API_CONFIG.timeout } = options || {};

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

	const url = buildApiUrl(endpoint);
	const init: RequestInit = {
		method,
		headers: { ...getAuthHeaders(token), ...headers },
		signal: controller.signal,
	};

	if (body != null) init.body = JSON.stringify(body);

	try {
		const res = await fetch(url, init);
		clearTimeout(timeoutId);

		const text = await res.text();
		const data = text ? JSON.parse(text) : null;

		if (!res.ok) {
			const errMsg = (data && (data.detail || data.message)) || res.statusText || 'Request failed';
			throw new Error(errMsg);
		}

		return data as T;
	} catch (err: any) {
		if (err.name === 'AbortError') throw new Error('Request timed out');
		throw err;
	}
}

export const apiGet = <T = any>(endpoint: string, token?: string) => fetchJson<T>(endpoint, { method: 'GET', token });
export const apiPost = <T = any>(endpoint: string, body: any, token?: string) => fetchJson<T>(endpoint, { method: 'POST', body, token });
export const apiPut = <T = any>(endpoint: string, body: any, token?: string) => fetchJson<T>(endpoint, { method: 'PUT', body, token });
export const apiDelete = <T = any>(endpoint: string, token?: string) => fetchJson<T>(endpoint, { method: 'DELETE', token });

// Example usage (in components):
// import { apiPost, API_ENDPOINTS } from '../config/apiConfig';
// const res = await apiPost(API_ENDPOINTS.auth.login, { email, password });

