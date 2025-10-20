import { ResourceData, ResourceDataType } from "@/resource/types";

import { VariableDefineResourceType } from "@/resource/variable/types/variableDefine";

export type MacroDataType = {
    name: Readonly<string>;
    rawParameters: Readonly<VariableDefineResourceType[]>
    parameters: Readonly<Map<string, VariableDefineResourceType[]>>;
    illegal: Readonly<boolean>;
    comment: Readonly<string>;
};

export type MacroResourceType = ResourceDataType<MacroDataType>;

export class MacroData implements MacroDataType {
    public readonly name: Readonly<string>;
    public readonly rawParameters: readonly VariableDefineResourceType[];
    public readonly parameters: Readonly<Map<string, VariableDefineResourceType[]>>;
    public readonly illegal: Readonly<boolean>;
    public readonly comment: Readonly<string>;

    constructor(props: Readonly<{
        name: string;
        parameters: VariableDefineResourceType[];
        illegal: boolean;
        comment: string;
    }>) {
        const {
            name, parameters, illegal, comment
        } = props;

        this.name = name;
        this.rawParameters = parameters;
        this.parameters = new Map<string, VariableDefineResourceType[]>();
        parameters.forEach(param => {
            const paramList = this.parameters.get(param.value.name);
            if (paramList) paramList.push(param);
            else this.parameters.set(param.value.name, [param]);
        });
        this.illegal = illegal;
        this.comment = comment;
    }
}

export class MacroResource extends ResourceData<MacroDataType> { };
