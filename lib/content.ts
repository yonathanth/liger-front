/**
 * Page copy and people that are not synced from the desktop app.
 *
 * TODO: everything here is placeholder until the gym sends real text and photos.
 * Photos live in public/images/ (replace the files and keep the names, or change
 * the paths here).
 */

export const ABOUT_INTRO =
  "A community-focused gym in Haile Garment for people who want to get stronger, fitter and more consistent, whatever level they start at.";

export const ABOUT_STORY: readonly string[] = [
  "Liger Gym was founded in Haile Garment with a straightforward goal: create a training space where people can build real strength, train with purpose and stay consistent.",
  "We noticed too many gyms were either overcrowded or lacked proper coaching and community. We set out to build something different in Meskelegna: a clean, well-equipped space with solid barbells, racks, conditioning gear, and coaches who pay attention to your form.",
  "Whether you are lifting for the very first time or training for years, you are welcome here. We stay open seven days a week so your training fits your everyday life.",
];

export const VALUES: ReadonlyArray<{ icon: string; title: string; body: string }> = [
  {
    icon: "groups",
    title: "Everyone welcome",
    body: "Beginners and regulars train side by side. Nobody is too new to start.",
  },
  {
    icon: "fitness_center",
    title: "Real training",
    body: "Proper equipment and real guidance. The basics, done well.",
  },
  {
    icon: "bolt",
    title: "Consistency",
    body: "Open every day, so the habit is easy to keep.",
  },
];

export interface StaffMember {
  name: string;
  role: string;
  photo: string;
}

export const STAFF: readonly StaffMember[] = [
  { name: "Gedion", role: "Co-Founder", photo: "/images/staff-1.jpg" },
  { name: "Mustefa", role: "Co-Founder", photo: "/images/staff-2.jpg" },
  { name: "Abiy", role: "Coach", photo: "/images/staff-3.jpg" },
  { name: "Simret", role: "Front Desk", photo: "/images/staff-4.jpg" },
];
