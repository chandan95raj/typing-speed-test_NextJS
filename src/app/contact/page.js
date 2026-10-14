export const metadata = {
  title: "Contact",
  description: "Contact the SpeedType team with questions, feedback or bug reports.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div>
      <header className="page-head">
        <h1>Contact</h1>
        <p className="lead">Questions, feedback or a bug to report? We would like to hear from you.</p>
      </header>
      <section className="prose">
        <p>
          Email us at{" "}
          <a href="mailto:hello@yourdomain.com">hello@yourdomain.com</a>.
        </p>
        <p>
          When reporting a bug, please include your browser, your device and what you were doing
          when the problem happened.
        </p>
      </section>
    </div>
  );
}