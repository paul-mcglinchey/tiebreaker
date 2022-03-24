export interface IUserService {
  getDefaultGroup: (groupType: string) => Promise<string>
} 