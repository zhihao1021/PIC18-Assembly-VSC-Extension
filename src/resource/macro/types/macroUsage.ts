import { ResourceData, ResourceDataType } from "@/resource/types";

import { VariableResourceType } from "@/resource/variable/types/variable";

export type MacroUsageDataType = {
    name: Readonly<string>;
    parameters: Readonly<Map<string, VariableResourceType[]>>;
    illegal: Readonly<boolean>;
};

export type MacroResourceType = ResourceDataType<MacroUsageDataType>;

export class MacroData implements MacroUsageDataType {
    public readonly name: Readonly<string>;
    public readonly parameters: Readonly<Map<string, VariableResourceType[]>>;
    public readonly illegal: Readonly<boolean>;

    constructor(props: Readonly<{
        name: string;
        parameters: VariableResourceType[];
        illegal: boolean;
    }>) {
        const {
            name, parameters, illegal
        } = props;

        this.name = name;
        this.parameters = new Map<string, VariableResourceType[]>();
        parameters.forEach(param => {
            const paramList = this.parameters.get(param.value.name);
            if (paramList) paramList.push(param);
            else this.parameters.set(param.value.name, [param]);
        });

        this.illegal = illegal;
    }
}

export class MacroResource extends ResourceData<MacroUsageDataType> { };
