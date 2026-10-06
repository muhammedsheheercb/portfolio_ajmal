import Link from "next/link";
export default function NotFound() {
  return (
    <div className="page-shell missing-page">
      <span className="eyebrow">404 / OUT OF FRAME</span>
      <h1>This frame is missing.</h1>
      <p>Let’s find your way back to the story.</p>
      <Link href="/" className="solid-button">
        BACK HOME
      </Link>
    </div>
  );
}
