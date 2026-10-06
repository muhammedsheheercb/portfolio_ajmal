"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="page-shell missing-page">
      <h1>Something went wrong.</h1>
      <p>Please try loading this page again.</p>
      <button className="solid-button" onClick={reset}>
        TRY AGAIN
      </button>
    </div>
  );
}
