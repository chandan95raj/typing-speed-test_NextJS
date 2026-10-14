import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="page-head">
      <h1>Page not found</h1>
      <p className="lead">The page you are looking for does not exist or has moved.</p>
      <div className="actions">
        <Link href="/" className="btn btn-primary">
          Go to the typing test
        </Link>
      </div>
    </div>
  );
}