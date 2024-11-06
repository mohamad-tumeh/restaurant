import { Option } from "./Option";

export interface ExtraOption {
    extra_id: string;
    extra_type_name: string;
    is_active: number;
    is_required: number;
    max_options: number;
    name: string;
    option: Option[];
}