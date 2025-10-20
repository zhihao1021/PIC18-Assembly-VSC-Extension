import { ResourceData, ResourceDataType } from "@/resource/types";

import { BaseVariableData, BaseVariableDataProps, BaseVariableDataType } from "./base";
import { MacroResource } from "@/resource/macro/types/macro";

export type VariableDataType = {
    exists: boolean;
    macro?: MacroResource;
} & BaseVariableDataType;
export type VariableResourceType = ResourceDataType<VariableDataType>;

export class VariableData extends BaseVariableData implements VariableDataType {
    public exists: boolean;
    public macro?: MacroResource;

    constructor(props: Readonly<{
        exists?: boolean;
    }> & BaseVariableDataProps) {
        super(props);
        const { exists } = props;

        this.exists = exists ?? false;
    }
}

export class VariableResource extends ResourceData<VariableDataType> { };
