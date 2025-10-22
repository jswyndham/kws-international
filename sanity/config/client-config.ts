// sanity/config/client-config.ts
import { createClient } from '@sanity/client';

export const readClient = createClient({
    projectId: 'hewwg73z',
    dataset: 'production',
    token: process.env.SANITY_API_READ_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: true,
});

export const writeClient = createClient({
    projectId: 'hewwg73z',
    dataset: 'production',
    token: process.env.SANITY_API_WRITE_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
});

// Debug
console.log('Write token exists:', !!process.env.SANITY_API_WRITE_TOKEN);