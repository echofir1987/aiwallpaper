// // 本地环境(有代理)
// import OpenAI from 'openai';
// import type { Fetch } from 'openai/core';
// import fetch from 'node-fetch';
// import { HttpsProxyAgent } from 'https-proxy-agent';

// export function getOpenAIClient() {
//     const agent = new HttpsProxyAgent('http://127.0.0.1:7890');
    
//     const fetchWithProxy = (url: string, init?: any) => {
//         return fetch(url, { ...init, agent });
//     };
    
//     return new OpenAI({
//         apiKey: process.env.OPENAI_API_KEY,
//         timeout: 120000,
//         baseURL: "https://api.openai.com/v1",
//         fetch: fetchWithProxy as unknown as Fetch,
//     });
// } 


// 线上环境（无代理）
import OpenAI from 'openai';

export function getOpenAIClient() {
    return new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        timeout: 120000,
        baseURL: "https://api.openai.com/v1",
    });
} 