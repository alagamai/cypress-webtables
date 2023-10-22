// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getTableData', () => {
	let Values_final = [];
	// Select the table element
	cy.get('table#example') // Replace with the selector for the table element
		.find('tbody tr') // Select all table rows
		.each((row, index) => {
			// Iterate over each row
			cy.wrap(row)
				.find('td') // Select all cells within each row
				.each(cells => {
					// Iterate over each cell
					const Values = Array.from(cells).map(cell => Cypress.$(cell).text());
					if (!Values_final[index]) {
						Values_final[index] = [];
					}
					Values_final[index].push(Values);
				});
		});
	cy.wrap(Values_final);
});

Cypress.Commands.add('getTotalIndexes', () => {
	let totalIndexes = 0;
	cy.get('table#example') // Replace with the selector for the table element
		.find('tbody tr')
		.then(rows => {
			totalIndexes = rows.length;
			cy.wrap(totalIndexes);
		});
});

Cypress.Commands.add('getRowData', rowNum => {
	cy.get('#example')
		.find('tr') // Find all table rows
		.eq(rowNum) // Select the third row (index starts from 0)
		.find('td') // Find all cells within the selected row
		.then($el => {
			const Values = Array.from($el).map(element => Cypress.$(element).text());
			// Values.forEach(val => {
			// 	cy.log(val);
			// });
			cy.wrap(Values);
		});
});

Cypress.Commands.add('getRowDataInText', rowNum => {
	cy.get('#example') // Replace 'table' with the appropriate selector for your table
		.find(`tbody tr:nth-child(${rowNum})`)
		.eq(0) // Select the first cell (index starts from 0)
		.invoke('text')
		.then(text => {
			// Access the text content of the entire row
			cy.wrap(text);
		});
});

Cypress.Commands.add('getCellData', (rowNum, colNum) => {
	// Select the table element
	cy.get('table#example') // Replace with the selector for the table element
		.find('tbody tr') // Select all table rows
		.eq(rowNum) // Select the third row (index starts from 0)
		.find('td') // Select all cells within the specified row
		.eq(colNum) // Select the second cell (index starts from 0)
		.invoke('text') // Retrieve the text content of the specified cell
		.then(cellContent => {
			// Log the cell content
			cy.wrap(cellContent);
		});
});

Cypress.Commands.add('getColumnDataInText', colNum => {
	cy.get('#example') // Replace 'table' with the appropriate selector for your table
		.find(`tbody tr td:nth-child(${colNum})`)
		//.invoke('text')
		.then(el => {
			cy.wrap(el.text());
		});
});

Cypress.Commands.add('getColumnDataInArray', colNum => {
	cy.get('#example') // Replace 'table' with the appropriate selector for your table
		.find(`tbody tr td:nth-child(${colNum})`)
		//.invoke('text')
		.then($el => {
			const Values = Array.from($el).map(element => Cypress.$(element).text());
			cy.wrap(Values);
		});
});

Cypress.Commands.add('getCellData_usingCellNum', cellNum => {
	cy.get('#example') // Replace 'table' with the appropriate selector for your table
		.find('tbody tr td')
		.eq(cellNum)
		.then($el => {
			cy.wrap($el.text());
		});
});

Cypress.Commands.add('getPrevNextCellData', cellNum => {
	cy.get('#example') // Replace 'table' with the appropriate selector for your table
		.find('tbody tr td')
		.eq(cellNum)
		.then($el => {
			cy.log(`content of next cell ${$el.next().text()}`);
			cy.log(`content of prev cell ${$el.prev().text()}`);
			let prev = $el.prev().text();
			let next = $el.next().text();
			cy.wrap({ prev, next });
		});
});

Cypress.Commands.add('getPrevColumnData', colNum => {
	cy.get('#example') // Replace 'table' with the appropriate selector for your table
		.find(`tbody tr td:nth-child(${colNum})`)
		//.invoke('text')
		.then($el => {
			const Values = Array.from($el).map(element =>
				Cypress.$(element).prev().text()
			);
			cy.wrap(Values);
		});
});

Cypress.Commands.add('getNextColumnData', colNum => {
	cy.get('#example') // Replace 'table' with the appropriate selector for your table
		.find(`tbody tr td:nth-child(${colNum})`)
		.then($el => {
			const Values = Array.from($el).map(element =>
				Cypress.$(element).next().text()
			);
			cy.wrap(Values);
		});
});

Cypress.Commands.add('getPrevCellData', (colNum, rowNum) => {
	cy.get('#example') // Replace 'table' with the appropriate selector for your table
		.find(`tbody tr td:nth-child(${colNum})`)
		//.next()
		.eq(rowNum)
		.then($el => {
			const values = Array.from($el).map(element =>
				Cypress.$(element).prev().text()
			);
			cy.wrap(values);
		});
});

Cypress.Commands.add('getCellDataFromRowColId', (RowNum, colNum) => {
	// Select the table element
	cy.get('table#example') // Replace with the selector for the table element
		.find('tbody tr') // Select all table rows
		.eq(RowNum)
		// .each(row => {
		// 	// Iterate over each row
		// 	cy.wrap(row)
		.find('td') // Select all cells within each row
		.eq(colNum) // Select the second column (index starts from 0)
		.invoke('text') // Retrieve the text content of the specified cell
		.then(cellContent => {
			// Log the cell content
			cy.wrap(cellContent);
		});
	// });
});

Cypress.Commands.add('getRowData_all', tableSelector => {
	const all_rowData = [];
	cy.get(tableSelector)
		.find('tbody tr') // Select all table rows
		.each(row => {
			cy.wrap(row)
				.find('td') // Select all cells within each row
				.then($el => {
					const Values = Array.from($el).map(element =>
						Cypress.$(element).text().trim()
					);
					// Values.forEach(val => {
					// 	cy.log(val);
					// });
					let rowVal = Values.join(' ').toString();
					all_rowData.push(rowVal);
				});
		});
	cy.wrap(all_rowData);
});

Cypress.Commands.add('getRowData_byRowNum', (tableSelector, rowNum) => {
	rowNum = rowNum - 1; // row starts from zero index
	cy.get(tableSelector)
		.find('tbody tr') // Select all table rows
		.eq(rowNum)
		.find('td') // Select all cells within each row
		.then($el => {
			const Values = Array.from($el).map(element =>
				Cypress.$(element).text().trim()
			);
			Values.forEach(val => {
				cy.log(val);
			});
			cy.wrap(Values.join(' ').toString());
		});
});

Cypress.Commands.add('isColumnSortedbyASC', colNum => {
	cy.get(`thead tr [tabindex='0']:nth-of-type(${colNum})`).click();

	cy.get('#example') // Replace 'table' with the appropriate selector for your table
		.find(`tbody tr td:nth-child(${colNum})`)
		.then($elements => {
			const values = Array.from($elements).map(element =>
				Cypress.$(element).text()
			);
			const sortedValues = [...values].sort();
			// sortedValues.forEach(val => {
			// 	cy.log(val);
			// });

			expect(values).to.deep.equal(sortedValues);
		});
});

Cypress.Commands.add('printCells_rowbyrow', colNum => {
	cy.get('#example')
		.find('tbody tr') // Find all table rows
		.each(row => {
			// Iterate over each row
			cy.wrap(row)
				.find('td') // Select all cells within each row
				//.invoke('text') // Retrieve the text content of each cell
				.then(cellContent => {
					// Log the cell content
					const Values = Array.from(cellContent).map(cc =>
						Cypress.$(cc).text()
					);
					Values.forEach(val => {
						cy.log(val);
					});
				});
		});
});

Cypress.Commands.add('printCells_rowbyrow_1', colNum => {
	// Select the table element
	cy.get('table#example') // Replace with the selector for the table element
		.find('tbody tr') // Select all table rows
		.each(row => {
			// Iterate over each row
			cy.wrap(row)
				.find('td') // Select all cells within each row
				.each(cell => {
					// Iterate over each cell
					cy.wrap(cell)
						.invoke('text') // Retrieve the text content of each cell
						.then(cellContent => {
							// Log the cell content
							cy.log(cellContent);
						});
				});
		});
});

Cypress.Commands.add('searchTable', text => {
	cy.get('#example_filter [aria-controls]').type(text);
	// const rowNo = 1;
	// cy.getRowData(rowNo).then(val => {
	// 	val.forEach(v => {
	// 		cy.log(v);
	// 	});
	// });

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

Cypress.Commands.add('getTitleNames', tableSelector => {
	//thead tr [tabindex='0']:nth-of-type(2)
	//thead tr [tabindex='0']:nth-of-type(5)
	//thead > tr > th:nth-of-type(1)
	cy.get(tableSelector)
		.find(`thead tr [tabindex='0']`) // Find all table rows
		.then($el => {
			cy.log($el.text());
			const Values = Array.from($el).map(element => Cypress.$(element).text());
			Values.forEach(val => {
				cy.log(JSON.stringify(val));
			});
			cy.wrap(Values);
		});
});
