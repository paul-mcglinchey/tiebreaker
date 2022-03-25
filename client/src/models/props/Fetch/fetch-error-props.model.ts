export interface IFetchErrorProps {
  error: { message?: string } | undefined,
  isLoading: boolean,
  toggleRefresh: () => void
}