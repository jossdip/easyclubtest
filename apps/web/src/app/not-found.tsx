// Remove runtime config to let it be static by default
// export const runtime = 'edge';

export default function NotFound() {
  return (
    <html>
      <head>
        <title>Redirecting...</title>
        <meta httpEquiv="refresh" content="0;url=/" />
      </head>
      <body>
        <p>
          Page not found. Redirecting to <a href="/">home</a>...
        </p>
      </body>
    </html>
  );
}
