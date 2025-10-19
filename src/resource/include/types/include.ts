import { ResourceData, ResourceDataType } from "@/resource/types";

export type IncludeDataType = {
    includes: Set<string>;
    referencedBy: Set<string>;
};
export type IncludeResourceType = ResourceDataType<IncludeDataType>;

export class IncludeData implements IncludeDataType {
    public includes: Set<string>;
    public referencedBy: Set<string>;

    constructor(props: Readonly<{
        includes: Set<string>;
        referencedBy?: Set<string>;
    }>) {
        const {
            includes,
            referencedBy
        } = props;

        this.includes = includes;
        this.referencedBy = referencedBy ?? new Set<string>();
    }
}

export class IncludeResource extends ResourceData<IncludeDataType> { };
