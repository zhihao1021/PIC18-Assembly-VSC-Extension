import { ResourceData, ResourceDataType } from "@/resource/types";

import { BaseLabelData, BaseLabelDataProps, BaseLabelDataType } from "./base";

export type LabelDataType = {
    isExternal: Readonly<boolean>;
    exists: boolean;
} & BaseLabelDataType;
export type LabelResourceType = ResourceDataType<LabelDataType>;

export class LabelData extends BaseLabelData implements LabelDataType {
    public readonly isExternal: Readonly<boolean>;
    public exists: Readonly<boolean>;

    constructor(props: Readonly<{
        isExternal: boolean;
        exists?: boolean;
    }> & BaseLabelDataProps) {
        super(props);
        const { isExternal, exists } = props;

        this.isExternal = isExternal;
        this.exists = exists === undefined ? !isExternal : exists;
    }
}

export class LabelResource extends ResourceData<LabelDataType> { };
