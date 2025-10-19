import { Location, Position, Range, Uri } from "vscode";

export type ResourceDataType<T> = {
    value: T;
    uri: Uri;
    position: Position;
    range: Range;
}

export class ResourceData<T> implements ResourceDataType<T> {
    public readonly value: Readonly<T>;
    public readonly uri: Readonly<Uri>;
    public readonly position: Readonly<Position>;
    public readonly range: Readonly<Range>;

    constructor(props: Readonly<{
        value: T;
        uri: Uri;
        position: Position;
        range?: Range;
    }>) {
        const { value, uri, position, range } = props;

        this.value = value;
        this.uri = uri;
        this.position = position;
        this.range = range ?? new Range(position, position);
    }
}
