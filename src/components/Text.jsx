import { createElement } from 'react'

function Text({ renderAs, content, componentsProps }) {
    return (
        createElement(renderAs, componentsProps, content)
    )
}

export default Text