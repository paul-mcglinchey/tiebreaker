export interface IProgressService {
  progress: number

  getProgress: () => number
  setProgress: (progress: number) => void 
}