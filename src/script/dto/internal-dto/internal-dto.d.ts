import { InternalDtoRequest } from "./internal-dto-request";
import { InternalDtoResponse } from "./internal-dto-response";

export namespace InternalDto {
  export import Request = InternalDtoRequest;
  export import Response = InternalDtoResponse;
}
