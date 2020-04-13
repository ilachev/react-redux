import { schema, normalize } from "normalizr";

const placeType = new schema.Entity('placeTypes');
const placeTypeList = [placeType];
const placeTypeNormalizer = placeTypeResult => normalize(placeTypeResult, placeTypeList);
export default placeTypeNormalizer;