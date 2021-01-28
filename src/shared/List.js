import React from 'react';

import "./List.css";

const List = (props) => {
    const listItems = [];
    Object.keys(props.items).forEach(itemKey => {
        listItems.push(<p>{itemKey}</p>);
        listItems.push(<p>{props.items[itemKey]}</p>);
    })

    return (
        <div className={"medication-request-list"}>
            {listItems}
            {props.children}
        </div>
    );
}

export default List;
