import Model from "./model";
import follow from "./mysql";

export default function getModel(): Model {
    return follow;
}