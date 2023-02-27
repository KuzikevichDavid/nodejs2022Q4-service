import { createWriteStream, WriteStream } from 'fs';
import * as os from 'os';
import { mkdir, opendir, stat } from 'fs/promises';
import { join } from 'path';

const { EOL } = os;

export class FileLogger {
  protected fileStream: WriteStream;
  protected fileSize = 0;
  constructor(
    protected readonly path: string,
    protected readonly fileName: string,
    protected readonly size: number,
  ) {
    process.on('SIGINT', () => {
      this.fileStream.end();
    });
  }

  async init() {
    await this.createNewStream();
  }

  private async getfilename() {
    await mkdir(this.path, { recursive: true });
    const dir = await opendir(this.path);
    let count = 0;
    for await (const dirent of dir) {
      if (dirent.isFile()) {
        count++;
      }
    }
    try {
      const fd = await stat(
        this.fileName + (count === 0 ? 0 : count - 1) + '.log',
      );
      if (fd.isFile()) this.fileSize = fd.size;
    } catch (err) {}
    return this.fileName + count + '.log';
  }

  private async createNewStream() {
    if (this.fileStream) this.fileStream.end();
    this.fileSize = 0;
    this.fileStream = createWriteStream(
      join(this.path, await this.getfilename()),
      { flags: 'a' },
    );
  }

  async write(chunk: any) {
    if (this.fileSize + this.fileStream.bytesWritten >= this.size)
      await this.createNewStream();
    this.fileStream.write(chunk + EOL);
  }

  end() {
    this.fileStream.end();
  }
}
