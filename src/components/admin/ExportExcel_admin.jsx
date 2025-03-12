import React from 'react'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const ExportExcel = ({ fileName, data }) => {

    const exportToExcel = async () => {
        // Create a new workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        // Extract columns from the first row of data (assuming all rows have the same structure)
        if (data.length > 0) {
            // Dynamically define columns based on the keys in the first data object
            const columns = Object.keys(data[0]).map(key => ({
                header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize header
                key: key,
                width: 20 // Adjust width as needed
            }));
            worksheet.columns = columns;

            // Add data rows
            data.forEach(row => worksheet.addRow(row));
        }

        // Generate Excel file as a buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Create a Blob from the buffer and save the file
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, fileName || 'download.xlsx');
    };

    return (
        <Button type='primary' onClick={exportToExcel} icon={<DownloadOutlined />} size='small'>ดาวน์โหลดข้อมูลในตาราง</Button>
    )
}

export default ExportExcel