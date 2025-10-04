import qs from 'qs';
import _ from 'lodash';

export class Datatable {
  constructor(dataArray, req) {
    this.originalData = dataArray;
    this.filteredData = dataArray;
    this.req = req;

    this.paramOrderBy = null
    this.paramFilters = null;
    this.paramGlobalSearch = null;
    this.paramPage = 1;
    this.paramPageSize = 10;

    this.prepareQuery();
    this.globalSearch();
    this.filterByColumns();
    this.orderBy();
  }

  prepareQuery() {
    const query = qs.parse(this.req);
    this.paramPage = parseInt(query?.page) || 1;
    this.paramPageSize = parseInt(query?.pageSize) || 10;
    this.paramGlobalSearch = query?.globalSearch;
    this.paramFilters = query?.filters || [];
    this.paramOrderBy = query?.orderByCollection || [];
  }

  orderBy() {
    if (!Array.isArray(this.paramOrderBy) || this.paramOrderBy.length === 0) return;

    const columns = this.paramOrderBy.map(o => o.column);
    const directions = this.paramOrderBy.map(o => (o.direction === 'desc' ? 'desc' : 'asc'));

    this.filteredData = _.orderBy(this.filteredData, columns, directions);
  }


  filterByColumns() {
    if (!Array.isArray(this.paramFilters) || this.paramFilters.length === 0) return;

    this.filteredData = this.filteredData.filter(item => {
      return this.paramFilters.every(filter => {
        const field = filter.field;
        const value = (filter.value || '').toLowerCase();

        const itemValue = _.get(item, field);
        if (Array.isArray(itemValue)) {
          return itemValue.join(' ').toLowerCase().includes(value);
        }

        return String(itemValue ?? '').toLowerCase().includes(value);
      });
    });
  }

  globalSearch() {
    const keyword = this.paramGlobalSearch?.search?.trim()?.toLowerCase();
    if (!keyword) return;

    const columns = this.paramGlobalSearch?.columns || [];
    if (columns.length === 0) return;

    this.filteredData = this.originalData.filter(item => {
      return columns.some(col => {
        const value = _.get(item, col.field);

        if (Array.isArray(value)) {
          return value.join(' ').toLowerCase().includes(keyword);
        }

        return String(value ?? '').toLowerCase().includes(keyword);
      });
    });
  }

  paginate() {
    const skip = (this.paramPage - 1) * this.paramPageSize;
    return this.filteredData.slice(skip, skip + this.paramPageSize);
  }

  async toJson() {
    const paginatedData = this.paginate();
    return {
      data: paginatedData,
      page: this.paramPage,
      totalCount: this.filteredData.length,
    };
  }
}
