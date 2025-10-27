import { NextResponse } from 'next/server';
import { getPartiesByRegion, getTopParties, getParties } from '../../actions/getParties';

export const dynamic = 'force-dynamic';

function now() {
  const t = (process as any).hrtime?.bigint?.();
  return t ? Number(t / 1000000n) : Date.now();
}

async function time<T>(fn: () => Promise<T>) {
  const t0 = now();
  const v = await fn();
  const t1 = now();
  return { v, ms: t1 - t0 };
}

function stats(ns: number[]) {
  const sorted = [...ns].sort((a, b) => a - b);
  const sum = sorted.reduce((a, b) => a + b, 0);
  const avg = sum / Math.max(sorted.length, 1);
  const p50 = sorted[Math.floor(sorted.length * 0.5)] ?? 0;
  const p95 = sorted[Math.floor(sorted.length * 0.95)] ?? 0;
  return { avg, p50, p95, samples: sorted.length };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const N = Math.max(1, Math.min(25, Number(searchParams.get('n') || '5')));
  const region = searchParams.get('region') || 'IQ-AN';

  const runsTop: number[] = [];
  const runsAll: number[] = [];
  const runsReg: number[] = [];

  // one warm-up per function to avoid cold-start skew
  await getTopParties();
  await getParties();
  await getPartiesByRegion(region);

  for (let i = 0; i < N; i++) {
    runsTop.push((await time(() => getTopParties())).ms);
    runsAll.push((await time(() => getParties())).ms);
    runsReg.push((await time(() => getPartiesByRegion(region))).ms);
  }

  // Safety: ensure shapes are intact
  const sampleTop = await getTopParties();
  const sampleAll = await getParties();
  const sampleReg = await getPartiesByRegion(region);

  const shape = {
    top: sampleTop.map(p => ({ id: p.id, abbr: p.abbr })).length,
    all: sampleAll.map(p => ({ id: p.id, abbr: p.abbr })).length,
    reg: sampleReg.map(p => ({ id: p.id, loc0: (p as any).locations?.[0]?.numberOfVoting ?? null })).length,
  };

  return NextResponse.json({
    n: N,
    region,
    timings: {
      top: stats(runsTop),
      all: stats(runsAll),
      region: stats(runsReg),
    },
    shape,
  });
}
