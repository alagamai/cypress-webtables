describe('get web table elements', () => {
	beforeEach(() => {
		cy.visit('https://datatables.net/examples/styling/bootstrap.html');
	});

	it('print all Cell Contents of Web Table', () => {
		cy.printCells_rowbyrow_1();
	});

	it('Get All Cell Contents of Web Table in array', () => {
		cy.getTotalIndexes().then(totalIndexes => {
			cy.getTableData().then(Values => {
				for (let i = 0; i < totalIndexes; i++) {
					Values[i].forEach(val => {
						cy.log(val);
					});
				}
			});
		});
	});
	it.only('print Contents of each row of Web Table', () => {
		cy.printCells_rowbyrow();
	});
	it('find all cells within the selected row', () => {
		const rowNo = 3;
		cy.getRowData(rowNo).then(val => {
			val.forEach(v => {
				cy.log(v);
			});
		});
	});

	it('get contents of next and prev cell', () => {
		cy.getPrevNextCellData(20).then(({ prev, next }) => {
			cy.log(prev);
			cy.log(next);
		});
	});

	it('get contents of cell using cell number', () => {
		cy.getCellData_usingCellNum(50).then(val => {
			cy.log(val);
		});
	});

	it('get contents of all column values in text format', () => {
		cy.getColumnDataInText(3).then(val => {
			cy.log(val);
		});
	});

	it('get contents of all column values in Array format', () => {
		cy.getColumnDataInArray(3).then(val => {
			val.forEach(v => {
				cy.log(v);
			});
		});
	});

	it('get contents of all prev columns values', () => {
		const colNum = 4;
		cy.getPrevColumnData(colNum).then(val => {
			val.forEach(v => {
				cy.log(v);
			});
		});
	});

	it('get contents of all next columns values', () => {
		cy.getNextColumnData(3).then(val => {
			val.forEach(v => {
				cy.log(v);
			});
		});
	});

	it('get contents of prev cell', () => {
		const colNum = 4,
			rowNum = 2;
		cy.getPrevCellData(colNum, rowNum).then(val => {
			cy.log(val);
		});
	});

	it('get contents of selected cell', () => {
		const rowNum = 5;
		cy.getRowDataInText(rowNum).then(val => {
			cy.log(val);
		});
	});

	it('Get content of specified row and cell', () => {
		const rowNum = 5,
			colNum = 0;

		cy.getCellData(rowNum, colNum).then(val => {
			cy.log(val);
		});
	});

	it.only('Get cell data from row and col id', () => {
		const rowNum = 2,
			colNum = 3;
		cy.getCellDataFromRowColId(rowNum, colNum).then(val => {
			cy.log(val);
		});
	});
	it('check if column values are sorted in ascending order', () => {
		const colNum = 4;
		cy.isColumnSortedbyASC(colNum);
	});

	it.only('search web table using search string', () => {
		//cy.searchTable('Gavin Joyce');
		cy.searchTable('Edinburgh');
	});
});
