/** Small public-site icons that render without an external icon font. */
export function PublicIcon({ name, className = "" }: { name: string; className?: string }) {
  const paths: Record<string, string> = {
    menu: "M4 6h16M4 12h16M4 18h16",
    close: "m6 6 12 12M6 18 18 6",
    fitness_center: "m6 6 12 12M4 9l5-5M2 7l5-5m8 18 5-5m-3 7 5-5",
    groups: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
    schedule: "M12 8v4l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
    bolt: "m13 2-9 12h7l-1 8 10-12h-7l1-8Z",
    expand_more: "m6 9 6 6 6-6",
    check: "m5 12 4 4L19 6",
    chevron_left: "m15 18-6-6 6-6",
    chevron_right: "m9 18 6-6-6-6",
    arrow_up_right: "M7 17 17 7M8 7h9v9",
  };
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] ?? paths.fitness_center} /></svg>;
}
