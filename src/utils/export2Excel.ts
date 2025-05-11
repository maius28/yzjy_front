import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
interface ColumnProps {
	prop: string;
	label: string;
};

// 生成新类型
type RowType = {
  [K in ColumnProps['prop']]: any;
};


interface FileProps{
	filename:string;
	columnData:Array<ColumnProps>;
	tableData:Array<RowType>;
};
export const exportToExcel = (fileProps:FileProps) => {
	const colMapper=new Map(fileProps.columnData.map((item)=>[item.prop,item.label]));
	let tableData = fileProps.tableData.map((row) => {
		const newRow = {};
		for(const key in row){
			if(colMapper.has(key)&&row.hasOwnProperty(key)){
				newRow[colMapper.get(key)!]=row[key];
			}else{
				newRow[key]=row[key];
			}
		}
		return newRow;
	});
	console.log(tableData);
	
	// 假设 this.tableData 是你的表格数据，每一项是一个对象，对应表格的一行
	//处理表格数据得到数据
	const worksheet = XLSX.utils.json_to_sheet(tableData);
	const workbook = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
	
	const excelBuffer = XLSX.write(workbook, {
		bookType: 'xlsx',
		type: 'array'
	});
	// 将缓冲区转换为 Blob 并保存为文件
	const data = new Blob([excelBuffer], {
		type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
	});
	FileSaver.saveAs(data, `${fileProps.filename.split('.')[0]}.xlsx`);
}