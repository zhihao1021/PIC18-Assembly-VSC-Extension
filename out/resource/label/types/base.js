import { ResourceData } from "@/resource/types";
export class BaseLabelData {
    constructor(props) {
        const { name, comment } = props;
        this.name = name;
        this.comment = comment;
    }
}
export class BaseLabelResource extends ResourceData {
}
;
//# sourceMappingURL=base.js.map