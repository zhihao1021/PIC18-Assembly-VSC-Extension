import { ResourceData, ResourceDataType } from "@/resource/types";

import { BaseLabelData, BaseLabelDataProps, BaseLabelDataType } from "./base";

export type BranchLabelDataType = {
    missing: Readonly<boolean>;
} & BaseLabelDataType;

export type BranchLabelResourceType = ResourceDataType<BranchLabelDataType>;

export class BranchLabelData extends BaseLabelData implements BranchLabelDataType {
    public readonly missing: Readonly<boolean>;

    constructor(props: Readonly<{
        missing: boolean;
    }> & BaseLabelDataProps) {
        super(props);
        const { missing } = props;

        this.missing = missing;
    }
}

export class BranchLabelResource extends ResourceData<BranchLabelDataType> { };
