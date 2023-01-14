import { CellObject, utils, WorkBook, WorkSheet, write } from "xlsx";

class WorkbookBuilder {
  private workbook: WorkBook;

  private get sheet(): WorkSheet {
    return this.workbook.Sheets[this.workbook.SheetNames[0]];
  }

  private currentRow = 1;
  public data: Uint8Array = new Uint8Array();

  constructor() {
    this.workbook = utils.book_new();
    utils.book_append_sheet(this.workbook, utils.aoa_to_sheet([[]]));
  }

  initializeHeader(headerData: unknown[][]) {
    if (this.currentRow === 1) {
      utils.sheet_add_aoa(this.sheet, headerData, {
        origin: `A${this.currentRow}`,
      });
      (this.sheet["O1"] as CellObject).v = "Contract Amount";
      this.currentRow++;
    }
  }

  addAoA(data: unknown[][]) {
    utils.sheet_add_aoa(this.sheet, data, { origin: `A${this.currentRow}` });
    this.currentRow = this.currentRow + data.length + 1;
  }

  async build() {
    this.data = write(this.workbook, { type: "array" });
    return this.data;
  }

  reset() {
    builder = new WorkbookBuilder();
  }
}

let builder = new WorkbookBuilder();
export { builder };
