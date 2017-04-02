
import * as React from 'react';

function calculateYear(date: Date) {
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function AgeFormatter(props: {date: Date}) {
    if (!props.date) {
        return <span>-</span>
    }
    
    return (
        <span>{calculateYear(props.date)}</span>
    )
}