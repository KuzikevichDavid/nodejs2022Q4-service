import {
  closeSync,
  Dirent,
  mkdirSync,
  opendirSync,
  openSync,
  statSync,
  writeSync,
} from 'fs';
import * as os from 'os';
import { join } from 'path';

const { EOL } = os;

export class FileLogger {
  protected fd: number;
  protected fileSize = 0;
  constructor(
    protected readonly path: string,
    protected readonly fileName: string,
    protected readonly size: number,
  ) {
    this.createNewStream();
    process.on('SIGINT', () => {
      this.close();
    });
  }

  private getfilename() {
    mkdirSync(this.path, { recursive: true });

    const dir = opendirSync(this.path);
    let count = 0;
    let dirent: Dirent;
    while ((dirent = dir.readSync())) {
      if (dirent.isFile()) {
        count++;
      }
    }
    dir.closeSync();

    this.fileSize = 0;

    try {
      const fileName = this.fileName + (count === 0 ? 0 : count - 1) + '.log';
      const stat = statSync(fileName);
      if (stat.isFile() && stat.size < this.size) {
        this.fileSize = stat.size;
        return fileName;
      }
    } catch (err) {}

    return this.fileName + count + '.log';
  }

  private createNewStream() {
    if (this.fd) closeSync(this.fd);

    const fileName = join(this.path, this.getfilename());
    this.fd = openSync(fileName, 'a');
    this.fileSize = 0;
  }

  public write(chunk: string) {
    writeSync(this.fd, chunk + EOL);
    if (this.fileSize + chunk.length >= this.size) {
      this.createNewStream();
    } else this.fileSize += chunk.length;
  }

  close() {
    try {
      if (this.fd) closeSync(this.fd);
    } catch (err) {}
  }
}
