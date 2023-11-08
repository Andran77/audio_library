export class ApiListResponse<T> {
  list: T[];
  pageable: Pageable;
}

export class Pageable {
  page: number;
  size: number;
  total: number;

  constructor(
    page: number,
    size: number
  ) {
    this.page = page;
    this.size = size;
  }
}
