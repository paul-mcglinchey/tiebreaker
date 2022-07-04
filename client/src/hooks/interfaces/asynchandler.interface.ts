export interface IAsyncHandler {
  asyncHandler: (fn: (...args: any[]) => any, notify?: boolean) => (...args: any) => Promise<void>
  asyncReturnHandler: <T>(fn: (...args: any[]) => any) => (...args: any) => Promise<void | T>
}