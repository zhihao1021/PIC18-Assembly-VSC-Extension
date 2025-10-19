import { ResourceData } from "@/resource/types";
import { BaseVariableData } from "./base";
export class VariableData extends BaseVariableData {
    constructor(props) {
        super(props);
        const { exist } = props;
        this.exist = exist;
    }
}
export class VariableResource extends ResourceData {
}
;
//# sourceMappingURL=variable.js.map