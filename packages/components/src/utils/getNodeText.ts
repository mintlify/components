// Gets the text from a component as if you selected it with a mouse and copied it.
export const getNodeText = (node: unknown): string => {
    if (typeof node === 'string' || typeof node === 'number') {
        // Convert number into string
        return node.toString();
    }

    if (node instanceof Array) {
        return node.map(getNodeText).join('');
    }

    if (
        node &&
        typeof node === 'object' &&
        'props' in node &&
        node.props &&
        typeof node.props === 'object' &&
        'children' in node.props
    ) {
        return getNodeText(node.props.children);
    }

    return '';
};
