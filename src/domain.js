export function distance(a, b) { const rad = x => x * Math.PI / 180; const dlat = rad(b.lat - a.lat), dlng = rad(b.lng - a.lng); const h = Math.sin(dlat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dlng / 2) ** 2; return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(Math.max(0, 1 - h))); }
export function routeLength(base, stops) { if (!stops.length)
    return 0; return stops.reduce((sum, s, i) => sum + distance(i ? stops[i - 1] : base, s), 0) + distance(stops[stops.length - 1], base); }
export function optimize(base, stops) { const remaining = [...stops], result = []; let current = base; while (remaining.length) {
    let index = 0;
    remaining.forEach((s, i) => { if (distance(current, s) < distance(current, remaining[index]))
        index = i; });
    current = remaining.splice(index, 1)[0];
    result.push(current);
} return result; }
