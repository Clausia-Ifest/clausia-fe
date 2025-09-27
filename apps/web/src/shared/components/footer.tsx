export function Footer() {
  return (
    <footer className="mt-12 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Brand + socials */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10">
                <span className="font-bold text-lg">C</span>
              </div>
              <span className="font-semibold text-xl">ClausIA</span>
            </div>
            <p className="mt-4 max-w-md text-sm opacity-90">
              Lorem ipsum dolor sit amet consectetur. Eleifend elementum velit
              sed tellus.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {/* simple social icons */}
              {["yt", "ig", "x", "li"].map((k) => (
                <a
                  aria-label={`Social ${k}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition hover:bg-primary-foreground/20"
                  href="#"
                  key={k}
                >
                  <span className="font-semibold text-xs uppercase">{k}</span>
                </a>
              ))}
            </div>

            <p className="mt-4 text-xs opacity-80">Lorem, 2023</p>
          </div>

          {/* Contacts */}
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <IconMapPin />
              <p className="text-sm opacity-90">
                Jl. Ilmu No. 123, Jakarta, Indonesia 10230
              </p>
            </div>
            <div className="flex items-center gap-3">
              <IconMail />
              <a className="text-sm underline" href="mailto:support@pelindo.id">
                support@pelindo.id
              </a>
            </div>
            <div className="flex items-center gap-3">
              <IconPhone />
              <a className="text-sm underline" href="tel:+6281234567890">
                +62 812 3456 7890
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-primary-foreground/20 border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs opacity-90 md:flex-row">
          <p>
            © {new Date().getFullYear()} Basic Computing Community FILKOM UB.
            All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a className="underline" href="#">
              Term of service
            </a>
            <a className="underline" href="#">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function IconMapPin() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 text-primary-foreground"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 21s7-5.5 7-10a7 7 0 10-14 0c0 4.5 7 10 7 10z"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 text-primary-foreground"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M3 7l9 6 9-6" />
      <rect height="14" rx="2" width="18" x="3" y="5" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 text-primary-foreground"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 006.5 6.5L17 13l4 1.5v3A2.5 2.5 0 0118.5 20 15.5 15.5 0 013 5.5 2.5 2.5 0 015.5 3h1z" />
    </svg>
  );
}
