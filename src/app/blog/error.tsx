"use client";
export default function BlogError({ reset }: { reset: () => void }) { return <main style={{padding:'4rem'}}><h1>Blog temporarily unavailable</h1><p>Please try again shortly.</p><button className="btn" onClick={reset}>Try again</button></main>; }
