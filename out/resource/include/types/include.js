import { ResourceData } from "@/resource/types";
export class IncludeData {
    constructor(props) {
        const { includes, referencedBy } = props;
        this.includes = includes;
        this.referencedBy = referencedBy ?? new Set();
    }
}
export class IncludeResource extends ResourceData {
}
;
//# sourceMappingURL=include.js.map