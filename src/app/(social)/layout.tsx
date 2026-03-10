import Image from "next/image";
import Link from "next/link";

/**
 * Minimal layout for social ad landing pages.
 * No navbar, no footer, no distractions — just logo and content.
 */
export default function SocialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      {/* Minimal header — logo only */}
      <header className="flex items-center justify-center px-5 py-4 md:py-5">
        <Link href="/">
          <Image
            src="/images/pirk-logo.png"
            alt="Pirk"
            width={80}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
      </header>

      <main className="flex-1">{children}</main>

      {/* Minimal legal footer */}
      <footer className="py-6 text-center text-xs text-warm-grey/60">
        <p>
          © {new Date().getFullYear()} Pirk Pty Ltd · Australia&apos;s independent surgeon matching service ·{" "}
          <Link href="/privacy" className="underline hover:text-warm-grey">
            Privacy
          </Link>
        </p>
      </footer>
    </div>
  );
}
