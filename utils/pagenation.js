class Pagenations {
  constructor(totalCount, currentPage, pageUri, perPage = 2) {
    this.perPage = perPage;
    this.totalCount = parseInt(totalCount);
    this.currentPage = parseInt(currentPage);
    this.nextPage = this.currentPage - 1;
    this.priviousPage = this.currentPage + 1;
    this.pageCount = Math.ceil(this.totalCount / this.perPage);
    this.nextPage = this.nextPage;
  }
}
