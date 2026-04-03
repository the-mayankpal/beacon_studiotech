import fs from 'fs/promises';

async function download() {
  const opts = { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } };
  try {
    const res1 = await fetch('https://upload.wikimedia.org/wikipedia/commons/f/f8/George_Washington_signature.svg', opts);
    await fs.writeFile('src/assets/svgs/george-washington-signature.svg', Buffer.from(await res1.arrayBuffer()));
    console.log('Downloaded George Washington SVG');

    const res2 = await fetch('https://upload.wikimedia.org/wikipedia/commons/f/f3/Thomas_Jefferson_Signature.svg', opts);
    await fs.writeFile('src/assets/svgs/thomas-jefferson-signature.svg', Buffer.from(await res2.arrayBuffer()));
    console.log('Downloaded Thomas Jefferson SVG');
  } catch (e) {
    console.error(e);
  }
}
download();
