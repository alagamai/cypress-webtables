describe('get web table elements', () => {
	beforeEach(() => {
		cy.visit('https://datatables.net/examples/styling/bootstrap.html');
	});

	it('print all Cell Contents of Web Table', () => {
		cy.getTitleNames('table#example').then(values => {
			values.forEach(element => {
				cy.log(element);
			});
		});
	});

	it('print row by row data of Web Table', () => {
		cy.getRowData_all('table#example').then(Values => {
			//	rowData = Values;
			Values.forEach(val => {
				cy.log(val);
			});
		});
	});

	it('Get specified row data from the webtable', () => {
		const tableSelector = 'table#example';
		const rowNum = 3;
		cy.getRowData_byRowNum(tableSelector, rowNum).then(val => {
			cy.log(JSON.stringify(val));
		});
	});
});
