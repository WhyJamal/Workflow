import { AndroidIcon } from "@/assets/icons/android-icon";
import Link from "next/link";

const footerLinks = [
  {
    column: [
      { label: "About Us", href: "/about" },
      { label: "Feedback", href: "/feedback" },
      { label: "Trust, Safety & Security", href: "/trust" },
    ],
  },
  {
    column: [
      { label: "Help & Support", href: "/help" },
      { label: "Upwork Foundation", href: "/foundation" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    column: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "CA Notice at Collection", href: "/ca-notice" },
      { label: "Your Privacy Choices", href: "/privacy-choices", hasIcon: true },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
  {
    column: [
      { label: "Desktop App", href: "/desktop" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Enterprise Solutions", href: "/enterprise" },
      { label: "Release notes", href: "/release-notes" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

// Privacy Choices Icon (the blue checkbox/X icon from the screenshot)
const PrivacyChoicesIcon = () => (
  <span className="inline-flex items-center ml-1" aria-hidden="true">
    <svg width="30" height="14" viewBox="0 0 30 14" fill="none">
      <rect width="30" height="14" rx="7" fill="#0057B7" />
      <rect x="1" y="1" width="12" height="12" rx="6" fill="white" />
      <path d="M4.5 7l2 2 3-3" stroke="#0057B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 4.5l4 5M23 4.5l-4 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </span>
);
  
export default function Footer() {
  return (
    <footer className="w-7xl mx-auto border-t border-gray-200 dark:border-gray-600 text-[#5e6d7e] dark:text-gray-300 pt-8 pb-6 px-6 md:px-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {footerLinks.map((group, groupIdx) => (
          <ul key={groupIdx} className="space-y-3">
            {group.column.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm hover:text-[#14a800] transition-colors duration-150 inline-flex items-center gap-1"
                >
                  {link.label}
                  {link.hasIcon && <PrivacyChoicesIcon />}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4">
        {/* Social Links */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#5e6d7e] font-medium">Follow Us</span>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-[#5e6d7e] hover:text-[#14a800] transition-colors duration-150"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile App */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#5e6d7e] font-medium">Mobile app</span>
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get it on Google Play"
            className="text-[#5e6d7e] hover:text-[#14a800] transition-colors duration-150"
          >
            <AndroidIcon />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <p className="mt-5 text-sm text-[#5e6d7e]">
        © 2015 - 2026 Upwork® Global LLC
      </p>
    </footer>
  );
}