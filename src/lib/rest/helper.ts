export function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export function isBuildTime() {
  return (
    process.env.NEXT_PHASE === 'phase-production-build' ||
    process.env.VERCEL === '1'
  );
}
