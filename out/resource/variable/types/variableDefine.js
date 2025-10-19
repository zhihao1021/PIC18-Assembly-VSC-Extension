import { ResourceData } from "@/resource/types";
import { BaseVariableData } from "./base";
export class VariableDefineData extends BaseVariableData {
    constructor(props) {
        super(props);
        const { comment, value } = props;
        this.value = value;
        this.comment = comment;
    }
}
export class VariableDefineResource extends ResourceData {
}
;
//# sourceMappingURL=variableDefine.js.map