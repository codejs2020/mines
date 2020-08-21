/**
 * Data:
 * - mines
 * - time
 * - flags?
 * 
 * - field
 *
 * 
 * Methods:
 * - openFieldsScanner
 * - 
 */
const config = {
    rows: 9,
    columns: 9,
    bombs: 10
}

const table = generateTable(config)

function openFieldsScanner() {

}

function getTouchingFields(field, config) {
    let tmp = []
    tmp.push(field.index-config.columns-1)
    tmp.push(field.index-config.columns)
    tmp.push(field.index+1)
    tmp.push(field.index-1)
    tmp.push(field.index+config.columns)
    tmp.push(field.index+config.columns+1)
    tmp.push(field.index-config.columns+1)
    tmp.push(field.index + config.columns - 1)
    
    for (let i = 0; i < tmp.length; i++){
        if (tmp[i] >= 0 && tmp[i] < config.rows * config.columns) {
            touchingFields.push(tmp[i])
        }
    }
    return touchingFields
}

function getTouchingFieldsWithBombs(touchingFields, table) {
    const tmp = 0
    for (let i = 0; i < touchingFields.length; i++){
        if (table[touchingFields[i]].isBomb) {
            ++tmp
        }
    }
    return tmp
}

function generateTable(conf) {
    const { rows, columns, bombs } = conf
    const table = []
    const bombsPositions = randomNumbers(0, rows * columns - 1, bombs)
    let index = 0
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            table.push({
                isBomb: bombsPositions[index],
                isFlag: false,
                isOpen: false,
                neighbourBombs: 0, // todo
                row: i,
                column: j,
                index: index++
            })
        }
    }

    table.map(el => {
        const touching = getTouchingFields(el, config)
        const neighbourBombs = getTouchingFieldsWithBombs(touching, table ) //  {...table}
        return {...el, neighbourBombs}
    })

    return table
}

function randomNumbers(start, end, count) {
    var returnArray = [],
        randomNumber;
    for (var i = 0; i < count; i++) {
        randomNumber = Math.floor(Math.random() * (end - start)) + start;
        if (returnArray.indexOf(randomNumber) == -1) {
            returnArray.push(randomNumber);
        } else {
            --i;
        }
    }
    return returnArray;
}

function displayTable() {

}
