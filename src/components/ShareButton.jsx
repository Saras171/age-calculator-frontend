import React, { useState } from "react";
import {
  Share2,
  MessageCircleMore,
  Mail,
  Copy,
  Twitter,
} from "lucide-react";

// ShareButtons Component
// This component provides social sharing options (Twitter, WhatsApp, LinkedIn, etc.)
// along with a toggleable dropdown and copy-to-clipboard functionality.

export default function ShareButtons({ message, url }) {
  const [showOptions, setShowOptions] = useState(false); // Toggle visibility of share options

  // Encode message and URL for use in sharing links
  const encodedMessage = encodeURIComponent(message);
  const encodedUrl = encodeURIComponent(url);

  // Toggle visibility of share buttons
  const toggleShareOptions = () => setShowOptions(!showOptions);

  // Array of available share options (platforms & their respective properties)
  const shareOptions = [
    {
      label: "Copy",
      icon: <Copy className="w-4 h-4 mr-1" />,
      action: () => navigator.clipboard.writeText(`${message} ${url}`),
      bg: "bg-blue-500 hover:bg-white hover:text-blue-600",
    },
    {
      label: "X (Twitter)",
      icon: <Twitter className="w-4 h-4 mr-1" />,
      href: `https://x.com/share?text=${encodedMessage}&url=${encodedUrl}`,
      bg: "bg-black hover:bg-white hover:text-black",
    },
    {
      label: "WhatsApp",
      icon: <MessageCircleMore className="w-4 h-4 mr-1" />,
      href: `https://wa.me/?text=${encodedMessage}%20${encodedUrl}`,
      bg: "bg-green-500 hover:bg-white hover:text-green-600",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      bg: "bg-blue-700 hover:bg-white hover:text-blue-800",
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      bg: "bg-indigo-700 hover:bg-white hover:text-indigo-800",
    },
     {
  label: "Email",
  icon: <Mail className="w-4 h-4 mr-1" />,
  href: `mailto:?subject=${encodeURIComponent("Check this out!")}&body=${encodeURIComponent(`${message}\n\n${url}`)}`,
  bg: "bg-red-500 hover:bg-white hover:text-red-600",
}

  ];

  return (
    <div className="flex flex-col items-center">
      {/* Main Share Button */}
      <button
        onClick={toggleShareOptions}
        className="h-10 flex items-center text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-indigo-700 transition-all duration-300"
      >
        <Share2 className="inline-block w-4 h-4 mr-1" /> Share
      </button>

      {/* Conditionally render sharing options if toggled on */}
      {showOptions && (
        <div className="mt-4 flex flex-wrap justify-center gap-2 animate-fade-in">
          {shareOptions.map((option, index) =>
            option.action ? (
              // Render button if it's an action (e.g., copy to clipboard)
              <button
                key={index}
                onClick={option.action}
                className={`flex items-center text-sm text-white px-3 py-1 rounded ${option.bg} transition-all duration-300`}
              >
                {option.icon} {option.label}
              </button>
            ) : (
              // Render anchor tag for external share URLs
              <a
                key={index}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center text-sm text-white px-3 py-1 rounded ${option.bg} transition-all duration-300`}
              >
                {option.icon} {option.label}
              </a>
            )
          )}
        </div>
      )}
    </div>
  );
}
