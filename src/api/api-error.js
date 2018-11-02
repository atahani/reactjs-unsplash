//@flow

export default class APIError extends Error {
  code: number;
  errors: string;
}
