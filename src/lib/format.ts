export function formatPrice(n: number): string {
  return `Rs. ${Math.round(n).toLocaleString("en-US")}`;
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}
