import { Range } from "vscode";
export class ResourceData {
    constructor(props) {
        const { value, uri, position, range } = props;
        this.value = value;
        this.uri = uri;
        this.position = position;
        this.range = range ?? new Range(position, position);
    }
}
//# sourceMappingURL=types.js.map