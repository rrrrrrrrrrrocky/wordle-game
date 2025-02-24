import { AxiosError } from "axios";

export namespace CommonDto {
  type _CustomAxiosError<T = unknown> = AxiosError<T>;
}
