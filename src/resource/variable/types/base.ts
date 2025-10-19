import { ResourceData, ResourceDataType } from "@/resource/types";

export type BaseVariableDataType = {
    name: Readonly<string>;
};

export type BaseVariableResourceType = ResourceDataType<BaseVariableDataType>;

export type BaseVariableDataProps = Readonly<BaseVariableDataType>;
export class BaseVariableData implements BaseVariableDataType {
    public readonly name: Readonly<string>;

    constructor(props: BaseVariableDataProps) {
        const { name } = props;

        this.name = name;
    }
}

export class BaseVariableResource extends ResourceData<BaseVariableDataType> { };
