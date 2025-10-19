import { ResourceData, ResourceDataType } from "@/resource/types";

export type BaseLabelDataType = {
    name: Readonly<string>;
    comment?: Readonly<string>
};

export type BaseLabelResourceType = ResourceDataType<BaseLabelDataType>;

export type BaseLabelDataProps = Readonly<BaseLabelDataType>;
export class BaseLabelData implements BaseLabelDataType {
    public readonly name: Readonly<string>;
    public readonly comment?: Readonly<string>;

    constructor(props: BaseLabelDataProps) {
        const { name, comment } = props;

        this.name = name;
        this.comment = comment;
    }
}

export class BaseLabelResource extends ResourceData<BaseLabelDataType> { };
