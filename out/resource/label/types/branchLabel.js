import { ResourceData } from "@/resource/types";
import { BaseLabelData } from "./base";
export class BranchLabelData extends BaseLabelData {
    constructor(props) {
        super(props);
        const { missing } = props;
        this.missing = missing;
    }
}
export class BranchLabelResource extends ResourceData {
}
;
//# sourceMappingURL=branchLabel.js.map