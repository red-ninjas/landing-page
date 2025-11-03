export function delay(ms: number) {
  console.log('COOLDOWN BUILDING');
  return new Promise((res) => setTimeout(res, ms + 250));
}

export function isBuildTime() {
  return (
    process.env.NEXT_PHASE === 'phase-production-build' ||
    process.env.VERCEL === '1'
  );
}
