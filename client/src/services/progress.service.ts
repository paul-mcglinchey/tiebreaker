import { IProgressService } from "./interfaces";

export class ProgressService implements IProgressService {
  progress: number;

  constructor(progress?: number) {
    this.progress = progress ?? 0;
  }

  getProgress = () => this.progress;

  setProgress = (progress: number) => this.progress = progress;
}