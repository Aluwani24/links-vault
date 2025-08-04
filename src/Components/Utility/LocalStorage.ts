import type { LinkItem } from './Types';

const STORAGE_KEY = 'link_saver_links';

export function getLinks(): LinkItem[] {

    // Retrieve raw JSON string from localStorage
    const json = localStorage.getItem(STORAGE_KEY);

    // If we got data back, parse it; otherwise default to an empty array
    return json ? JSON.parse(json) : [];
}
// Convert array into JSON string and store it
export function saveLinks(links: LinkItem[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}
