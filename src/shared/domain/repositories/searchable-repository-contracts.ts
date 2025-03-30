import { Entity } from '@/shared/domain/entities/entity';
import { RepositoryInterface } from './repository-contracts';

export type SortDirection = 'ASC' | 'DESC';

export type SearchProps<Filter = string> = {
  page?: number;
  perPage?: number;
  sort?: string | null;
  sortDirection?: SortDirection | null;
  filter?: Filter | null;
};

export class SearchParams {
  protected _page: number;

  protected _perPage: number = 15;

  protected _sort: string | null;

  protected _sortDirection: SortDirection | null;

  protected _filter: string | null;

  constructor(props: SearchProps) {
    this._page = props.page;
    this._perPage = props.perPage;
    this._sort = props.sort;
    this._sortDirection = props.sortDirection;
    this._filter = props.filter;
  }

  get page() {
    return this._page;
  }

  private set page(value: number) {}

  get perPage() {
    return this._perPage;
  }

  private set perPage(value: number) {}

  get sort() {
    return this._sort;
  }

  private set sort(value: string | null) {}

  get sortDirection() {
    return this._sortDirection;
  }

  private set sortDirection(value: SortDirection | null) {}

  get filter() {
    return this._filter;
  }

  private set filter(value: string | null) {}
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(props: SearchParams): Promise<SearchOutput>;
}
