/**
 * Area calculation from individual dimension rows.
 * Each row: { width, height, quantity }
 * indeks: divisor for unit conversion (1000=mm, 100=cm, 1=m)
 */
export function calculateArea(rows, indeks) {
  const results = [];
  let totalM2 = 0;

  for (const row of rows) {
    const { width, height, quantity } = row;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const k = parseInt(quantity, 10) || 1;
    const idx = parseFloat(indeks) || 1;

    const rowM2 = Math.round(((w / idx) * (h / idx)) * k * 100) / 100;
    totalM2 += rowM2;
    results.push({ width: w, height: h, quantity: k, m2: rowM2 });
  }

  return { results, totalM2: Math.round(totalM2 * 100) / 100 };
}

/**
 * Area calculation from text input.
 * Parses dimensions in format: 500x200, 300X150, 400*100
 */
export function calculateAreaFromText(text, indeks) {
  const regex = /(\d+)\s*[xX*]\s*(\d+)/g;
  const results = [];
  let totalM2 = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const w = parseInt(match[1], 10);
    const h = parseInt(match[2], 10);
    const idx = parseFloat(indeks) || 1;

    const rowM2 = Math.round(((w / idx) * (h / idx)) * 100) / 100;
    totalM2 += rowM2;
    results.push({ width: w, height: h, m2: rowM2 });
  }

  return { results, totalM2: Math.round(totalM2 * 100) / 100 };
}

/**
 * Calculate center alignment offset.
 * Returns the offset from each side to center a segment within a surface.
 */
export function calculateCenter(surfaceWidth, segmentWidth) {
  const sw = parseFloat(surfaceWidth) || 0;
  const sg = parseFloat(segmentWidth) || 0;

  if (sg >= sw) {
    return { error: 'Širina segmenta je ista ili veća od površine!' };
  }

  const middle = (sw - sg) / 2;
  const segmentPercent = (sg / sw) * 100;
  const middlePercent = (100 - segmentPercent) / 2;

  return {
    middle: Math.round(middle * 100) / 100,
    surfaceWidth: sw,
    segmentWidth: sg,
    segmentPercent,
    middlePercent,
  };
}

/**
 * Calculate vinyl roll usage.
 * Parses text with format: WidthxHeight or WidthxHeight@Quantity
 */
export function calculateRoll(text, vinylWidth, cutOrientation, indeks) {
  const regex = /(\d+)\s*[xX*]\s*(\d+)(?:\s*[@#?]\s*(\d+))?/g;
  const walls = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    const wallWidth = parseInt(match[1], 10);
    const wallHeight = parseInt(match[2], 10);
    const quantity = match[3] ? parseInt(match[3], 10) : 1;
    walls.push({ wallWidth, wallHeight, quantity });
  }

  if (walls.length === 0) {
    return { error: 'Neispravan format! Koristi "Dužina x Širina" ili "Dužina x Širina@Količina".' };
  }

  const vw = parseFloat(vinylWidth) || 0;
  if (vw <= 0) {
    return { error: 'Širina role mora biti veća od 0!' };
  }

  let totalVinylUsage = 0;
  const details = [];

  for (const wall of walls) {
    const { wallWidth, wallHeight, quantity } = wall;
    let stripsNeeded, vinylUsage;

    if (cutOrientation === 'vertical') {
      stripsNeeded = Math.ceil(wallWidth / vw);
      vinylUsage = stripsNeeded * wallHeight;
    } else {
      stripsNeeded = Math.ceil(wallHeight / vw);
      vinylUsage = stripsNeeded * wallWidth;
    }

    totalVinylUsage += vinylUsage * quantity;
    details.push({
      wallWidth,
      wallHeight,
      quantity,
      stripsNeeded,
      vinylUsage: vinylUsage * quantity,
    });
  }

  const idx = parseFloat(indeks) || 1;
  const totalMeters = Math.round((totalVinylUsage / idx) * 100) / 100;

  return { details, totalMeters, totalVinylUsage };
}

/**
 * Calculate pricing summary.
 */
export function calculatePricing(totalM2, nabavnaCijena, izlaznaCijena) {
  const nb = parseFloat(nabavnaCijena) || 0;
  const iz = parseFloat(izlaznaCijena) || 0;
  const total = parseFloat(totalM2) || 0;

  return {
    sumNabavna: Math.round(nb * total * 100) / 100,
    sumIzlazna: Math.round(iz * total * 100) / 100,
    zarada: Math.round((iz - nb) * total * 100) / 100,
  };
}
