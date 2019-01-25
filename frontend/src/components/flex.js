// @flow
import React from 'react'

const Flex = ({
    justifyContent = 'flex-start',
    alignItems = 'flex-start',
    flexDirection = 'row',
    flexWrap = 'wrap',
    className = '',
    style = {},
    children,
}: {
    justifyContent: 'center' | 'flex-start' | 'flex-end' | 'space-around' | 'space-between',
    alignItems: 'baseline' | 'center' | 'end' | 'flex-start' | 'flex-end',
    flexDirection: 'row' | 'column',
    flexWrap: 'wrap' | 'nowrap',
    className: string,
    style: object,
    children: any,
}) => (
    <div 
        className={className}
        style={{
            ...style,
            display: 'flex',
            justifyContent,
            alignItems,
            flexDirection,
            flexWrap,
        }}
    >
        {children}
    </div>
)

export default Flex