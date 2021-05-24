import React, { useState } from "react";
import "antd/dist/antd.css";
import { Table } from "antd";
import { Resizable } from "react-resizable";
import ReactDragListView from "react-drag-listview";
import { useSelector } from "react-redux";

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) return <th {...restProps} />;
  
  return (
    <Resizable width={width} height={0} onResize={onResize}  draggableOpts={{ enableUserSelectHack: false }} 
               handle={<span className="react-resizable-handle" onClick={(e) => {e.stopPropagation();}}/>}>
       <th {...restProps} />
    </Resizable>
  );
};

const columnArray = [
  { title: <span className="dragHandler">סה" שעות</span>,dataIndex: "totalHours" , width : 100},
  { title: <span className="dragHandler">שעות</span>,dataIndex: "hours",width: 100 },
  { title: <span className="dragHandler">שעות ידניות</span>,dataIndex: "manualHours",width: 100 },
  { title: <span className="dragHandler">שעות חריגות</span>,dataIndex: "exceptionalHours",width: 100 },
  { title: <span className="dragHandler">שם עובד</span>,dataIndex: "employeeName",width: 100 },
  { title: <span className="dragHandler">מספר ת.ז</span>, dataIndex: "idNumber", render: (text) => <span>{text}</span>, width: 100 },
]

const ResponsiveTable = () => {
    const data = useSelector(state => state.userDetailsReducer.userDetailsArray)
    const [ columns , setColumns ] = useState({columns : columnArray});
  
    const dragProps = {
        onDragEnd(fromIndex, toIndex) {
            const myColumns = [...columns.columns];
            const item = myColumns.splice(fromIndex, 1)[0];
            myColumns.splice(toIndex, 0, item);
            setColumns({columns:myColumns})
        },
        nodeSelector: "th",
        handleSelector: ".dragHandler",
        ignoreSelector: "react-resizable-handle"
    };

    const components = {
    header: {
        cell: ResizableTitle
    }
};

const handleResize = (index) => (e, { size }) => {
    setColumns(({ columns }) => {
        const nextColumns = [...columns];
        nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
        };
        return { columns: nextColumns };
    });
};

const newColumns = columns.columns.map((col, index) => ({
    ...col, 
    onHeaderCell: (column) => ({width: column.width, onResize: handleResize(index)})
}));

  return (
    <ReactDragListView.DragColumn {...dragProps}>
      <Table bordered components={components} columns={newColumns} dataSource={data}/>
    </ReactDragListView.DragColumn>
  );
}

export default ResponsiveTa