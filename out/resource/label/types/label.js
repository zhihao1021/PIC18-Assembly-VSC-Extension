import { ResourceData } from "@/resource/types";
import { BaseLabelData } from "./base";
export class LabelData extends BaseLabelData {
    constructor(props) {
        super(props);
        const { isExternal, exists } = props;
        this.isExternal = isExternal;
        this.exists = exists === undefined ? !isExternal : exists;
    }
}
export class LabelResource extends ResourceData {
}
;
//# sourceMappingURL=label.js.map