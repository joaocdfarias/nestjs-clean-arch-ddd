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

export type SearchResultProps<E extends Entity, Filter> = {
  items: E[];
  total: number;
  currentPage: number;
  perPage: number;
  sort: string | null;
  sortDirection: SortDirection | null;
  filter: Filter | null;
};

export class SearchParams {
  protected _page: number;

  protected _perPage: number = 15;

  protected _sort: string | null;

  protected _sortDirection: SortDirection | null;

  protected _filter: string | null;

  constructor(props: SearchProps = {}) {
    this.page = props.page;
    this.perPage = props.perPage;
    this.sort = props.sort;
    this.sortDirection = props.sortDirection;
    this.filter = props.filter;
  }

  get page() {
    return this._page;
  }

  private set page(value: number) {
    let _page = Number(value);

    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      _page = 1;
    }

    this._page = _page;
  }

  get perPage() {
    return this._perPage;
  }

  private set perPage(value: number) {
    let _perPage = Number(value);

    if (
      Number.isNaN(_perPage) ||
      _perPage <= 0 ||
      parseInt(_perPage as any) !== _perPage ||
      typeof value === 'boolean'
    ) {
      _perPage = this._perPage;
    }

    this._perPage = _perPage;
  }

  get sort() {
    return this._sort;
  }

  private set sort(value: string | null) {
    this._sort =
      value === null || value === undefined || value === ''
        ? null
        : String(value);
  }

  get sortDirection() {
    return this._sortDirection;
  }

  private set sortDirection(value: SortDirection | null) {
    if (!this._sort) {
      this._sortDirection = null;
      return;
    }

    this._sortDirection = value !== 'ASC' && value !== 'DESC' ? 'DESC' : value;
  }

  get filter() {
    return this._filter;
  }

  private set filter(value: string | null) {
    this._filter =
      value === null || value === undefined || value === ''
        ? null
        : String(value);
  }
}

export class SearchResult<E extends Entity, Filter = string> {
  readonly items: E[];
  readonly total: number;
  readonly currentPage: number;
  readonly perPage: number;
  readonly lastPage: number;
  readonly sort: string | null;
  readonly sortDirection: SortDirection | null;
  readonly filter: Filter | null;

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items;
    this.total = props.total;
    this.currentPage = props.currentPage;
    this.perPage = props.perPage;
    this.lastPage = Math.ceil(this.total / this.perPage);
    this.sort = props.sort ?? null;
    this.sortDirection = props.sortDirection ?? null;
    this.filter = props.filter ?? null;
  }

  toJSON(forceEntity = false) {
    return {
      items: forceEntity ? this.items.map(item => item.toJSON()) : this.items,
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: this.lastPage,
      sort: this.sort,
      sortDirection: this.sortDirection,
      filter: this.filter,
    };
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(props: SearchParams): Promise<SearchOutput>;
}
