import { readFile } from "node:fs/promises";
import path from "node:path";
import { crc32 } from "node:zlib";

type ZipEntry = {
  name: string;
  data: Buffer;
};

// 2026-11-02, stored so unzippers do not treat the stamp as unset.
const dosTime = 0;
const dosDate = ((2026 - 1980) << 9) | (11 << 5) | 2;

function storeZip(entries: ZipEntry[]): Buffer {
  const locals: Buffer[] = [];
  const centrals: Buffer[] = [];
  let offset = 0;

  for (const entry of entries) {
    const name = Buffer.from(entry.name);
    const checksum = crc32(entry.data) >>> 0;
    const size = entry.data.length;

    const local = Buffer.alloc(30 + name.length);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 8);
    local.writeUInt16LE(dosTime, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(checksum, 14);
    local.writeUInt32LE(size, 18);
    local.writeUInt32LE(size, 22);
    local.writeUInt16LE(name.length, 26);
    name.copy(local, 30);

    const central = Buffer.alloc(46 + name.length);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0, 10);
    central.writeUInt16LE(dosTime, 12);
    central.writeUInt16LE(dosDate, 14);
    central.writeUInt32LE(checksum, 16);
    central.writeUInt32LE(size, 20);
    central.writeUInt32LE(size, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt32LE(offset, 42);
    name.copy(central, 46);

    locals.push(local, entry.data);
    centrals.push(central);
    offset += local.length + size;
  }

  const directory = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(directory.length, 12);
  end.writeUInt32LE(offset, 16);

  return Buffer.concat([...locals, directory, end]);
}

export async function downloadZip(pack: {
  filename: string;
  files: readonly string[];
}): Promise<Response> {
  const entries = await Promise.all(
    pack.files.map(async (src) => ({
      name: path.posix.basename(src),
      data: await readFile(path.join(process.cwd(), "public", src.replace(/^\/+/, ""))),
    })),
  );
  const body = storeZip(entries);

  return new Response(new Uint8Array(body), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${pack.filename}"`,
      "Content-Length": String(body.length),
    },
  });
}
