const en = {
  header: {
    productName: "Spotify Now Playing",
  },
  landing: {
    title: "MSN‑style now‑playing profile & embed",
    subtitle: "Connect Spotify and create a live now‑playing badge for your README.",
  },
  login: {
    placeholder: "your username (e.g. husnu)",
    button: "Sign in with Spotify",
  },
  settings: {
    groups: {
      visual: "Visual",
      style: "Style",
    },
    labels: {
      cover: "Cover image",
      link: "Open Spotify",
      time: "Duration",
      progress: "Progress bar",
      theme: "Theme",
      layout: "Layout",
      variant: "Variant",
      dark: "Dark",
      light: "Light",
      horizontal: "Horizontal",
      vertical: "Vertical",
      default: "Default",
      compact: "Compact",
    },
    placeholder: {
      title: "Widget Settings",
      description: "Enter your username and sign in with Spotify to see widget customization options here.",
      hint: "Waiting for username..."
    }
  },
  preview: {
    overlayLogin: "Sign in with Spotify to preview",
    empty: "Sign in with Spotify to preview",
  },
  embed: {
    title: "Embed URL",
    copyUrl: "Copy URL",
    copyMd: "Markdown",
    copied: "Copied!",
  },
  info: {
    readmeBadge: {
      title: "README Badge",
      desc: "A live SVG for your GitHub README. Copy the Embed URL into README.md.",
    },
  },
  contact: {
    text: "Contact with me",
  },
  legal: {
    privacy: {
      title: "Privacy Policy",
      updated: "Last updated",
      sections: {
        introTitle: "Introduction",
        introBody: "This policy explains what data is processed when you use the now‑playing profile and embed.",
        dataTitle: "Data We Process",
        dataBody: "We store your Spotify refresh token to obtain short‑lived access tokens. We may fetch now‑playing and recently‑played track metadata (title, artist, album, cover URL, Spotify link) to render your badge.",
        usageTitle: "How We Use Data",
        usageBody: "Refresh tokens are used only to call the Spotify API on your behalf to show your current or last played track. We do not sell or share your data.",
        cookiesTitle: "Cookies",
        cookiesBody: "We set a small cookie to remember your selected username and language preference (no tracking).",
        thirdTitle: "Third‑Party Services",
        thirdBody: "We use Spotify APIs and may use Vercel KV for secure storage of your refresh token.",
        retentionTitle: "Data Retention",
        retentionBody: "You can revoke and delete your stored token anytime via the revoke endpoint. Otherwise, we retain the token until you revoke access.",
        rightsTitle: "Your Rights",
        rightsBody: "You may revoke access, request deletion of your stored token, and stop using the service at any time.",
        contactTitle: "Contact",
        contactBody: "For questions, contact me on LinkedIn: linkedin.com/in/husnu",
      },
    },
    terms: {
      title: "Terms of Service",
      updated: "Last updated",
      sections: {
        introTitle: "Introduction",
        introBody: "These Terms govern your use of the now‑playing profile and embed. Please read them carefully.",
        acceptTitle: "Acceptance of Terms",
        acceptBody: "By using the service, you agree to these Terms.",
        useTitle: "Use of Service",
        useBody: "You may embed the now‑playing badge and use your public profile link where permitted. Do not abuse APIs or infringe others’ rights.",
        contentTitle: "Your Content",
        contentBody: "You are responsible for content displayed via your Spotify account and embeds.",
        prohibitedTitle: "Prohibited Activities",
        prohibitedBody: "No scraping, spamming, reverse engineering, or unlawful use.",
        disclaimerTitle: "Disclaimers",
        disclaimerBody: "The service is provided ‘as is’ without warranties. Spotify is a separate platform and not affiliated.",
        liabilityTitle: "Limitation of Liability",
        liabilityBody: "To the maximum extent permitted by law, we are not liable for any indirect, incidental, or consequential damages.",
        changesTitle: "Changes",
        changesBody: "We may update these Terms from time to time. Continued use constitutes acceptance of the updated Terms.",
        lawTitle: "Governing Law",
        lawBody: "These Terms are governed by applicable laws of your jurisdiction unless otherwise required.",
        contactTitle: "Contact",
        contactBody: "For questions, contact me on LinkedIn: linkedin.com/in/husnu",
      },
    },
  },
} as const;

export default en;
