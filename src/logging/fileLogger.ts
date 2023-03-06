import { W_OK } from 'constants';
import {
  closeSync,
  Dirent,
  mkdirSync,
  opendirSync,
  openSync,
  statSync,
  appendFileSync,
  constants,
  accessSync,
  Dir,
} from 'fs';
import { access, appendFile, mkdir, stat } from 'fs/promises';
import * as os from 'os';
import { join } from 'path';

const { EOL } = os;

//@Injectable({ scope: Scope.DEFAULT })
export class FileLogger {
  protected fileNum: number;
  constructor(
    protected readonly path: string,
    protected readonly fileName: string,
    protected readonly size: number,
  ) {
    this.fileNum = this.searchOldFiles();
  }

  private async makeDir() {
    try {
      await access(this.path, W_OK);
    } catch (err: unknown) {
      await mkdir(this.path, { recursive: true }).catch((err) => {
        this.writeSync(JSON.stringify(err));
      });
    }
  }

  private makeDirSync() {
    try {
      accessSync(this.path, constants.W_OK);
    } catch (err) {
      mkdirSync(this.path, { recursive: true });
    }
  }

  private searchOldFiles() {
    this.makeDirSync();
    let dir: Dir;
    let count = 0;
    let dirent: Dirent;
    try {
      dir = opendirSync(this.path);
      while ((dirent = dir.readSync())) {
        if (dirent.isFile()) {
          count++;
        }
      }

      if (count > 0) {
        const fileName = this.genFileName(--count);
        const fileStat = statSync(join(this.path, fileName));
        if (fileStat.size < this.size) {
          return count; //{ fileName, num: count };
        }
        return ++count; //{ fileName: this.genFileName(++count), num: count};
      }
      return count; //{ fileName: this.genFileName(count), num: count};
    } catch (err) {
      this.writeSync(JSON.stringify(err));
    } finally {
      dir.closeSync();
    }
  }

  private genFileName(num: number) {
    return this.fileName + num + '.log';
  }

  public async write(data: string) {
    let fileName = this.genFileName(this.fileNum);
    try {
      const fileStat = await stat(join(this.path, fileName));

      if (fileStat.size >= this.size) {
        fileName = this.genFileName(++this.fileNum);
      }
    } catch (err) {}

    await appendFile(join(this.path, fileName), data + EOL);
  }

  public writeSync(data: string) {
    let fd: number;
    this.makeDirSync();
    try {
      fd = openSync(join(this.path, this.fileName + Date.now()), 'a');
      appendFileSync(fd, data, 'utf8');
    } finally {
      if (fd) closeSync(fd);
    }
  }
}
