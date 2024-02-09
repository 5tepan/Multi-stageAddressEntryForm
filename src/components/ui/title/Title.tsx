import React, {FC, JSX} from 'react'

interface TitleProps {
    level: 1 | 2 | 3 | 4 | 5 | 6
    value: string
    className?: string
}

const Title: FC<TitleProps> = (
    {
        level,
        value,
        className
    }
) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements
    return (
        <Tag className={className}>
            {value}
        </Tag>
    )
}

export {
    Title
}