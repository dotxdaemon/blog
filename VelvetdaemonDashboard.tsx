// ABOUTME: Renders a monochrome personal dashboard card with listening and recent post modules.
// ABOUTME: Provides configurable track, post list, and status text with strict neo-brutalist styling.
import { AudioLines } from 'lucide-react';

type Track = {
  title: string;
  artist: string;
};

type Post = {
  title: string;
  date: string | Date;
  href: string;
};

type VelvetdaemonDashboardProps = {
  track?: Track;
  posts?: Post[];
  statusText?: string;
};

const defaultPosts: Post[] = [
  { title: 'signal check', date: '2026-01-04', href: '#' },
  { title: 'quiet compile', date: '2026-01-02', href: '#' },
  { title: 'night log', date: '2025-12-29', href: '#' },
];

function formatDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '0000.00.00';

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}

export default function VelvetdaemonDashboard({
  track,
  posts = defaultPosts,
  statusText = 'UPTIME: 99.9%  v2.0.26',
}: VelvetdaemonDashboardProps) {
  return (
    <div className="relative w-full max-w-5xl rounded-none border border-zinc-800 bg-zinc-950 p-6 text-zinc-50 sm:p-8">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20" aria-hidden="true">
        <div className="h-full w-full rounded-none bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08)_1px,_transparent_1px)] bg-[length:16px_16px]" />
      </div>

      <div className="relative z-10 grid min-h-[28rem] grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <section className="flex flex-col justify-end border border-zinc-800 rounded-none p-5 sm:p-6">
          <header className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">LISTENING TO</header>

          {track ? (
            <div className="flex items-end gap-4">
              <div className="flex h-14 items-end gap-1" aria-hidden="true">
                <span className="visualizer-bar h-4 w-1 bg-zinc-50" />
                <span className="visualizer-bar h-8 w-1 bg-zinc-50 [animation-delay:120ms]" />
                <span className="visualizer-bar h-6 w-1 bg-zinc-50 [animation-delay:260ms]" />
                <span className="visualizer-bar h-10 w-1 bg-zinc-50 [animation-delay:380ms]" />
                <span className="visualizer-bar h-5 w-1 bg-zinc-50 [animation-delay:500ms]" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="overflow-hidden">
                  <p className="track-marquee whitespace-nowrap text-2xl font-bold uppercase leading-tight sm:text-3xl">
                    {track.title}
                  </p>
                </div>
                <p className="mt-2 text-base text-zinc-400 sm:text-lg">{track.artist}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <AudioLines className="h-6 w-6" aria-hidden="true" />
              <p className="font-mono text-sm uppercase tracking-widest text-zinc-400">
                // SILENCE <span className="cursor-block inline-block">█</span>
              </p>
            </div>
          )}
        </section>

        <section className="flex flex-col justify-end border border-zinc-800 rounded-none p-5 sm:p-6">
          <header className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">RECENT POSTS</header>
          <ul className="space-y-2">
            {posts.map((post) => (
              <li key={`${post.href}-${post.title}`}>
                <a
                  href={post.href}
                  className="group flex items-center gap-3 border border-zinc-800 rounded-none px-3 py-2 font-sans hover:bg-white hover:text-black"
                >
                  <span className="shrink-0 font-mono text-xs tracking-widest text-zinc-500 group-hover:text-black">
                    {formatDate(post.date)}
                  </span>
                  <span className="h-px flex-1 border-b border-dotted border-zinc-700 group-hover:border-black" />
                  <span className="min-w-0 flex-1 truncate text-sm font-bold lowercase sm:text-base">{post.title.toLowerCase()}</span>
                  <span className="invisible font-bold group-hover:visible">→</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="relative z-10 mt-6 border-t border-zinc-800 pt-2 font-mono text-[10px] tracking-widest text-zinc-500">
        {statusText}
      </footer>

      <style jsx>{`
        .visualizer-bar {
          animation: pulse 900ms steps(2, end) infinite;
          transform-origin: bottom;
        }

        .track-marquee {
          animation: ticker 16s linear infinite;
        }

        .cursor-block {
          animation: blink 1s steps(2, end) infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scaleY(0.35);
          }
          50% {
            transform: scaleY(1);
          }
        }

        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-45%);
          }
        }

        @keyframes blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
