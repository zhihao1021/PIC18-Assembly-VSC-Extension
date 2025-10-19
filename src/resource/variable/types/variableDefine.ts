import { ResourceData, ResourceDataType } from "@/resource/types";

import { BaseVariableData, BaseVariableDataProps, BaseVariableDataType } from "./base";

export type VariableDefineDataType = {
    value: Readonly<string>;
    comment?: Readonly<string>;
} & BaseVariableDataType;

export type VariableDefineResourceType = ResourceDataType<VariableDefineDataType>;

export class VariableDefineData extends BaseVariableData implements VariableDefineDataType {
    public readonly value: Readonly<string>;
    public readonly comment?: Readonly<string>;

    constructor(props: Readonly<{
        value: string;
        comment?: string;
    }> & BaseVariableDataProps) {
        super(props);
        const { comment, value } = props;

        this.value = value;
        this.comment = comment;
    }
}

export class VariableDefineResource extends ResourceData<VariableDefineDataType> { };
